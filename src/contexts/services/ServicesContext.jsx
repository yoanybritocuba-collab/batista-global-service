import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from '../../services/firebase/config';
import { toast } from 'react-hot-toast';

const ServicesContext = createContext();

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices debe usarse dentro de ServicesProvider');
  }
  return context;
};

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar servicios desde Firestore
  const loadServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, 'services'));
      const servicesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setServices(servicesData);
      console.log('✅ Servicios cargados:', servicesData.length);
    } catch (err) {
      console.error('❌ Error cargando servicios:', err);
      setError('Error al cargar los servicios');
      toast.error('Error al cargar servicios');
    } finally {
      setLoading(false);
    }
  }, []);

  // Agregar servicio a Firestore
  const addService = async (serviceData) => {
    setLoading(true);
    try {
      const serviceWithTimestamp = {
        ...serviceData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'services'), serviceWithTimestamp);
      const newService = { id: docRef.id, ...serviceWithTimestamp };

      setServices(prev => [newService, ...prev]);
      toast.success('✅ Servicio creado correctamente');
      return newService;
    } catch (err) {
      console.error('❌ Error agregando servicio:', err);
      toast.error('Error al crear el servicio');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar servicio en Firestore
  const updateService = async (id, updatedData) => {
    setLoading(true);
    try {
      const serviceRef = doc(db, 'services', id);
      const updateWithTimestamp = {
        ...updatedData,
        updatedAt: new Date().toISOString()
      };

      await updateDoc(serviceRef, updateWithTimestamp);

      setServices(prev => prev.map(service =>
        service.id === id ? { ...service, ...updateWithTimestamp } : service
      ));

      toast.success('✅ Servicio actualizado correctamente');
      return { id, ...updateWithTimestamp };
    } catch (err) {
      console.error('❌ Error actualizando servicio:', err);
      toast.error('Error al actualizar el servicio');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar servicio de Firestore
  const deleteService = async (id) => {
    setLoading(true);
    try {
      const serviceRef = doc(db, 'services', id);
      await deleteDoc(serviceRef);

      setServices(prev => prev.filter(service => service.id !== id));
      toast.success('✅ Servicio eliminado correctamente');
      return id;
    } catch (err) {
      console.error('❌ Error eliminando servicio:', err);
      toast.error('Error al eliminar el servicio');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    services,
    loading,
    error,
    loadServices,
    addService,
    updateService,
    deleteService,
    servicesCount: services.length
  };

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
};
