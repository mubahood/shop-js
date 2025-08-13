import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import AppRoutes from "./routing/AppRoutes";
import ScrollToTop from "./components/Layout/ScrollToTop";
import { restoreAuthState } from "./store/slices/authSlice";

// Import React Toastify CSS
import "react-toastify/dist/ReactToastify.css";
import "./styles/toast.css";

const App: React.FC = () => {
  const dispatch = useDispatch();

  // Restore authentication state on app startup
  useEffect(() => {
    dispatch(restoreAuthState());
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
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
    </>
  );
};

export default App;
