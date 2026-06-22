// Configuration et initialisation de Firebase pour le site de l'ACCA d'Herbeys.
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmsj9K4xsq0s8BWbOYHpWob-eR29Ya0NE",
  authDomain: "site-acca-herbeys.firebaseapp.com",
  projectId: "site-acca-herbeys",
  storageBucket: "site-acca-herbeys.firebasestorage.app",
  messagingSenderId: "448811062026",
  appId: "1:448811062026:web:a1c04d7db5e8cfb372a0f3",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
