"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setLoading(false);
        sessionStorage.setItem("user", JSON.stringify(user));
      } else {
        setCurrentUser(null);
        sessionStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
