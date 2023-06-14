import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";


// const API_KEY = import.meta.env.VITE_API_KEY;
// console.log('apiKEY', API_KEY)

const firebaseConfig = {
  apiKey: "AIzaSyCdJfzvI8eoe8_vuLp_xGO9dkDfJtXxslI",
  authDomain: "movieprjauth.firebaseapp.com",
  projectId: "movieprjauth",
  storageBucket: "movieprjauth.appspot.com",
  messagingSenderId: "207972865784",
  appId: "1:207972865784:web:11da772ad79fc9d1c38d0d",
  databaseURL: "https://movieprjauth-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);