import { createTheme } from "@mui/material/styles";
import { colors } from "./colors";

export const muiTheme = createTheme({
  palette: {
    primary: { main: colors.primary },
    secondary: { main: colors.secondary },
    error: { main: colors.error },
    success: { main: colors.success },
    warning: { main: colors.warning },
    text: {
      primary: colors.title,
      secondary: colors.body,
    },
    background: {
      default: colors.bg,
      paper: colors.offwhite,
    },
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
  },
});
