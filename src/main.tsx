import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/app";
import "./default.css";
import { GlobalContextProvider } from "./context/Global";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </StrictMode>
);
