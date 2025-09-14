import React, { createContext, useContext, useState, useEffect } from "react";
import type { AuthContextType, UserData } from "../interface";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialUser: UserData = {
  token: null,
  type: null,
  username: null,
  email: null,
  role: null,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData>(initialUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = (data: UserData) => {
    setUser(data);
    localStorage.setItem("auth", JSON.stringify(data));
  };

  const logout = () => {
    setUser(initialUser);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
