import React from "react";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routing/AppRoutes";
import ManifestInitializer from "./components/shared/ManifestInitializer";
import AppInitializer from "./components/AppInitializer";

// Import React Toastify CSS
import "react-toastify/dist/ReactToastify.css";
import "./styles/toast.css";

const App: React.FC = () => {
  return (
    <AppInitializer>
      <AppRoutes />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="custom-toast-container"
      />
    </AppInitializer>
  );
};

export default App;
