import { storage } from './config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

// Subir una imagen a Firebase Storage
export const uploadImage = async (file, folder = 'destinos') => {
  try {
    console.log('📤 Subiendo imagen...', file.name);
    
    if (!file) {
      throw new Error('No se proporcionó un archivo');
    }

    // Crear un nombre único para la imagen
    const fileName = `${folder}/${uuidv4()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const storageRef = ref(storage, fileName);
    
    console.log('📁 Referencia de storage:', fileName);

    // Subir el archivo
    const snapshot = await uploadBytes(storageRef, file);
    console.log('✅ Archivo subido a storage');

    // Obtener la URL de descarga
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('✅ URL obtenida:', downloadURL);

    return {
      success: true,
      url: downloadURL,
      path: fileName
    };
  } catch (error) {
    console.error('❌ Error subiendo imagen:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Subir múltiples imágenes
export const uploadMultipleImages = async (files, folder = 'destinos') => {
  try {
    const uploadPromises = files.map(file => uploadImage(file, folder));
    const results = await Promise.all(uploadPromises);

    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    return {
      success: successful.length > 0,
      urls: successful.map(r => r.url),
      paths: successful.map(r => r.path),
      failed: failed.length,
      errors: failed.map(r => r.error)
    };
  } catch (error) {
    console.error('❌ Error subiendo múltiples imágenes:', error);
    return { success: false, error: error.message };
  }
};

// Eliminar una imagen de Firebase Storage
export const deleteImage = async (imagePath) => {
  try {
    if (!imagePath) {
      throw new Error('No se proporcionó la ruta de la imagen');
    }

    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef);
    console.log('✅ Imagen eliminada:', imagePath);
    return { success: true };
  } catch (error) {
    console.error('❌ Error eliminando imagen:', error);
    return { success: false, error: error.message };
  }
};

// Obtener URL de una imagen por su path
export const getImageUrl = async (imagePath) => {
  try {
    if (!imagePath) {
      throw new Error('No se proporcionó la ruta de la imagen');
    }

    const imageRef = ref(storage, imagePath);
    const url = await getDownloadURL(imageRef);
    return { success: true, url };
  } catch (error) {
    console.error('❌ Error obteniendo URL:', error);
    return { success: false, error: error.message };
  }
};

// Subir imagen desde base64 (alternativa)
export const uploadBase64Image = async (base64Data, folder = 'destinos') => {       
  try {
    const base64Response = await fetch(base64Data);
    const blob = await base64Response.blob();

    const fileName = `${folder}/${uuidv4()}.jpg`;
    const storageRef = ref(storage, fileName);

    const snapshot = await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return { success: true, url: downloadURL, path: fileName };
  } catch (error) {
    console.error('❌ Error subiendo imagen base64:', error);
    return { success: false, error: error.message };
  }
};

// Verificar si una URL es de Firebase Storage
export const isFirebaseStorageUrl = (url) => {
  return url && url.includes('firebasestorage.googleapis.com');
};

// Obtener el path desde una URL de Firebase Storage
export const getPathFromUrl = (url) => {
  try {
    if (!url || !isFirebaseStorageUrl(url)) return null;

    const matches = url.match(/\/o\/(.+?)\?/);
    if (matches && matches[1]) {
      return decodeURIComponent(matches[1]);
    }
    return null;
  } catch (error) {
    console.error('Error extrayendo path:', error);
    return null;
  }
};
