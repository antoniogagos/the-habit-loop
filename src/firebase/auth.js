import React, { useState, useEffect } from "react";
import app from "./config";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(_ => {
    app.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}