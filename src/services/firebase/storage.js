// src/firebase/storage.js
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  listAll 
} from "firebase/storage";
import { storage } from "./config";

// Subir imagen de producto
export const uploadProductImage = async (file, productId = 'temp') => {
  try {
    // Si no hay productId (producto nuevo), usamos 'temp' temporalmente
    const fileName = `products/${productId}/${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    const storageRef = ref(storage, fileName);
    
    console.log('📤 Subiendo imagen:', file.name, 'a:', fileName);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    console.log('✅ Imagen subida exitosamente:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("❌ Error subiendo imagen:", error);
    throw error;
  }
};

// Obtener URL de imagen
export const getImageUrl = async (path) => {
  try {
    const storageRef = ref(storage, path);
    const url = await getDownloadURL(storageRef);
    console.log('✅ URL obtenida para', path);
    return url;
  } catch (error) {
    console.error("❌ Error obteniendo URL de imagen:", error);
    throw error;
  }
};

// Eliminar imagen
export const deleteImage = async (imageUrl) => {
  try {
    console.log('🗑️ Eliminando imagen:', imageUrl);
    
    // Extraer la ruta de la URL completa
    const urlObj = new URL(imageUrl);
    const path = decodeURIComponent(urlObj.pathname.split('/o/')[1]?.split('?')[0] || '');
    
    if (!path) {
      throw new Error('No se pudo extraer la ruta de la URL');
    }
    
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    
    console.log('✅ Imagen eliminada');
    return true;
  } catch (error) {
    console.error("❌ Error eliminando imagen:", error);
    throw error;
  }
};

// Función para usar URL directa si ya existe
export const useExistingImage = (imageName) => {
  // Retorna URL directa de tus imágenes existentes en Storage
  const baseUrl = 'https://storage.googleapis.com/batistaglobalservice.firebasestorage.app/';
  
  // Mapeo de nombres de archivo
  const imageMap = {
    'cosina.png': `${baseUrl}cosina.png`,
    'fogon.png': `${baseUrl}fogon.png`,
    'frisser.png': `${baseUrl}frisser.png`,
    'mescladora.png': `${baseUrl}mescladora.png`
  };
  
  return imageMap[imageName] || null;
};

// Verificar si una URL es válida para Firebase Storage
export const isValidFirebaseUrl = (url) => {
  return url && (
    url.includes('firebasestorage.googleapis.com') ||
    url.includes('firebasestorage.app') ||
    url.startsWith('blob:') ||
    url.startsWith('data:image')
  );
};