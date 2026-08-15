import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";
import GlobalLoader from "./components/common/GlobalLoader";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      <GlobalLoader />
      <AuthProvider>
        <Toaster position="top-right" />
        <App />
      </AuthProvider>
    </LoadingProvider>
  </StrictMode>,
);
