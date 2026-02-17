import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay admin en localStorage
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth) {
      try {
        setUser(JSON.parse(adminAuth));
      } catch (error) {
        console.error('Error loading admin:', error);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // SOLO admin con contraseña fija
      if (email === 'admin@batista.com' && password === 'Keily8520') {
        const adminUser = {
          id: 'admin',
          email,
          name: 'Administrador',
          role: 'admin'
        };
        setUser(adminUser);
        localStorage.setItem('adminAuth', JSON.stringify(adminUser));
        toast.success('✅ Bienvenido Administrador');
        return { success: true };
      }

      // Si no coincide, error
      toast.error('❌ Credenciales incorrectas');
      return { success: false, error: 'Credenciales inválidas' };
    } catch (error) {
      toast.error('❌ Error al iniciar sesión');
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminAuth');
    toast.success('✅ Sesión cerrada');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};