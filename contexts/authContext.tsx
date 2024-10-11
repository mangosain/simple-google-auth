"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase.config";
import { onAuthStateChanged, User } from "firebase/auth";

const AuthContext = createContext<{
  currentUser: User | null;
  setCurrentUser: (value: React.SetStateAction<User | null>) => void;
  loading: boolean;
  setLoading: (value: React.SetStateAction<boolean>) => void;
} | null>(null);

import { ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
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
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
