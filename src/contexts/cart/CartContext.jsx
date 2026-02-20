import React, { createContext, useContext, useEffect, useReducer, useCallback } from 'react';
import { useClienteAuth } from '../auth/ClienteAuthContext';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

// Reducer para manejar el estado del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload, loading: false };
    case 'ADD_ITEM':
      // Verificar si el producto ya existe
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        // Si existe, actualizar cantidad
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return { ...state, items: updatedItems };
      }
      // Si no existe, agregar nuevo
      return { ...state, items: [...state.items, action.payload] };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        )
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'CLEAR_CART':
      return { ...state, items: [], loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

// Función para obtener la clave del localStorage según el usuario
const getStorageKey = (userId) => {
  if (!userId) return 'cart_guest';
  return `cart_user_${userId}`;
};

// Cargar carrito desde localStorage
const loadCartFromStorage = (userId) => {
  const key = getStorageKey(userId);
  try {
    const savedCart = localStorage.getItem(key);
    console.log(`🔑 Cargando carrito para clave: ${key}`, savedCart ? '✅' : '❌ vacío');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Error loading cart:', error);
    return [];
  }
};

// Guardar carrito en localStorage
const saveCartToStorage = (userId, items) => {
  const key = getStorageKey(userId);
  try {
    localStorage.setItem(key, JSON.stringify(items));
    console.log(`💾 Guardando carrito para clave: ${key} (${items.length} items)`);
  } catch (error) {
    console.error('Error saving cart:', error);
  }
};

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useClienteAuth();
  const [state, dispatch] = useReducer(cartReducer, { items: [], loading: true });

  // Obtener userId actual (USAMOS EL UID DE FIREBASE)
  const userId = user?.uid || null;

  // Cargar carrito cuando cambia el usuario
  useEffect(() => {
    const loadCart = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      console.log('👤 Usuario actual:', userId || 'Invitado');
      
      // Cargar carrito específico del usuario
      const cartItems = loadCartFromStorage(userId);
      dispatch({ type: 'SET_CART', payload: cartItems });
      
      dispatch({ type: 'SET_LOADING', payload: false });
    };

    loadCart();
  }, [userId]);

  // Guardar carrito cuando cambia
  useEffect(() => {
    if (!state.loading) {
      saveCartToStorage(userId, state.items);
    }
  }, [state.items, userId, state.loading]);

  // Agregar al carrito
  const addToCart = useCallback((product, quantity = 1) => {
    const newItem = { ...product, quantity };
    dispatch({ type: 'ADD_ITEM', payload: newItem });
    toast.success('Producto agregado al carrito');
  }, []);

  // Eliminar del carrito
  const removeFromCart = useCallback((productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
    toast.success('Producto eliminado del carrito');
  }, []);

  // Actualizar cantidad
  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    const item = state.items.find(item => item.id === productId);
    if (item) {
      const updatedItem = { ...item, quantity };
      dispatch({ type: 'UPDATE_ITEM', payload: updatedItem });
    }
  }, [state.items, removeFromCart]);

  // Vaciar carrito
  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Carrito vaciado');
  }, []);

  // Calcular total
  const cartTotal = state.items.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  // Contar items
  const cartCount = state.items.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const value = {
    cart: state.items,
    loading: state.loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
};