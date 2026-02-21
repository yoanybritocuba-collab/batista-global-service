// src/services/productService.js
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc,
  query,
  orderBy,
  serverTimestamp 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "./firebase/config"; // ✅ RUTA CORREGIDA

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
      products.push({
        id: doc.id,
        ...doc.data()
      });
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
    const productDoc = await getDoc(productRef);
    
    if (productDoc.exists()) {
      return { 
        success: true, 
        data: { id: productDoc.id, ...productDoc.data() } 
      };
    } else {
      return { success: false, error: "Producto no encontrado" };
    }
  } catch (error) {
    console.error("Error getting product:", error);
    return { success: false, error: error.message };
  }
};

// Crear un nuevo producto
export const createProduct = async (productData, imageFile = null) => {
  try {
    let imageUrl = null;
    
    // Subir imagen si existe
    if (imageFile) {
      const imageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }
    
    // Crear producto en Firestore
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const docRef = await addDoc(productsRef, {
      ...productData,
      imageUrl,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return { 
      success: true, 
      data: { id: docRef.id, ...productData, imageUrl } 
    };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: error.message };
  }
};

// Actualizar un producto
export const updateProduct = async (productId, productData, imageFile = null) => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    let imageUrl = productData.imageUrl;
    
    // Subir nueva imagen si existe
    if (imageFile) {
      // Eliminar imagen anterior si existe
      if (productData.imageUrl) {
        try {
          const oldImageRef = ref(storage, productData.imageUrl);
          await deleteObject(oldImageRef);
        } catch (error) {
          console.warn("Error deleting old image:", error);
        }
      }
      
      // Subir nueva imagen
      const imageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }
    
    // Actualizar en Firestore
    await updateDoc(productRef, {
      ...productData,
      imageUrl,
      updatedAt: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: error.message };
  }
};

// Eliminar un producto
export const deleteProduct = async (productId, imageUrl = null) => {
  try {
    // Eliminar imagen si existe
    if (imageUrl) {
      try {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      } catch (error) {
        console.warn("Error deleting image:", error);
      }
    }
    
    // Eliminar de Firestore
    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    await deleteDoc(productRef);
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: error.message };
  }
};