import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { getProductById } from '../../services/productService';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Función para cambiar de usuario (la llamará ClienteAuthContext)
  const setUser = useCallback((userId) => {
    setCurrentUserId(userId);
  }, []);

  // Clave única para localStorage por usuario
  const getStorageKey = useCallback(() => {
    return currentUserId ? `cart_${currentUserId}` : 'cart_guest';
  }, [currentUserId]);

  // Cargar carrito cuando cambia el usuario
  useEffect(() => {
    loadCart();
  }, [currentUserId]);

  const loadCart = async () => {
    const savedCart = localStorage.getItem(getStorageKey());
    
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        
        // Validar stock de cada producto
        const validatedCart = await Promise.all(
          parsedCart.map(async (item) => {
            const product = await getProductById(item.id);
            if (product.success) {
              const currentStock = product.data.stock || 0;
              if (currentStock < item.quantity) {
                if (currentStock === 0) {
                  toast.error(`${item.name} ya no está disponible`, { icon: '❌' });
                  return null;
                } else {
                  toast(`${item.name} ahora solo hay ${currentStock} unidades`, { icon: '⚠️' });
                  return { ...item, quantity: currentStock };
                }
              }
            }
            return item;
          })
        );
        
        const filteredCart = validatedCart.filter(item => item !== null);
        setCart(filteredCart);
      } catch (error) {
        console.error('Error loading cart:', error);
        setCart([]);
      }
    } else {
      setCart([]);
    }
  };

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem(getStorageKey(), JSON.stringify(cart));
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    setCartTotal(total);
    setCartCount(count);
  }, [cart, getStorageKey]);

  const validateStock = async (productId, requestedQuantity) => {
    const product = await getProductById(productId);
    if (!product.success) return { valid: false, error: 'Producto no encontrado' };
    
    const currentStock = product.data.stock || 0;
    if (currentStock < requestedQuantity) {
      if (currentStock === 0) {
        return { valid: false, error: 'Producto agotado' };
      }
      return { valid: false, error: `Solo hay ${currentStock} unidades disponibles`, availableStock: currentStock };
    }
    return { valid: true, availableStock: currentStock };
  };

  const addToCart = async (product, quantity = 1) => {
    const validation = await validateStock(product.id, quantity);
    
    if (!validation.valid) {
      toast.error(validation.error);
      return false;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > validation.availableStock) {
          toast.error(`Solo puedes agregar ${validation.availableStock} unidades en total`);
          return prevCart;
        }
        
        toast.success(`✓ ${product.name} - Cantidad actualizada`, { icon: '🛒', duration: 2000 });
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        toast.success(`✓ ${product.name} agregado al carrito`, { icon: '🛒', duration: 2000 });
        return [...prevCart, { ...product, quantity }];
      }
    });
    return true;
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const item = prevCart.find(item => item.id === productId);
      if (item) {
        toast.success(`✗ ${item.name} eliminado del carrito`, { icon: '🗑️', duration: 2000 });
      }
      return prevCart.filter(item => item.id !== productId);
    });
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const product = cart.find(item => item.id === productId);
    if (!product) return;

    const validation = await validateStock(productId, newQuantity);
    
    if (!validation.valid) {
      if (validation.availableStock) {
        setCart(prevCart =>
          prevCart.map(item =>
            item.id === productId
              ? { ...item, quantity: validation.availableStock }
              : item
          )
        );
        toast.error(`Solo hay ${validation.availableStock} unidades disponibles`);
      } else {
        removeFromCart(productId);
      }
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.success('🛒 Carrito vaciado', { duration: 2000 });
  };

  return (
    <CartContext.Provider value={{
      cart,
      cartTotal,
      cartCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      setUser, // ← Función para que ClienteAuth la llame
      loadCart
    }}>
      {children}
    </CartContext.Provider>
  );
};