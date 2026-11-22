import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { SavedItemsProvider } from "./contexts/SavedItemsContext.jsx";

import "./index.css";
import "@fontsource-variable/lora";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SavedItemsProvider>
          <App />
        </SavedItemsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
