import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, db } from '../../services/firebase/config';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
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
  const [emailPendiente, setEmailPendiente] = useState(null);

  // Escuchar cambios en autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('🔄 Auth state:', firebaseUser?.email || 'No user');
      
      if (firebaseUser) {
        setUser(firebaseUser);
        
        // Verificar emailVerified en cada cambio
        if (firebaseUser.emailVerified) {
          const userRef = doc(db, 'users', firebaseUser.uid);
          await updateDoc(userRef, {
            emailVerified: true,
            updatedAt: new Date().toISOString()
          });
        }
        
        // Cargar datos de Firestore
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

  // ✅ REGISTRO CON VERIFICACIÓN OBLIGATORIA
  const register = async (email, password, userData) => {
    try {
      // 1. Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // 2. Guardar en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        name: userData.name,
        phone: userData.phone || '',
        emailVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      // 3. ENVIAR EMAIL DE VERIFICACIÓN
      await sendEmailVerification(user, {
        url: 'https://batistaglobalservice.web.app/cliente/login',
        handleCodeInApp: true
      });

      // 4. Guardar email pendiente y cerrar sesión
      setEmailPendiente(email);
      await signOut(auth);
      
      toast.success('✅ Revisa tu correo para verificar tu cuenta');
      
      return { 
        success: true, 
        necesitaVerificacion: true,
        email: email
      };
      
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

  // ✅ LOGIN - VERIFICA EMAIL
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // VERIFICAR EMAIL
      if (!user.emailVerified) {
        // Reenviar email
        await sendEmailVerification(user, {
          url: 'https://batistaglobalservice.web.app/cliente/login',
          handleCodeInApp: true
        });
        
        await signOut(auth);
        
        toast.warning('❌ Debes verificar tu email. Hemos reenviado el código.');
        return { 
          success: false, 
          necesitaVerificacion: true,
          email: email
        };
      }
      
      // ACTUALIZAR FIRESTORE
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        emailVerified: true,
        updatedAt: new Date().toISOString()
      });
      
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

  // ✅ REENVIAR VERIFICACIÓN
  const reenviarVerificacion = async () => {
    if (!user) {
      toast.error('No hay usuario para verificar');
      return { success: false };
    }
    
    try {
      await sendEmailVerification(user, {
        url: 'https://batistaglobalservice.web.app/cliente/login',
        handleCodeInApp: true
      });
      toast.success('✅ Email de verificación reenviado');
      return { success: true };
    } catch (error) {
      toast.error('Error al reenviar email');
      return { success: false };
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
    reenviarVerificacion,
    emailPendiente,
    isAuthenticated: !!user && user.emailVerified
  };

  return (
    <ClienteAuthContext.Provider value={value}>
      {children}
    </ClienteAuthContext.Provider>
  );
};