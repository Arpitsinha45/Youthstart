
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAgniMb-Wh6H8efiB9imsAAcPTuZ4fRdfE",
  authDomain: "youthstart-fbf94.firebaseapp.com",
  databaseURL: "https://youthstart-fbf94-default-rtdb.firebaseio.com",
  projectId: "youthstart-fbf94",
  storageBucket: "youthstart-fbf94.firebasestorage.app",
  messagingSenderId: "141616339351",
  appId: "1:141616339351:web:029c99d476700f8d1eccd2",
  measurementId: "G-DW9QPQT1DZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
