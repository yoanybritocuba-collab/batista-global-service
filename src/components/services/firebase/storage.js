import { storage } from './config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

// Subir una imagen a Firebase Storage
export const uploadImage = async (file, folder = 'destinos') => {
  try {
    // Crear un nombre único para la imagen
    const fileName = `${folder}/${uuidv4()}_${file.name}`;
    const storageRef = ref(storage, fileName);
    
    // Subir el archivo
    const snapshot = await uploadBytes(storageRef, file);
    
    // Obtener la URL de descarga
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    console.log('✅ Imagen subida:', downloadURL);
    return { success: true, url: downloadURL, path: fileName };
  } catch (error) {
    console.error('❌ Error subiendo imagen:', error);
    return { success: false, error: error.message };
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
      failed: failed.length
    };
  } catch (error) {
    console.error('❌ Error subiendo múltiples imágenes:', error);
    return { success: false, error: error.message };
  }
};

// Eliminar una imagen de Firebase Storage
export const deleteImage = async (imagePath) => {
  try {
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
    const imageRef = ref(storage, imagePath);
    const url = await getDownloadURL(imageRef);
    return { success: true, url };
  } catch (error) {
    console.error('❌ Error obteniendo URL:', error);
    return { success: false, error: error.message };
  }
};
