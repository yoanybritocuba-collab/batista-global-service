import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, db } from '../../services/firebase/config';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { generarCodigo, guardarCodigo, verificarCodigo } from '../../services/email/codigoService';

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
  const [emailPendiente, setEmailPendiente] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        
        const docRef = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // REGISTRO - Guarda email pendiente y genera código
  const register = async (email, password, userData) => {
    try {
      // Guardar email pendiente
      setEmailPendiente(email);
      
      // Generar código de verificación
      const codigo = generarCodigo();
      guardarCodigo(email, codigo);
      
      // Mostrar alerta con el código (para pruebas)
      alert(`🔑 CÓDIGO DE VERIFICACIÓN: ${codigo}\n\nGuárdalo para activar tu cuenta.`);
      
      toast.success('✅ Código generado. Ve a "Verificar Código" para activar tu cuenta.');
      
      return { 
        success: true, 
        necesitaVerificacion: true,
        email: email
      };
      
    } catch (error) {
      console.error('Error en registro:', error);
      toast.error('Error al registrar');
      return { success: false, error: error.message };
    }
  };

  // VERIFICAR CÓDIGO Y CREAR USUARIO EN FIREBASE
  const verificarYCompletarRegistro = async (email, password, codigo, userData) => {
    try {
      // Verificar código
      const resultado = verificarCodigo(email, codigo);
      
      if (!resultado.valido) {
        toast.error(resultado.error);
        return { success: false, error: resultado.error };
      }
      
      // Código válido - CREAR USUARIO EN FIREBASE
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Guardar en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        name: userData.name,
        phone: userData.phone || '',
        emailVerified: true, // Ya verificamos con código
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      setEmailPendiente(null);
      toast.success('✅ Cuenta activada correctamente');
      
      return { success: true, user };
      
    } catch (error) {
      console.error('Error activando cuenta:', error);
      toast.error('Error al activar la cuenta');
      return { success: false, error: error.message };
    }
  };

  // LOGIN
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success('✅ Bienvenido');
      return { success: true, user: userCredential.user };
      
    } catch (error) {
      console.error('Error en login:', error);
      toast.error('Credenciales incorrectas');
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Sesión cerrada');
      return { success: true };
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      toast.error('Error al cerrar sesión');
      return { success: false };
    }
  };

  const value = {
    user,
    userData,
    loading,
    register,
    login,
    logout,
    verificarYCompletarRegistro,
    emailPendiente,
    isAuthenticated: !!user
  };

  return (
    <ClienteAuthContext.Provider value={value}>
      {children}
    </ClienteAuthContext.Provider>
  );
};