import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, db } from './config';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

// Registrar nuevo usuario
export const registerUser = async (email, password, userData) => {
  console.log("📝 PASO 1: Iniciando registro para:", email);
  
  try {
    console.log("📝 PASO 2: Intentando crear usuario en Firebase Auth...");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("✅ PASO 3: Usuario CREADO en Auth. UID:", user.uid);
    
    console.log("📝 PASO 4: Actualizando perfil con nombre:", userData.name);
    await updateProfile(user, { displayName: userData.name });
    console.log("✅ PASO 5: Perfil actualizado");
    
    console.log("📝 PASO 6: Intentando guardar en Firestore...");
    console.log("📦 Datos a guardar:", {
      uid: user.uid,
      name: userData.name,
      email: user.email,
      phone: userData.phone || '',
      createdAt: new Date().toISOString()
    });
    
    // Verificar que db existe
    console.log("📝 ¿db está definido?", db ? "SÍ" : "NO");
    
    const docRef = doc(db, 'users', user.uid);
    console.log("📝 Referencia del documento:", docRef.path);
    
    await setDoc(docRef, {
      uid: user.uid,
      name: userData.name,
      email: user.email,
      phone: userData.phone || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    console.log("✅ PASO 7: ¡USUARIO GUARDADO EN FIRESTORE!");
    return { success: true, user };
    
  } catch (error) {
    console.error("❌ ERROR EN PASO:", error);
    console.error("Código:", error.code);
    console.error("Mensaje:", error.message);
    console.error("Stack:", error.stack);
    return { success: false, error: error.message };
  }
};

// Iniciar sesión
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Error logging in:', error);
    return { 
      success: false, 
      error: getErrorMessage(error.code) 
    };
  }
};

// Cerrar sesión
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Error logging out:', error);
    return { success: false, error: error.message };
  }
};

// Obtener datos del usuario desde Firestore
export const getUserData = async (uid) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, error: 'Usuario no encontrado' };
    }
  } catch (error) {
    console.error('Error getting user data:', error);
    return { success: false, error: error.message };
  }
};

// Actualizar datos del usuario
export const updateUserData = async (uid, data) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...data,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false, error: error.message };
  }
};

// Recuperar contraseña
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    console.error('Error resetting password:', error);
    return { success: false, error: getErrorMessage(error.code) };
  }
};

// Observer de autenticación
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Mensajes de error amigables
const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'Este correo electrónico ya está registrado';
    case 'auth/invalid-email':
      return 'Correo electrónico inválido';
    case 'auth/weak-password':
      return 'La contraseña debe tener al menos 6 caracteres';
    case 'auth/user-not-found':
      return 'No existe una cuenta con este correo';
    case 'auth/wrong-password':
      return 'Contraseña incorrecta';
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Intenta más tarde';
    default:
      return 'Error en la autenticación. Intenta de nuevo';
  }
};