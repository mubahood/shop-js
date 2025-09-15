import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import AppRoutes from "./routing/AppRoutes";
import ScrollToTop from "./components/Layout/ScrollToTop";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import { restoreAuthState, selectIsAuthenticated, selectUser } from "./store/slices/authSlice";
import { CacheApiService } from "./services/CacheApiService";
import AnalyticsService from "./services/AnalyticsService";
import PerformanceService from "./services/PerformanceService";

// Import React Toastify CSS
import "react-toastify/dist/ReactToastify.css";
import "./styles/toast.css";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  // Restore authentication state on app startup
  useEffect(() => {
    // Small delay to ensure localStorage is available
    const timer = setTimeout(() => {
      dispatch(restoreAuthState());
    }, 100);

    return () => clearTimeout(timer);
  }, [dispatch]);

  // Initialize analytics and performance monitoring in production
  useEffect(() => {
    AnalyticsService.initialize();
    PerformanceService.initialize();
    PerformanceService.trackBundlePerformance();
  }, []);

  // Preload essential data for better performance
  useEffect(() => {
    // Preload critical data in background
    CacheApiService.preloadEssentialData().catch((error) => {
      console.warn('⚠️ Some essential data failed to preload:', error);
    });
  }, []);

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
};

export default App;
