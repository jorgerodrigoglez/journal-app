// yarn add firebase -----
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// firebase auth
import { getAuth } from 'firebase/auth';
// fire-store lite:no tiene todas las funcionalidades
import { getFirestore } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjrgCU32fzIGb732pOi9qhLHjDLBOG_Zg",
  authDomain: "journal-react-b80d3.firebaseapp.com",
  projectId: "journal-react-b80d3",
  storageBucket: "journal-react-b80d3.appspot.com",
  messagingSenderId: "581785416347",
  appId: "1:581785416347:web:dc1680267fccd005a80c3e"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
// Firebase auth
export const FirebaseAuth = getAuth( FirebaseApp );
// Firestore
export const FirebaseDB = getFirestore( FirebaseApp );