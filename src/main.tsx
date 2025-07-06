// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Styles - Bootstrap and Icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Global Styles - Main theme
import "./app/styles/main.css";

// App Component
import App from "./app/App";
import { store } from "./app/store/store";

// Debug utilities for development
if (import.meta.env.DEV) {
  import('./app/utils/debugAuth').then(({ debugAuthStatus }) => {
    (window as any).debugAuth = debugAuthStatus;
    console.log('🔧 Debug utility loaded. Use debugAuth() in console to check authentication status.');
  });
  
  import('./app/utils/testLogin').then(({ testLogin }) => {
    (window as any).testLogin = testLogin;
    console.log('🧪 Test utility loaded. Use testLogin("email", "password") to test login.');
  });
  
  import('./app/utils/authDebugger').then(({ debugLogin, manualAuth }) => {
    (window as any).debugLogin = debugLogin;
    (window as any).manualAuth = manualAuth;
    console.log('🔍 Auth debugger loaded. Use debugLogin() or manualAuth() to debug authentication.');
  });
  
  import('./app/utils/quickLoginTest').then(({ quickLogin, loginInstructions }) => {
    (window as any).quickLogin = quickLogin;
    (window as any).loginInstructions = loginInstructions;
    console.log('⚡ Quick test loaded. Use loginInstructions() for help or quickLogin() for sample test.');
  });
}

// Create Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <App />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);