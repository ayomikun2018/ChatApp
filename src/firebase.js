
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDL2SWPbYSucVWdErx9BWwgrgxUcgFIxgM",
  authDomain: "chatapp-d0bb5.firebaseapp.com",
  projectId: "chatapp-d0bb5",
  storageBucket: "chatapp-d0bb5.appspot.com",
  messagingSenderId: "995678345168",
  appId: "1:995678345168:web:1ed9aad06242fcc4a1cbd5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth =getAuth();
export const storage = getStorage();
export const db = getFirestore()