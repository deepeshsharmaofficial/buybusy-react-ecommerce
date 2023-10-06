// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.RREACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Firebase instance
const firebaseAuth = getAuth(firebaseApp);

// Initialize Cloud Firestore and get a reference to the service
// FireStore Instance
const firestoreDb = getFirestore(firebaseApp);

// instance of the Google provider object
const googleProvider = new GoogleAuthProvider();

// Firebase Storage Instance
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(firebaseApp);

export {firebaseAuth, firestoreDb, storage, googleProvider};