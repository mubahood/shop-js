import React from "react";
import { Routes, Route } from "react-router-dom";

import HeaderWrapper from "./components/Header/HeaderWrapper";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import Footer from "./components/Layout/Footer";

const App: React.FC = () => {
  return (
    <>
      <HeaderWrapper />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
