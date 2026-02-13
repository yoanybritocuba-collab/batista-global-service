import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const ClienteAuthContext = createContext();

export const useClienteAuth = () => {
  const context = useContext(ClienteAuthContext);
  if (!context) {
    throw new Error('useClienteAuth debe usarse dentro de ClienteAuthProvider');
  }
  return context;
};

export const ClienteAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario de localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('cliente');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user:', error);
      }
    }
    setLoading(false);
  }, []);

  // Cuando el usuario cambia, notificar al carrito (a través de un evento personalizado)
  useEffect(() => {
    if (!loading) {
      // Disparar evento personalizado para que CartProvider se entere
      const event = new CustomEvent('usuarioCambio', { 
        detail: { userId: user?.id || null } 
      });
      window.dispatchEvent(event);
    }
  }, [user, loading]);

  const login = async (email, password) => {
    try {
      if (email && password) {
        const userData = {
          id: 'user_' + Date.now(),
          email,
          name: email.split('@')[0],
          createdAt: new Date().toISOString()
        };
        setUser(userData);
        localStorage.setItem('cliente', JSON.stringify(userData));
        toast.success('¡Bienvenido!');
        return { success: true };
      }
      return { success: false, error: 'Credenciales inválidas' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const newUser = {
        id: 'user_' + Date.now(),
        ...userData,
        createdAt: new Date().toISOString()
      };
      setUser(newUser);
      localStorage.setItem('cliente', JSON.stringify(newUser));
      toast.success('¡Registro exitoso!');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cliente');
    toast.success('Sesión cerrada');
  };

  return (
    <ClienteAuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </ClienteAuthContext.Provider>
  );
};