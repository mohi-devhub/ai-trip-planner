// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCirTgv20W3tsinkhhJ6sYIDPum_dEs5ik",
  authDomain: "react-projects-3de03.firebaseapp.com",
  projectId: "react-projects-3de03",
  storageBucket: "react-projects-3de03.firebasestorage.app",
  messagingSenderId: "855415953872",
  appId: "1:855415953872:web:d0dd55b382d98e40db41d5",
  measurementId: "G-QHD2VTMWD3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);