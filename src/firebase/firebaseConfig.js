// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2lX_e3dQcB-6yMa0mX_Lf2qwqYWefkS8",
  authDomain: "bookmanagement-43af8.firebaseapp.com",
  projectId: "bookmanagement-43af8",
  storageBucket: "bookmanagement-43af8.firebasestorage.app",
  messagingSenderId: "181151328037",
  appId: "1:181151328037:web:f94cc57a6d69da1927dccc",
  measurementId: "G-N0JFZHGL3G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db }; // TODO: Add SDKs for Firebase products that you want to use
