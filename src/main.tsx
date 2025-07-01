// src/main.tsx

// 1) Plain Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// 2) Bootstrap Icons (for bi-*)
import "bootstrap-icons/font/bootstrap-icons.css";

// 3) Your custom header styles (and any global overrides)
import "./app/components/Header/Header.css";
import "./app/components/css/blitxpress-theme.css";
import "./app/components/HomePage/TopProductsSection.css"; // NEW: For the Top Products section
import "./app/components/Layout/Footer.css";



import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
