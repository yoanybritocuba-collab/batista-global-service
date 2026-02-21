import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';

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

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('batistaCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error al cargar carrito:', error);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('batistaCart', JSON.stringify(cart));
    
    // Calcular total y cantidad
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    setCartTotal(total);
    setCartCount(count);
  }, [cart]);

  // Agregar al carrito
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        toast.success(`✓ ${product.name} - Cantidad actualizada`, {
          icon: '🛒',
          duration: 2000
        });
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success(`✓ ${product.name} agregado al carrito`, {
          icon: '🛒',
          duration: 2000
        });
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Eliminar del carrito
  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const item = prevCart.find(item => item.id === productId);
      if (item) {
        toast.success(`✗ ${item.name} eliminado del carrito`, {
          icon: '🗑️',
          duration: 2000
        });
      }
      return prevCart.filter(item => item.id !== productId);
    });
  };

  // Actualizar cantidad
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
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

  // Vaciar carrito
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
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
