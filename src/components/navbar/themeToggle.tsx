import React from "react";
import { IconButton } from "@mui/material";
import { DarkMode as DarkModeIcon, LightMode as LightModeIcon } from "@mui/icons-material";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      className="text-body hover:text-primary"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? (
        <LightModeIcon className="text-title" />
      ) : (
        <DarkModeIcon className="text-title" />
      )}
    </IconButton>
  );
};

export default ThemeToggle;