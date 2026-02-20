import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
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

  // Escuchar cambios en la autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('🔄 Cambio en autenticación:', firebaseUser ? 'Usuario logueado' : 'Usuario no logueado');
      
      if (firebaseUser) {
        setUser(firebaseUser);
        
        // Cargar datos adicionales de Firestore
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

  // REGISTRO CON VERIFICACIÓN DE EMAIL
  const register = async (email, password, userData) => {
    try {
      // 1. Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // 2. Guardar datos adicionales en Firestore
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

      toast.success('✅ Registro exitoso. Por favor verifica tu email.');
      
      // NO iniciamos sesión automáticamente
      await signOut(auth);
      
      return { 
        success: true, 
        message: 'Registro exitoso. Revisa tu correo para verificar tu cuenta.' 
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

  // LOGIN - VERIFICAR QUE EL EMAIL ESTÉ VERIFICADO
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // VERIFICAR SI EL EMAIL ESTÁ CONFIRMADO
      if (!user.emailVerified) {
        // Reenviar email de verificación
        await sendEmailVerification(user, {
          url: 'https://batistaglobalservice.web.app/cliente/login',
          handleCodeInApp: true
        });
        
        await signOut(auth);
        toast.warning('❌ Debes verificar tu email. Hemos enviado un nuevo código.');
        return { 
          success: false, 
          error: 'Email no verificado. Revisa tu correo.' 
        };
      }
      
      // Actualizar estado de verificación en Firestore
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
        case 'auth/invalid-email':
          errorMessage = 'Email inválido';
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

  // 🔐 RECUPERAR CONTRASEÑA
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: 'https://batistaglobalservice.web.app/cliente/login',
        handleCodeInApp: true
      });
      
      toast.success('✅ Email de recuperación enviado. Revisa tu correo.');
      return { 
        success: true, 
        message: 'Te hemos enviado un email para restablecer tu contraseña.' 
      };
    } catch (error) {
      console.error('Error enviando recuperación:', error);
      let errorMessage = 'Error al enviar email de recuperación';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No existe una cuenta con este email';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email inválido';
          break;
        default:
          errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // REENVIAR EMAIL DE VERIFICACIÓN
  const resendVerificationEmail = async () => {
    if (!auth.currentUser) {
      toast.error('No hay usuario autenticado');
      return { success: false };
    }
    
    try {
      await sendEmailVerification(auth.currentUser, {
        url: 'https://batistaglobalservice.web.app/cliente/login',
        handleCodeInApp: true
      });
      toast.success('✅ Email de verificación reenviado');
      return { success: true };
    } catch (error) {
      console.error('Error reenviando email:', error);
      toast.error('Error al reenviar email');
      return { success: false, error: error.message };
    }
  };

  // LOGOUT
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
    resetPassword,
    resendVerificationEmail,
    isAuthenticated: !!user && user.emailVerified
  };

  return (
    <ClienteAuthContext.Provider value={value}>
      {children}
    </ClienteAuthContext.Provider>
  );
};