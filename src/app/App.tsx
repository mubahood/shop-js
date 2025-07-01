// src/app/App.tsx
import React from "react";
import HeaderWrapper from "./components/Header/HeaderWrapper";
import HomePage from "./pages/HomePage";
import Footer from "./components/Layout/Footer";

const App: React.FC = () => {
  return (
    <>
      <HeaderWrapper />
      <HomePage />
      <Footer /> {/* Your new Footer component */}
    </>
  );
};

export default App;
