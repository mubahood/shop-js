import React from "react";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routing/AppRoutes";
import SingleManifestLoader from "./components/shared/SingleManifestLoader";
import AppInitializer from "./components/AppInitializer";
import ScrollToTop from "./components/Layout/ScrollToTop";

// Import React Toastify CSS
import "react-toastify/dist/ReactToastify.css";
import "./styles/toast.css";

const App: React.FC = () => {
  return (
    <>
      <SingleManifestLoader />
      <ScrollToTop />
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
    </>
  );
};

export default App;
