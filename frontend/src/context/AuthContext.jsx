import { createContext, useEffect, useState } from "react";
import api from "../api/axios";
import { clearAccessToken, setAccessToken } from "../utils/authSession";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    api
      .post("/auth/refresh")
      .then(({ data }) => {
        setAccessToken(data.token);
        setToken(data.token);
        setUser(data.data);
      })
      .catch(() => {
        clearAccessToken();
      })
      .finally(() => setLoading(false));
  }, []);

  const login = (token, user) => {
    setAccessToken(token);

    setToken(token);
    setUser(user);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      clearAccessToken();
      setToken(null);
      setUser(null);
      window.location.replace("/login");
    }
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
