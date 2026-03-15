import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

import App from "@/App";
import { CatalogProvider } from "@/context/catalog-context";
import "@/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CatalogProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </CatalogProvider>
  </StrictMode>,
);
