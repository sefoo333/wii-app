// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtqr7ID0kY1v6oVXhxTxQy8dMPB6yHyA0",
  authDomain: "wii-app.firebaseapp.com",
  projectId: "wii-app",
  storageBucket: "wii-app.appspot.com",
  messagingSenderId: "1052837750443",
  appId: "1:1052837750443:web:69d2ece4c538da6fdbf9ee",
  measurementId: "G-775YVFZS3Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db: any = getFirestore()
