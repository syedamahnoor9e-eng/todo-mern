import { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [userToken, setUserToken] = useState(
    localStorage.getItem("token") || null
  );

  const [user, setUser] = useState(null);

  // LOGIN
  const login = (token) => {
    localStorage.setItem("token", token);
    setUserToken(token);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUserToken(null);
    setUser(null);
  };

  // GET USER PROFILE
  const fetchProfile = async () => {

    try {

      const { data } = await API.get("/auth/profile");

      setUser(data);

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    if (userToken) {
      fetchProfile();
    }
  }, [userToken]);

  return (
    <AuthContext.Provider value={{ userToken, user,setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};