import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// ✅ API KEY CORRECTA desde Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDFqig-6NozL6ALQh5klX15D-XIWIF8bnQ",
  authDomain: "batistaglobalservice.firebaseapp.com",
  projectId: "batistaglobalservice",
  storageBucket: "batistaglobalservice.firebasestorage.app",
  messagingSenderId: "374616009302",
  appId: "1:374616009302:web:79c76aa87515444e3969f7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

auth.languageCode = 'es';

export default app;