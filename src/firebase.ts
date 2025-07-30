// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAudkW4EA5qX7FmGT_QE1e21He35xNUayg",
  authDomain: "moviebooking-25.firebaseapp.com",
  projectId: "moviebooking-25",
  storageBucket: "moviebooking-25.firebasestorage.app",
  messagingSenderId: "1064588361879",
  appId: "1:1064588361879:web:8b76c8e60298acab23a9d2",
  measurementId: "G-CV0ZRMWXDQ"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app); 