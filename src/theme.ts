import { createTheme } from "@mui/material/styles";
import { lightColors, darkColors } from "./colors";

export const getMuiTheme = (mode: "light" | "dark") => {
  const c = mode === "light" ? lightColors : darkColors;

  return createTheme({
    palette: {
      mode,
      primary: { main: c.primary },
      secondary: { main: c.secondary },
      error: { main: c.error },
      success: { main: c.success },
      warning: { main: c.warning },
      text: {
        primary: c.title,
        secondary: c.body,
      },
      background: {
        default: c.bg,
        paper: c.offwhite,
      },
    },
    typography: {
      fontFamily: "Inter, Roboto, sans-serif",
    },
  });
};
