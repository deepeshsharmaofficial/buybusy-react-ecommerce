import React, { createContext, useContext, useState, useEffect } from "react";

// Firebase
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import  {firebaseAuth, googleProvider } from "../config/firebaseInit";

// Three Step to Create Context API

// 1st Step -> Create Context
const AuthContext = createContext();

// 2nd Step -> Create Provider
export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState()
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false)


  // Register With Email And Password
  const registerWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  // log In With Email And Password
  const logInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    return signInWithPopup(firebaseAuth, googleProvider);
  }
  
  // Reset Password
  const resetPassword = async (email) => {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email);
  }

  // Logout
  const logout = () => {
    return signOut(firebaseAuth);
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
      setCurrentUser(user)
      
      // If User is Admin
      if(user && (user.email === 'deep92112018@gmail.com')){
        setIsAdmin(true);
      }
      
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider 
      value={{
        registerWithEmailAndPassword,
        logInWithEmailAndPassword,
        logout,
        currentUser,
        resetPassword,
        isAdmin,
        signInWithGoogle
      }}
    >
      {!loading && props.children}
    </AuthContext.Provider>
  )
}


// 3rd Step -> Custom Hook
export const useAuth = () => useContext(AuthContext);