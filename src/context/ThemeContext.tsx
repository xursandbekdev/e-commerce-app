import React, { createContext, useContext, useState, useEffect } from "react";
import type { ThemeContextType } from "../interface";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    // Bodyga class qo'yib CSS theme qo'llash
    if (darkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
