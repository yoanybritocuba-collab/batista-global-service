// src/firebase/firestore.js
import { 
  collection, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where,
  orderBy,
  limit 
} from "firebase/firestore";
import { db } from "./firebaseConfig"; // Asegúrate que este import sea correcto

// NOMBRES DE COLECCIONES
const PRODUCTS_COLLECTION = "products";
const CATEGORIES_COLLECTION = "categories";
const SERVICES_COLLECTION = "services";
const ORDERS_COLLECTION = "orders";
const USERS_COLLECTION = "users";

// ===================== PRODUCTOS =====================
export const productsCollection = collection(db, PRODUCTS_COLLECTION);

// Obtener todos los productos
export const getProducts = async () => {
  try {
    const q = query(productsCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(`✅ Productos obtenidos: ${products.length}`);
    return products;
  } catch (error) {
    console.error("❌ Error obteniendo productos:", error);
    throw error;
  }
};

// Obtener producto por ID
export const getProductById = async (id) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log(`✅ Producto ${id} obtenido`);
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log(`❌ Producto ${id} no encontrado`);
      throw new Error("Producto no encontrado");
    }
  } catch (error) {
    console.error(`❌ Error obteniendo producto ${id}:`, error);
    throw error;
  }
};

// Obtener productos por categoría
export const getProductsByCategory = async (category) => {
  try {
    const q = query(
      productsCollection, 
      where("category", "==", category),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(`✅ Productos por categoría "${category}": ${products.length}`);
    return products;
  } catch (error) {
    console.error(`❌ Error obteniendo productos por categoría ${category}:`, error);
    throw error;
  }
};

// Obtener productos en oferta (con descuento)
export const getProductsOnSale = async () => {
  try {
    const q = query(
      productsCollection, 
      where("discount", ">", 0),
      orderBy("discount", "desc"),
      limit(12)
    );
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(`✅ Productos en oferta: ${products.length}`);
    return products;
  } catch (error) {
    console.error("❌ Error obteniendo productos en oferta:", error);
    throw error;
  }
};

// Obtener productos nuevos
export const getNewProducts = async () => {
  try {
    const q = query(
      productsCollection, 
      where("isNew", "==", true),
      orderBy("createdAt", "desc"),
      limit(8)
    );
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(`✅ Productos nuevos: ${products.length}`);
    return products;
  } catch (error) {
    console.error("❌ Error obteniendo productos nuevos:", error);
    throw error;
  }
};

// Obtener productos destacados
export const getFeaturedProducts = async () => {
  try {
    const q = query(
      productsCollection, 
      where("isFeatured", "==", true),
      orderBy("createdAt", "desc"),
      limit(6)
    );
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(`✅ Productos destacados: ${products.length}`);
    return products;
  } catch (error) {
    console.error("❌ Error obteniendo productos destacados:", error);
    throw error;
  }
};

// Agregar producto
export const addProduct = async (productData) => {
  try {
    const productWithTimestamp = {
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      purchases: 0
    };
    
    const docRef = await addDoc(productsCollection, productWithTimestamp);
    console.log(`✅ Producto agregado con ID: ${docRef.id}`);
    return { id: docRef.id, ...productWithTimestamp };
  } catch (error) {
    console.error("❌ Error agregando producto:", error);
    throw error;
  }
};

// Actualizar producto
export const updateProduct = async (id, productData) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const updateData = {
      ...productData,
      updatedAt: new Date().toISOString()
    };
    
    await updateDoc(docRef, updateData);
    console.log(`✅ Producto ${id} actualizado`);
    return { id, ...updateData };
  } catch (error) {
    console.error(`❌ Error actualizando producto ${id}:`, error);
    throw error;
  }
};

// Eliminar producto
export const deleteProduct = async (id) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(docRef);
    console.log(`✅ Producto ${id} eliminado`);
    return id;
  } catch (error) {
    console.error(`❌ Error eliminando producto ${id}:`, error);
    throw error;
  }
};

// ===================== CATEGORÍAS =====================
export const categoriesCollection = collection(db, CATEGORIES_COLLECTION);

// Obtener todas las categorías
export const getCategories = async () => {
  try {
    const q = query(categoriesCollection, orderBy("name"));
    const querySnapshot = await getDocs(q);
    const categories = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(`✅ Categorías obtenidas: ${categories.length}`);
    return categories;
  } catch (error) {
    console.error("❌ Error obteniendo categorías:", error);
    throw error;
  }
};

