// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Tu configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDFqig-6NozL6ALQh5klX15D-XIWIF8bnQ",
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