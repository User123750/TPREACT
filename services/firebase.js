import { initializeApp } from "firebase/app";
// On ajoute les imports pour l'Authentification et la Base de données
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import indispensable pour sauvegarder la connexion sur le téléphone
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Ta configuration (J'ai repris tes clés exactes)
const firebaseConfig = {
  apiKey: "AIzaSyBJ58YyvOc61Zkm4vsKRSL6dhjrewO3rNQ",
  authDomain: "tp-react-native-7d0cc.firebaseapp.com",
  projectId: "tp-react-native-7d0cc",
  storageBucket: "tp-react-native-7d0cc.firebasestorage.app",
  messagingSenderId: "559788640880",
  appId: "1:559788640880:web:f2c8cd45423f880a07c2b5",
  measurementId: "G-B9S5D2ZFTK"
};

// 1. Initialiser l'application Firebase
export const app = initializeApp(firebaseConfig);

// 2. Initialiser l'Authentification avec la persistance (stockage local)
// C'est grâce à ça que l'erreur 'onAuthStateChanged of undefined' va disparaître
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// 3. Initialiser la Base de données Firestore
export const db = getFirestore(app);