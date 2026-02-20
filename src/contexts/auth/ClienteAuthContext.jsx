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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('🔄 Cambio en autenticación:', firebaseUser ? 'Usuario logueado' : 'Usuario no logueado');
      
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

  // ✅ REGISTRO CON VERIFICACIÓN OBLIGATORIA
  const register = async (email, password, userData) => {
    try {
      console.log('1️⃣ Creando usuario en Firebase Auth...');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log('2️⃣ Usuario creado con UID:', user.uid);
      
      // Guardar en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        name: userData.name,
        phone: userData.phone || '',
        emailVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      console.log('3️⃣ Datos guardados en Firestore');

      // ✅ ENVIAR EMAIL DE VERIFICACIÓN (MÉTODO MEJORADO)
      console.log('4️⃣ Enviando email de verificación a:', email);
      
      // Configuración específica para el email
      const actionCodeSettings = {
        url: 'https://batistaglobalservice.web.app/cliente/login',
        handleCodeInApp: true,
        dynamicLinkDomain: 'batistaglobalservice.page.link' // Opcional
      };
      
      // Enviar email
      await sendEmailVerification(user, actionCodeSettings);
      
      console.log('5️⃣ Email de verificación ENVIADO correctamente');

      // ✅ IMPORTANTE: CERRAR SESIÓN INMEDIATAMENTE
      await signOut(auth);
      console.log('6️⃣ Sesión cerrada - usuario debe verificar email');

      toast.success('✅ Revisa tu correo para verificar tu cuenta');
      
      return { 
        success: true, 
        message: 'Registro exitoso. Revisa tu correo para verificar tu cuenta.' 
      };
      
    } catch (error) {
      console.error('❌ Error en registro:', error);
      console.error('Código:', error.code);
      console.error('Mensaje:', error.message);
      
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

  // ✅ LOGIN - VERIFICA EMAIL ANTES DE DEJAR ENTRAR
  const login = async (email, password) => {
    try {
      console.log('🔐 Intentando login para:', email);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log('👤 Usuario encontrado:', user.uid);
      console.log('📧 Email verificado:', user.emailVerified ? '✅' : '❌');

      // ⚠️ BLOQUEAR SI NO ESTÁ VERIFICADO
      if (!user.emailVerified) {
        console.log('⛔ Email NO verificado - reenviando email');
        
        // Reenviar email de verificación
        await sendEmailVerification(user, {
          url: 'https://batistaglobalservice.web.app/cliente/login',
          handleCodeInApp: true
        });
        
        await signOut(auth);
        
        toast.warning('❌ Debes verificar tu email. Hemos reenviado el código.');
        return { 
          success: false, 
          error: 'Email no verificado. Revisa tu correo.' 
        };
      }
      
      // ✅ ACTUALIZAR FIRESTORE
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        emailVerified: true,
        updatedAt: new Date().toISOString()
      });
      
      toast.success('✅ Bienvenido');
      return { success: true, user };
      
    } catch (error) {
      console.error('❌ Error en login:', error);
      
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
      
      toast.success('✅ Email de recuperación enviado');
      return { success: true };
    } catch (error) {
      console.error('Error enviando recuperación:', error);
      toast.error('Error al enviar email de recuperación');
      return { success: false, error: error.message };
    }
  };

  // 📧 REENVIAR EMAIL DE VERIFICACIÓN
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