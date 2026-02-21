import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Tu configuración Firebase con la NUEVA CLAVE DE API
// IMPORTANTE: Reemplaza "AQUI_VA_TU_NUEVA_CLAVE" con la clave que generaste
const firebaseConfig = {
  apiKey: "AQUI_VA_TU_NUEVA_CLAVE", // 👈 PEGA AQUÍ LA NUEVA CLAVE
  authDomain: "batistaglobalservice.firebaseapp.com",
  projectId: "batistaglobalservice",
  storageBucket: "batistaglobalservice.firebasestorage.app",
  messagingSenderId: "374616009302",
  appId: "1:374616009302:web:79c76aa87515444e3969f7",
  measurementId: "G-FCNPNFDVMM"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const db = getFirestore(app);       // Firestore Database
export const storage = getStorage(app);    // Cloud Storage
export const auth = getAuth(app);          // Authentication

export default app;