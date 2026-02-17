import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  getUserData,
  onAuthStateChange,
  updateUserData
} from '../../services/firebase/auth';
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
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Escuchar cambios en la autenticación
  useEffect(() => {
    console.log("📡 Configurando listener de autenticación...");
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      console.log("🔄 Cambio en autenticación:", firebaseUser ? "Usuario logueado" : "Usuario no logueado");
      
      if (firebaseUser) {
        console.log("👤 Usuario autenticado:", firebaseUser.uid);
        setUser(firebaseUser);
        
        // Cargar datos adicionales de Firestore
        console.log("📥 Cargando datos de Firestore para:", firebaseUser.uid);
        const result = await getUserData(firebaseUser.uid);
        if (result.success) {
          console.log("✅ Datos de usuario cargados:", result.data);
          setUserData(result.data);
        } else {
          console.log("⚠️ No se encontraron datos en Firestore:", result.error);
        }
      } else {
        console.log("👤 Usuario no autenticado");
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => {
      console.log("📴 Limpiando listener de autenticación");
      unsubscribe();
    };
  }, []);

  // Login
  const login = async (email, password) => {
    console.log("🔐 Intentando login con:", email);
    setLoading(true);
    const result = await loginUser(email, password);
    
    if (result.success) {
      console.log("✅ Login exitoso");
      toast.success('¡Bienvenido de vuelta!');
    } else {
      console.log("❌ Login falló:", result.error);
      toast.error(result.error);
    }
    
    setLoading(false);
    return result;
  };

  // Registro
  const register = async (userData) => {
    console.log("📝 Intentando registro con:", userData.email);
    setLoading(true);
    const result = await registerUser(
      userData.email, 
      userData.password, 
      userData
    );
    
    if (result.success) {
      console.log("✅ Registro exitoso");
      toast.success('¡Registro exitoso! Bienvenido');
    } else {
      console.log("❌ Registro falló:", result.error);
      toast.error(result.error);
    }
    
    setLoading(false);
    return result;
  };

  // Logout
  const logout = async () => {
    console.log("🚪 Cerrando sesión");
    setLoading(true);
    const result = await logoutUser();
    
    if (result.success) {
      console.log("✅ Sesión cerrada");
      toast.success('Sesión cerrada');
    } else {
      console.log("❌ Error al cerrar sesión");
      toast.error('Error al cerrar sesión');
    }
    
    setLoading(false);
    return result;
  };

  // Actualizar datos del usuario
  const updateUser = async (data) => {
    if (!user) return { success: false, error: 'No hay usuario autenticado' };
    
    console.log("✏️ Actualizando datos de usuario:", data);
    const result = await updateUserData(user.uid, data);
    
    if (result.success) {
      // Recargar datos del usuario
      console.log("🔄 Recargando datos de usuario");
      const userDataResult = await getUserData(user.uid);
      if (userDataResult.success) {
        setUserData(userDataResult.data);
      }
      toast.success('Perfil actualizado');
    }
    
    return result;
  };

  const value = {
    user,
    userData,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return (
    <ClienteAuthContext.Provider value={value}>
      {children}
    </ClienteAuthContext.Provider>
  );
};