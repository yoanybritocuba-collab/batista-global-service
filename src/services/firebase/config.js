import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// ✅ VALORES DIRECTOS (NO variables de entorno)
const firebaseConfig = {
  apiKey: "AIzaSyBvs3kM02lPJPmU0dUrXxSqLa5KFWaXH1E",
  authDomain: "batistaglobalservice.firebaseapp.com",
  projectId: "batistaglobalservice",
  storageBucket: "batistaglobalservice.firebasestorage.app",
  messagingSenderId: "1066536738262",
  appId: "1:1066536738262:web:b48439ef2de7551022812b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

auth.languageCode = 'es';

export default app;