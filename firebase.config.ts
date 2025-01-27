import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.VITE_API_KEY?.trim(),
  authDomain: process.env.VITE_AUTH_DOMAIN?.trim(),
  projectId: process.env.VITE_PROJECT_ID?.trim(),
  storageBucket: process.env.VITE_STORAGE_BUCKET?.trim(),
  messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID?.trim(),
  appId: process.env.VITE_APP_ID?.trim(),
  measurementId: process.env.VITE_MEASUREMENT_ID?.trim()
}

export const firebase_app = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebase_app);