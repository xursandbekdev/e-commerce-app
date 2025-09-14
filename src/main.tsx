import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { muiTheme } from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material"
import { Provider } from "react-redux";
import { store } from './store/store.ts';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store} >
      <ThemeProvider theme={muiTheme}>
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
  </StrictMode>,
)
