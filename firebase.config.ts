import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY?.trim(),
  authDomain: import.meta.env.VITE_AUTH_DOMAIN?.trim(),
  projectId: import.meta.env.VITE_PROJECT_ID?.trim(),
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET?.trim(),
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID?.trim(),
  appId: import.meta.env.VITE_APP_ID?.trim(),
  measurementId: import.meta.env.VITE_MEASUREMENT_ID?.trim()
}

export const firebase_app = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebase_app);