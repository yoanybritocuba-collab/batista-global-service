import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from '../services/firebase/config';
import { toast } from 'react-hot-toast';

const DestinosContext = createContext();

export const useDestinos = () => {
  const context = useContext(DestinosContext);
  if (!context) {
    throw new Error('useDestinos debe usarse dentro de DestinosProvider');
  }
  return context;
};

// Datos de ejemplo para destinos populares (solo si no hay en Firebase)
const SAMPLE_DESTINOS = [
  {
    id: 'destino-1',
    nombre: 'Punta Cana',
    imagen: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg',
    precioMin: 499,
    precioMax: 599,
    precioOfertaMin: 399,
    precioOfertaMax: 499,
    descripcion: 'Paraíso caribeño con las mejores playas',
    activo: true,
    destacado: true,
    orden: 1
  },
  {
    id: 'destino-2',
    nombre: 'Cancún',
    imagen: 'https://images.pexels.com/photos/1533720/pexels-photo-1533720.jpeg',
    precioMin: 549,
    precioMax: 699,
    precioOfertaMin: 449,
    precioOfertaMax: 549,
    descripcion: 'Aguas turquesas y diversión sin límites',
    activo: true,
    destacado: true,
    orden: 2
  },
  {
    id: 'destino-3',
    nombre: 'Miami',
    imagen: 'https://images.pexels.com/photos/161963/chicago-illinois-skyline-skyscrapers-161963.jpeg',
    precioMin: 649,
    precioMax: 799,
    precioOfertaMin: 549,
    precioOfertaMax: 649,
    descripcion: 'Ciudad vibrante y playas espectaculares',
    activo: true,
    destacado: true,
    orden: 3
  },
  {
    id: 'destino-4',
    nombre: 'La Habana',
    imagen: 'https://images.pexels.com/photos/3581363/pexels-photo-3581363.jpeg',
    precioMin: 399,
    precioMax: 499,
    precioOfertaMin: 299,
    precioOfertaMax: 399,
    descripcion: 'Historia, cultura y autenticidad cubana',
    activo: true,
    destacado: true,
    orden: 4
  }
];

export const DestinosProvider = ({ children }) => {
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar destinos desde Firestore
  const loadDestinos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, 'destinos'));
      const destinosData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      console.log('📥 Destinos desde Firebase:', destinosData);
      
      if (destinosData.length > 0) {
        setDestinos(destinosData);
        console.log('✅ Usando datos de Firebase');
      } else {
        console.log('⚠️ No hay destinos en Firebase, usando datos de ejemplo');
        setDestinos(SAMPLE_DESTINOS);
      }
    } catch (err) {
      console.error('❌ Error cargando destinos:', err);
      setError('Error al cargar los destinos');
      setDestinos(SAMPLE_DESTINOS);
    } finally {
      setLoading(false);
    }
  }, []);

  // Agregar destino
  const addDestino = async (destinoData) => {
    setLoading(true);
    try {
      const destinoConTimestamp = {
        ...destinoData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'destinos'), destinoConTimestamp);
      const newDestino = { id: docRef.id, ...destinoConTimestamp };
      
      setDestinos(prev => [...prev, newDestino]);
      toast.success('✅ Destino agregado correctamente');
      return newDestino;
    } catch (err) {
      console.error('❌ Error agregando destino:', err);
      toast.error('Error al agregar el destino');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar destino
  const updateDestino = async (id, updatedData) => {
    setLoading(true);
    try {
      const destinoRef = doc(db, 'destinos', id);
      const updateConTimestamp = {
        ...updatedData,
        updatedAt: new Date().toISOString()
      };

      await updateDoc(destinoRef, updateConTimestamp);
      
      setDestinos(prev => prev.map(destino =>
        destino.id === id ? { ...destino, ...updateConTimestamp } : destino
      ));
      
      toast.success('✅ Destino actualizado correctamente');
      return { id, ...updateConTimestamp };
    } catch (err) {
      console.error('❌ Error actualizando destino:', err);
      toast.error('Error al actualizar el destino');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar destino
  const deleteDestino = async (id) => {
    setLoading(true);
    try {
      const destinoRef = doc(db, 'destinos', id);
      await deleteDoc(destinoRef);
      
      setDestinos(prev => prev.filter(destino => destino.id !== id));
      toast.success('✅ Destino eliminado correctamente');
      return id;
    } catch (err) {
      console.error('❌ Error eliminando destino:', err);
      toast.error('Error al eliminar el destino');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    destinos,
    loading,
    error,
    loadDestinos,
    addDestino,
    updateDestino,
    deleteDestino
  };

  return (
    <DestinosContext.Provider value={value}>
      {children}
    </DestinosContext.Provider>
  );
};
