import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "./app/store";
import App from "./App";
import "./i18";
import { GoogleOAuthProvider } from '@react-oauth/google';
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";

/*CSS import library*/
import 'react-toastify/dist/ReactToastify.css';
import "./index.scss";
import "./theme.scss";
import "rc-drawer/assets/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer />
        <App />
      </Provider>
    </BrowserRouter>
  </GoogleOAuthProvider>
  // </React.StrictMode>,
);
