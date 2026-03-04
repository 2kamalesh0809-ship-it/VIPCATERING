import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAJqNLjDXslhq3kKi-lgbNNjv3g1WmbaPg",
    authDomain: "vip-catering-401d0.firebaseapp.com",
    projectId: "vip-catering-401d0",
    storageBucket: "vip-catering-401d0.firebasestorage.app",
    messagingSenderId: "240172717343",
    appId: "1:240172717343:web:773cffd0ea765933dd0c2a",
    measurementId: "G-NQ6EKQGPJV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
