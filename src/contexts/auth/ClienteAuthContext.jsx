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
import { limpiarCodigo } from '../../services/email/codigoService';

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

  // ✅ REGISTRO - AHORA CON EMAIL YA VERIFICADO
  const register = async (email, password, userData) => {
    try {
      // 1. Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // 2. Guardar en Firestore (YA VERIFICADO por código)
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        name: userData.name,
        phone: userData.phone || '',
        emailVerified: true, // ✅ Ya verificamos con código
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      // 3. Limpiar código temporal
      limpiarCodigo(email);
      
      // 4. Cerrar sesión para que el usuario haga login manualmente
      await signOut(auth);
      
      toast.success('✅ Cuenta creada exitosamente');
      
      return { success: true };
      
    } catch (error) {
      console.error('Error en registro:', error);
      let errorMessage = 'Error al registrarse';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este email ya está registrado';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email inválido';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña debe tener al menos 6 caracteres';
          break;
        default:
          errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // ✅ LOGIN NORMAL
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      toast.success('✅ Bienvenido');
      return { success: true, user };
      
    } catch (error) {
      console.error('Error en login:', error);
      let errorMessage = 'Error al iniciar sesión';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Usuario no encontrado';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Contraseña incorrecta';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Demasiados intentos. Intenta más tarde';
          break;
        default:
          errorMessage = error.message;
      }
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
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
    isAuthenticated: !!user
  };

  return (
    <ClienteAuthContext.Provider value={value}>
      {children}
    </ClienteAuthContext.Provider>
  );
};