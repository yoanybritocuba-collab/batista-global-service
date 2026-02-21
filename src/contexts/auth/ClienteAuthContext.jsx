import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
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
  const [emailPendiente, setEmailPendiente] = useState(null);
  const [codigoVerificado, setCodigoVerificado] = useState(false);

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

  // ✅ PASO 1: SOLICITAR CÓDIGO
  const solicitarCodigo = (email) => {
    setEmailPendiente(email);
    setCodigoVerificado(false);
  };

  // ✅ PASO 2: VERIFICAR CÓDIGO - AHORA GUARDA EL EMAIL
  const verificarCodigoExitoso = (email) => {
    console.log('✅ Activando código verificado para:', email);
    setCodigoVerificado(true);
    setEmailPendiente(email); // 👈 NUEVO
  };

  // ✅ PASO 3: REGISTRO - Validación mejorada
  const register = async (email, password, userData) => {
    console.log('🔍 Verificando código - Estado:', { codigoVerificado, emailPendiente, email });

    // Validación más flexible
    if (!codigoVerificado) {
      console.log('❌ Código no verificado');
      toast.error('❌ Debes verificar tu código primero');
      return { success: false, error: 'Código no verificado' };
    }

    // Si hay emailPendiente, debe coincidir
    if (emailPendiente !== null && emailPendiente !== email) {
      console.log('❌ Email no coincide', { emailPendiente, email });
      toast.error('❌ El email no coincide con el verificado');
      return { success: false, error: 'Email no coincide' };
    }

    try {
      console.log('📝 Creando usuario en Firebase...');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        name: userData.name,
        phone: userData.phone || '',
        emailVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      limpiarCodigo(email);
      setEmailPendiente(null);
      setCodigoVerificado(false);
      
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

  // ✅ LOGIN
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

  // ✅ RECUPERAR CONTRASEÑA
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: 'https://batistaglobalservice.web.app/cliente/login',
        handleCodeInApp: true
      });
      
      toast.success('✅ Email de recuperación enviado');
      return { success: true };
      
    } catch (error) {
      console.error('Error en reset password:', error);
      let errorMessage = 'Error al enviar el email';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No existe una cuenta con este correo';
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
    solicitarCodigo,
    verificarCodigoExitoso,
    emailPendiente,
    codigoVerificado,
    isAuthenticated: !!user
  };

  return (
    <ClienteAuthContext.Provider value={value}>
      {children}
    </ClienteAuthContext.Provider>
  );
};