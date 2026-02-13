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
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Verificar si hay admin en localStorage
    const adminAuth = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminAuth);
    
    // Si hay un usuario guardado
    const savedUser = localStorage.getItem('authUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user:', error);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Para admin (contraseña especial)
      if (email === 'admin@batista.com' && password === 'Keily8520') {
        const adminUser = {
          id: 'admin',
          email,
          name: 'Administrador',
          role: 'admin',
          isAdmin: true
        };
        setUser(adminUser);
        setIsAdmin(true);
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('authUser', JSON.stringify(adminUser));
        toast.success('Bienvenido Administrador');
        return { success: true, role: 'admin' };
      }
      
      // Para clientes normales (simulado)
      if (email && password) {
        const clientUser = {
          id: 'client_' + Date.now(),
          email,
          name: email.split('@')[0],
          role: 'client',
          isAdmin: false
        };
        setUser(clientUser);
        setIsAdmin(false);
        localStorage.setItem('authUser', JSON.stringify(clientUser));
        toast.success('¡Bienvenido!');
        return { success: true, role: 'client' };
      }
      
      return { success: false, error: 'Credenciales inválidas' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('authUser');
    toast.success('Sesión cerrada');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};