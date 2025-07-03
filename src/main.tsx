// src/main.tsx

// 1) Plain Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// 2) Bootstrap Icons (for bi-*)
import "bootstrap-icons/font/bootstrap-icons.css";

// 3) Your custom header styles (and any global overrides)
import "./app/components/Header/Header.css";
import "./app/components/css/blitxpress-theme.css"; // Main theme CSS

// 4) Product Card specific styles (loads AFTER theme)
import "./app/components/shared/ProductCard.css"; // Original ProductCard CSS (now simplified base)
import "./app/components/shared/ProductCard2.css"; // For ProductCard2

// 5) Home Page Section specific styles
import "./app/components/HomePage/HeroSection.css";
import "./app/components/HomePage/DealsSection.css";
import "./app/components/HomePage/SuperBuyerSection.css";
import "./app/components/HomePage/TopProductsSection.css";

// 6) Product Detail Page styles
import "./app/pages/ProductDetailPage/ProductDetailPage.css";

// 7) Footer styles
import "./app/components/Layout/Footer.css";

// --- NEW REDUX IMPORTS ---
import { Provider } from 'react-redux';
import { store } from './app/store/store'; // Import your Redux store
// --- END NEW REDUX IMPORTS ---

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode> {/* Added StrictMode for development best practices */}
    <Provider store={store}> {/* Wrap your app with the Redux Provider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);