import { createContext, useEffect, useState } from "react";
import {
  getAuthToken,
  getUser,
  saveAuthToken,
  saveUser,
  logout as clearAuthStorage,
} from "../utils/authStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = getAuthToken();
    const storedUser = getUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = (token, user) => {
    saveAuthToken(token);
    saveUser(user);

    setToken(token);
    setUser(user);
  };

  const logout = () => {
    clearAuthStorage();

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
