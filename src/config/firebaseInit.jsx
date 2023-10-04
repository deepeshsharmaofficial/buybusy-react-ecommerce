// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
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