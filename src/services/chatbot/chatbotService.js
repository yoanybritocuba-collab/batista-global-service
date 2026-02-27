// src/services/chatbot/chatbotService.js
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

// Servicio que consulta Firestore en tiempo real
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
      
      console.log('📦 Destinos encontrados:', resultados.length);
      return {
        success: true,
        data: resultados,
        count: resultados.length,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error buscando todos los destinos:', error);
      return { success: false, error: error.message, data: [] };
    }
  },

  // Buscar destinos por nombre (versión MEJORADA)
  async buscarDestinos(consulta) {
    try {
      console.log('🔍 Buscando:', consulta);
      
      const destinosRef = collection(db, 'destinos');
      const q = query(destinosRef, where('activo', '==', true));
      const snapshot = await getDocs(q);
      
      const todosDestinos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      console.log('📦 Total destinos en BD:', todosDestinos.length);
      console.log('📦 Destinos:', todosDestinos.map(d => d.nombre));
      
      const consultaLower = consulta.toLowerCase().trim();
      
      // Palabras que indican búsqueda de precios
      const esConsultaPrecio = consultaLower.includes('precio') || 
                               consultaLower.includes('cuesta') || 
                               consultaLower.includes('vale') ||
                               consultaLower.includes('costo') ||
                               consultaLower.includes('oferta');
      
      // Extraer posible nombre de destino de la consulta
      let posibleDestino = consultaLower
        .replace(/precio|precios|cuesta|valen|vale|costo|oferta|del|de|para|en|a|el|la|los|las|quiero|saber|cuanto|vuelos|viaje|ir/g, '')
        .trim();
      
      console.log('🎯 Posible destino buscado:', posibleDestino);
      
      // Si no hay palabra clave específica, tomar la consulta completa
      if (posibleDestino.length < 3) {
        posibleDestino = consultaLower;
      }
      
      // Buscar destinos que coincidan
      const resultados = todosDestinos.filter(d => {
        const nombre = d.nombre?.toLowerCase() || '';
        const descripcion = d.descripcion?.toLowerCase() || '';
        
        // Coincidencia exacta o parcial
        const coincideNombre = nombre.includes(posibleDestino) || 
                               posibleDestino.includes(nombre);
        
        const coincideDescripcion = descripcion.includes(posibleDestino);
        
        // Mapeo de nombres comunes
        const mapaDestinos = {
          'europa': ['parís', 'paris', 'roma', 'barcelona', 'londres', 'madrid', 'berlín', 'amsterdam'],
          'caribe': ['punta cana', 'cancún', 'cancun', 'la habana', 'habana', 'bahamas', 'jamaica'],
          'usa': ['miami', 'orlando', 'nueva york', 'new york', 'los ángeles', 'chicago']
        };
        
        // Buscar por región
        for (const [region, destinosRegion] of Object.entries(mapaDestinos)) {
          if (posibleDestino.includes(region) || region.includes(posibleDestino)) {
            if (destinosRegion.some(r => nombre.includes(r))) {
              return true;
            }
          }
        }
        
        return coincideNombre || coincideDescripcion;
      });
      
      console.log('✅ Resultados encontrados:', resultados.length);
      
      return {
        success: true,
        data: resultados,
        esConsultaPrecio,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error buscando destinos:', error);
      return { success: false, error: error.message, data: [] };
    }
  },

  // Obtener precios actualizados de un destino
  async obtenerPreciosDestino(destinoId) {
    try {
      const destinoRef = doc(db, 'destinos', destinoId);
      const destinoSnap = await getDoc(destinoRef);
      
      if (destinoSnap.exists()) {
        const data = destinoSnap.data();
        console.log('💰 Precios obtenidos para:', data.nombre);
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
      console.error('Error obteniendo precios:', error);
      return { success: false, error: error.message };
    }
  },

  // Buscar servicios
  async buscarServicios(consulta) {
    try {
      const serviciosRef = collection(db, 'services');
      const snapshot = await getDocs(serviciosRef);
      
      const resultados = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(s => {
          const title = s.title?.toLowerCase() || '';
          const subtitle = s.subtitle?.toLowerCase() || '';
          const consultaLower = consulta.toLowerCase();
          
          return title.includes(consultaLower) || 
                 subtitle.includes(consultaLower) ||
                 (consultaLower.includes('vuelo') && title.includes('vuelo')) ||
                 (consultaLower.includes('hotel') && title.includes('hotel'));
        });
      
      return {
        success: true,
        data: resultados,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error buscando servicios:', error);
      return { success: false, error: error.message, data: [] };
    }
  }
};