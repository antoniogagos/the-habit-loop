import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { firebase } from "./config";
import { getUser } from "./api";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  useEffect(_ => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        user = await getUser({uid: user.uid});
        history.push("/");
      }
      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}