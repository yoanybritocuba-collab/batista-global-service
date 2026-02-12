import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  serverTimestamp 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "./firebase/firebaseConfig";

// Colección de productos en Firestore
const PRODUCTS_COLLECTION = "products";

// Obtener todos los productos
export const getProducts = async () => {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const q = query(productsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: products };
  } catch (error) {
    console.error("Error getting products:", error);
    return { success: false, error: error.message };
  }
};

// Obtener un producto por ID
export const getProductById = async (productId) => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    const productSnap = await getDoc(productRef);
    
    if (productSnap.exists()) {
      return { success: true, data: { id: productSnap.id, ...productSnap.data() } };
    } else {
      return { success: false, error: "Producto no encontrado" };
    }
  } catch (error) {
    console.error("Error getting product:", error);
    return { success: false, error: error.message };
  }
};

// Crear un nuevo producto
export const createProduct = async (productData) => {
  try {
    const timestamp = serverTimestamp();
    
    const productToSave = {
      ...productData,
      createdAt: timestamp,
      updatedAt: timestamp,
      views: 0,
      purchases: 0,
      isFeatured: productData.isFeatured || false,
      isNew: productData.isNew || true,
      discount: productData.discount || 0,
      stock: parseInt(productData.stock) || 0,
      price: parseFloat(productData.price) || 0,
      originalPrice: productData.originalPrice ? parseFloat(productData.originalPrice) : null
    };
    
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), productToSave);
    
    return { 
      success: true, 
      data: { id: docRef.id, ...productToSave },
      message: "Producto creado exitosamente"
    };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: error.message };
  }
};

// Actualizar un producto existente
export const updateProduct = async (productId, productData) => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    
    const productToUpdate = {
      ...productData,
      updatedAt: serverTimestamp(),
      stock: parseInt(productData.stock) || 0,
      price: parseFloat(productData.price) || 0,
      discount: parseInt(productData.discount) || 0
    };
    
    await updateDoc(productRef, productToUpdate);
    
    return { 
      success: true, 
      message: "Producto actualizado exitosamente"
    };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: error.message };
  }
};

// Eliminar un producto
export const deleteProduct = async (productId) => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    await deleteDoc(productRef);
    
    return { 
      success: true, 
      message: "Producto eliminado exitosamente"
    };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: error.message };
  }
};

// Subir imagen al Storage
export const uploadProductImage = async (file, productId = null) => {
  try {
    // Crear nombre único para la imagen
    const timestamp = Date.now();
    const fileName = productId 
      ? `products/${productId}/${timestamp}_${file.name}`
      : `products/temp/${timestamp}_${file.name}`;
    
    const storageRef = ref(storage, fileName);
    
    // Subir archivo
    await uploadBytes(storageRef, file);
    
    // Obtener URL de descarga
    const downloadURL = await getDownloadURL(storageRef);
    
    return {
      success: true,
      url: downloadURL,
      path: fileName,
      fileName: file.name,
      size: file.size,
      type: file.type
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { success: false, error: error.message };
  }
};

// Subir múltiples imágenes
export const uploadMultipleImages = async (files, productId = null) => {
  try {
    const uploadPromises = files.map(file => uploadProductImage(file, productId));
    const results = await Promise.all(uploadPromises);
    
    // Verificar si todas las subidas fueron exitosas
    const failedUploads = results.filter(result => !result.success);
    
    if (failedUploads.length > 0) {
      return {
        success: false,
        error: "Algunas imágenes no se pudieron subir",
        failed: failedUploads,
        successful: results.filter(result => result.success)
      };
    }
    
    return {
      success: true,
      images: results
    };
  } catch (error) {
    console.error("Error uploading multiple images:", error);
    return { success: false, error: error.message };
  }
};

// Eliminar imagen del Storage
export const deleteImage = async (imagePath) => {
  try {
    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef);
    
    return { success: true, message: "Imagen eliminada" };
  } catch (error) {
    console.error("Error deleting image:", error);
    return { success: false, error: error.message };
  }
};

// Obtener productos por categoría
export const getProductsByCategory = async (category) => {
  try {
    const products = await getProducts();
    
    if (!products.success) {
      return products;
    }
    
    const filteredProducts = products.data.filter(
      product => product.category === category
    );
    
    return { success: true, data: filteredProducts };
  } catch (error) {
    console.error("Error getting products by category:", error);
    return { success: false, error: error.message };
  }
};

// Buscar productos
export const searchProducts = async (searchTerm) => {
  try {
    const products = await getProducts();
    
    if (!products.success) {
      return products;
    }
    
    const searchTermLower = searchTerm.toLowerCase();
    const filteredProducts = products.data.filter(product => 
      product.name.toLowerCase().includes(searchTermLower) ||
      product.description?.toLowerCase().includes(searchTermLower) ||
      product.category?.toLowerCase().includes(searchTermLower)
    );
    
    return { success: true, data: filteredProducts };
  } catch (error) {
    console.error("Error searching products:", error);
    return { success: false, error: error.message };
  }
};