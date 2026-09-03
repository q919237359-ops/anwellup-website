import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/geist";
import "@fontsource-variable/cormorant-garamond";
import App from "./App";
import { initializeAnalytics } from "./analytics";
import "./styles.css";

const root = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <App pathname={window.location.pathname} />
  </React.StrictMode>
);

if (root.dataset.prerendered === "true") {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}

initializeAnalytics();
