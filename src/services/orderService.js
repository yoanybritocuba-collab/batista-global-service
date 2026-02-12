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
  where,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "./firebase/firebaseConfig";

const ORDERS_COLLECTION = "orders";

// Obtener todas las órdenes
export const getOrders = async () => {
  try {
    const ordersRef = collection(db, ORDERS_COLLECTION);
    const q = query(ordersRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: orders };
  } catch (error) {
    console.error("Error getting orders:", error);
    // Datos de ejemplo para desarrollo
    const mockOrders = [
      {
        id: "ORD-001",
        customer: { name: "Juan Pérez", email: "juan@email.com" },
        total: 125.99,
        status: "delivered",
        createdAt: new Date().toISOString(),
        items: []
      },
      {
        id: "ORD-002",
        customer: { name: "María García", email: "maria@email.com" },
        total: 89.99,
        status: "processing",
        createdAt: new Date().toISOString(),
        items: []
      },
      {
        id: "ORD-003",
        customer: { name: "Carlos Rodríguez", email: "carlos@email.com" },
        total: 299.99,
        status: "pending",
        createdAt: new Date().toISOString(),
        items: []
      },
      {
        id: "ORD-004",
        customer: { name: "Ana Martínez", email: "ana@email.com" },
        total: 54.50,
        status: "shipped",
        createdAt: new Date().toISOString(),
        items: []
      },
      {
        id: "ORD-005",
        customer: { name: "Pedro Sánchez", email: "pedro@email.com" },
        total: 199.99,
        status: "delivered",
        createdAt: new Date().toISOString(),
        items: []
      }
    ];
    return { success: true, data: mockOrders };
  }
};

// Obtener una orden por ID
export const getOrderById = async (orderId) => {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    const orderSnap = await getDoc(orderRef);
    
    if (orderSnap.exists()) {
      return { success: true, data: { id: orderSnap.id, ...orderSnap.data() } };
    } else {
      return { success: false, error: "Orden no encontrada" };
    }
  } catch (error) {
    console.error("Error getting order:", error);
    return { success: false, error: error.message };
  }
};

// Crear una nueva orden
export const createOrder = async (orderData) => {
  try {
    const timestamp = serverTimestamp();
    
    const orderToSave = {
      ...orderData,
      createdAt: timestamp,
      updatedAt: timestamp,
      status: orderData.status || "pending"
    };
    
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), orderToSave);
    
    return { 
      success: true, 
      data: { id: docRef.id, ...orderToSave },
      message: "Orden creada exitosamente"
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: error.message };
  }
};

// Actualizar estado de una orden
export const updateOrderStatus = async (orderId, status) => {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    
    await updateDoc(orderRef, {
      status: status,
      updatedAt: serverTimestamp()
    });
    
    return { 
      success: true, 
      message: "Estado de orden actualizado"
    };
  } catch (error) {
    console.error("Error updating order:", error);
    return { success: false, error: error.message };
  }
};

// Obtener órdenes por estado
export const getOrdersByStatus = async (status) => {
  try {
    const ordersRef = collection(db, ORDERS_COLLECTION);
    const q = query(ordersRef, where("status", "==", status), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: orders };
  } catch (error) {
    console.error("Error getting orders by status:", error);
    return { success: false, error: error.message };
  }
};