// Obtener categoría por ID
export const getCategoryById = async (id) => {
  try {
    const docRef = doc(db, CATEGORIES_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Categoría no encontrada");
    }
  } catch (error) {
    console.error(`❌ Error obteniendo categoría ${id}:`, error);
    throw error;
  }
};

// Agregar categoría
export const addCategory = async (categoryData) => {
  try {
    const categoryWithTimestamp = {
      ...categoryData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      productCount: 0
    };
    
    const docRef = await addDoc(categoriesCollection, categoryWithTimestamp);
    console.log(`✅ Categoría agregada: ${categoryData.name}`);
    return { id: docRef.id, ...categoryWithTimestamp };
  } catch (error) {
    console.error("❌ Error agregando categoría:", error);
    throw error;
  }
};

// Actualizar categoría
export const updateCategory = async (id, categoryData) => {
  try {
    const docRef = doc(db, CATEGORIES_COLLECTION, id);
    const updateData = {
      ...categoryData,
      updatedAt: new Date().toISOString()
    };
    
    await updateDoc(docRef, updateData);
    console.log(`✅ Categoría ${id} actualizada`);
    return { id, ...updateData };
  } catch (error) {
    console.error(`❌ Error actualizando categoría ${id}:`, error);
    throw error;
  }
};

// Eliminar categoría
export const deleteCategory = async (id) => {
  try {
    const docRef = doc(db, CATEGORIES_COLLECTION, id);
    await deleteDoc(docRef);
    console.log(`✅ Categoría ${id} eliminada`);
    return id;
  } catch (error) {
    console.error(`❌ Error eliminando categoría ${id}:`, error);
    throw error;
  }
};

// ===================== SERVICIOS =====================
export const servicesCollection = collection(db, SERVICES_COLLECTION);

// Obtener todos los servicios
export const getServices = async () => {
  try {
    const q = query(servicesCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const services = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return services;
  } catch (error) {
    console.error("❌ Error obteniendo servicios:", error);
    throw error;
  }
};

// Obtener servicios por categoría
export const getServicesByCategory = async (category) => {
  try {
    const q = query(
      servicesCollection, 
      where("category", "==", category),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`❌ Error obteniendo servicios por categoría ${category}:`, error);
    throw error;
  }
};

// Agregar servicio
export const addService = async (serviceData) => {
  try {
    const serviceWithTimestamp = {
      ...serviceData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const docRef = await addDoc(servicesCollection, serviceWithTimestamp);
    return { id: docRef.id, ...serviceWithTimestamp };
  } catch (error) {
    console.error("❌ Error agregando servicio:", error);
    throw error;
  }
};

// ===================== PEDIDOS =====================
export const ordersCollection = collection(db, ORDERS_COLLECTION);

// Crear pedido
export const createOrder = async (orderData) => {
  try {
    const orderWithTimestamp = {
      ...orderData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'pending'
    };
    
    const docRef = await addDoc(ordersCollection, orderWithTimestamp);
    return { id: docRef.id, ...orderWithTimestamp };
  } catch (error) {
    console.error("❌ Error creando pedido:", error);
    throw error;
  }
};

// ===================== FUNCIONES ÚTILES =====================

// Buscar productos por texto
export const searchProducts = async (searchTerm) => {
  try {
    // Nota: Firestore no soporta búsqueda de texto completo por defecto
    // Esta es una implementación básica - para producción necesitarías Algolia o similar
    const products = await getProducts();
    const searchLower = searchTerm.toLowerCase();
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchLower)))
    );
  } catch (error) {
    console.error("❌ Error buscando productos:", error);
    throw error;
  }
};

// Obtener estadísticas
export const getStats = async () => {
  try {
    const products = await getProducts();
    const categories = await getCategories();
    
    return {
      totalProducts: products.length,
      totalCategories: categories.length,
      totalOnSale: products.filter(p => p.discount > 0).length,
      totalNew: products.filter(p => p.isNew).length,
      totalFeatured: products.filter(p => p.isFeatured).length
    };
  } catch (error) {
    console.error("❌ Error obteniendo estadísticas:", error);
    throw error;
  }
};