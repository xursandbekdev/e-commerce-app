import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { CssBaseline } from "@mui/material";
import './i18n';
import App from "./App";
import { store } from "./store/store";
import { ThemeProvider } from "./context/ThemeContext";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function Root() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <CssBaseline />
        <App />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnHover
        />
      </ThemeProvider>
    </Provider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
