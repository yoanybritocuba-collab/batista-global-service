// src/services/chatbot/chatbotService.js
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const chatbotService = {
  // Buscar TODOS los destinos
  async buscarTodosDestinos() {
    try {
      const destinosRef = collection(db, 'destinos');
      const q = query(destinosRef, where('activo', '==', true));
      const snapshot = await getDocs(q);
      
      const resultados = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return {
        success: true,
        data: resultados,
        count: resultados.length,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return { success: false, error: error.message, data: [] };
    }
  },

  // ✅ NUEVO: Buscar productos en la tienda
  async buscarProductos(consulta) {
    try {
      const productosRef = collection(db, 'products');
      const snapshot = await getDocs(productosRef);
      
      const consultaLower = consulta.toLowerCase();
      
      const resultados = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(p => {
          const nombre = p.name?.toLowerCase() || '';
          const categoria = p.category?.toLowerCase() || '';
          const descripcion = p.description?.toLowerCase() || '';
          
          // Palabras clave para electrodomésticos
          const esNevera = consultaLower.includes('nevera') || 
                          consultaLower.includes('refrigerador') ||
                          consultaLower.includes('frigorífico');
          
          if (esNevera && (nombre.includes('nevera') || categoria.includes('nevera'))) {
            return true;
          }
          
          return nombre.includes(consultaLower) || 
                 categoria.includes(consultaLower) ||
                 descripcion.includes(consultaLower);
        });
      
      return {
        success: true,
        data: resultados,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return { success: false, error: error.message, data: [] };
    }
  },

  // Buscar servicios
  async buscarServicios(consulta) {
    try {
      const serviciosRef = collection(db, 'services');
      const snapshot = await getDocs(serviciosRef);
      
      const consultaLower = consulta.toLowerCase();
      
      const resultados = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(s => {
          const title = s.title?.toLowerCase() || '';
          const subtitle = s.subtitle?.toLowerCase() || '';
          
          return title.includes(consultaLower) || 
                 subtitle.includes(consultaLower);
        });
      
      return {
        success: true,
        data: resultados,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return { success: false, error: error.message, data: [] };
    }
  },

  // Buscar destinos (versión mejorada)
  async buscarDestinos(consulta) {
    try {
      const destinosRef = collection(db, 'destinos');
      const q = query(destinosRef, where('activo', '==', true));
      const snapshot = await getDocs(q);
      
      const todosDestinos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      const consultaLower = consulta.toLowerCase();
      
      // Extraer posible nombre de destino
      let posibleDestino = consultaLower
        .replace(/precio|precios|cuesta|valen|vale|costo|oferta|del|de|para|en|a|el|la|los|las|quiero|saber|cuanto|vuelos|viaje|ir|hola|buenos|días|tardes|noches|que|mas|tiene|hay/g, '')
        .trim();
      
      if (posibleDestino.length < 2) {
        return { success: true, data: [], esSaludo: true };
      }
      
      const resultados = todosDestinos.filter(d => {
        const nombre = d.nombre?.toLowerCase() || '';
        return nombre.includes(posibleDestino) || posibleDestino.includes(nombre);
      });
      
      return {
        success: true,
        data: resultados,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return { success: false, error: error.message, data: [] };
    }
  },

  // Obtener precios de un destino
  async obtenerPreciosDestino(destinoId) {
    try {
      const destinoRef = doc(db, 'destinos', destinoId);
      const destinoSnap = await getDoc(destinoRef);
      
      if (destinoSnap.exists()) {
        const data = destinoSnap.data();
        return {
          success: true,
          data: {
            nombre: data.nombre || '',
            precioMin: data.precioMin || 0,
            precioMax: data.precioMax || 0,
            precioOfertaMin: data.precioOfertaMin || 0,
            precioOfertaMax: data.precioOfertaMax || 0,
            actualizado: data.updatedAt || new Date().toISOString()
          }
        };
      }
      return { success: false, error: 'Destino no encontrado' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};