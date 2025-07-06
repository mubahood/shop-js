// src/app/routing/AppRoutes.tsx
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

// Layouts
import MainLayout from "../components/Layout/MainLayout";
import AuthLayout from "../components/Layout/AuthLayout";

// Route Guards
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import PublicOnlyRoute from "../components/Auth/PublicOnlyRoute";

// Lazy loaded components for better performance
const HomePage = React.lazy(() => import("../pages/HomePage"));
const ProductDetailPage = React.lazy(() => import("../pages/ProductDetailPage/ProductDetailPage"));
const ProductsPage = React.lazy(() => import("../pages/ProductsPage"));
const ShopPage = React.lazy(() => import("../pages/ShopPage"));
const CategoryPage = React.lazy(() => import("../pages/CategoryPage"));
const CartPage = React.lazy(() => import("../pages/CartPage"));
const CheckoutPage = React.lazy(() => import("../pages/CheckoutPage"));
const DeliveryAddressPage = React.lazy(() => import("../pages/DeliveryAddressPage"));
const OrderSuccessPage = React.lazy(() => import("../pages/OrderSuccessPage"));
const PaymentPage = React.lazy(() => import("../pages/PaymentPage"));
const SearchResultsPage = React.lazy(() => import("../pages/SearchResultsPage"));
const WishlistPage = React.lazy(() => import("../pages/WishlistPage"));
const AboutPage = React.lazy(() => import("../pages/AboutPage"));
const ContactPage = React.lazy(() => import("../pages/ContactPage"));
const FAQPage = React.lazy(() => import("../pages/FAQPage"));

// Legal Pages
const TermsPage = React.lazy(() => import("../pages/legal/TermsPage"));
const PrivacyPage = React.lazy(() => import("../pages/legal/PrivacyPage"));

// Demo Pages
const ToastDemo = React.lazy(() => import("../components/Demo/ToastDemo"));
const ApiTestPage = React.lazy(() => import("../pages/ApiTestPage"));
const ApiIntegrationStatusPage = React.lazy(() => import("../pages/ApiIntegrationStatusPage"));

// Auth Pages
const LoginPage = React.lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = React.lazy(() => import("../pages/auth/RegisterPage"));
const ForgotPasswordPage = React.lazy(() => import("../pages/auth/ForgotPasswordPage"));

// Account Pages
const AccountDashboard = React.lazy(() => import("../pages/account/AccountDashboard"));
const AccountProfile = React.lazy(() => import("../pages/account/AccountProfile"));
const AccountOrdersPage = React.lazy(() => import("../pages/account/AccountOrdersPage"));
const AccountAddresses = React.lazy(() => import("../pages/account/AccountAddresses"));
const AccountSettings = React.lazy(() => import("../pages/account/AccountSettings"));
const OrderDetailsPage = React.lazy(() => import("../pages/account/OrderDetailsPage"));
const Account = React.lazy(() => import("../pages/account/Account"));

// Error Pages
const NotFoundPage = React.lazy(() => import("../pages/errors/NotFoundPage"));

// Loading Component
const PageLoader: React.FC = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
    <Spinner animation="border" variant="primary" />
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Main Layout Routes */}
        <Route path="/" element={<MainLayout />}>
          {/* Home */}
          <Route index element={<HomePage />} />
          
          {/* Products */}
          <Route path="products" element={<ProductsPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="category/:categoryId" element={<CategoryPage />} />
          <Route path="search" element={<SearchResultsPage />} />
          
          {/* Cart & Checkout */}
          <Route path="cart" element={<CartPage />} />
          <Route 
            path="delivery-address" 
            element={
              <ProtectedRoute>
                <DeliveryAddressPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="checkout" 
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="order-success" 
            element={
              <ProtectedRoute>
                <OrderSuccessPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="payment/:orderId" 
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            } 
          />
          
          {/* User Features */}
          <Route 
            path="wishlist" 
            element={
              <ProtectedRoute>
                <WishlistPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Account - Protected Routes with Shared Layout */}
          <Route 
            path="account" 
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          >
            <Route index element={<AccountDashboard />} />
            <Route path="profile" element={<AccountProfile />} />
            <Route path="orders" element={<AccountOrdersPage />} />
            <Route path="orders/:orderId" element={<OrderDetailsPage />} />
            <Route path="addresses" element={<AccountAddresses />} />
            <Route path="settings" element={<AccountSettings />} />
          </Route>
          
          {/* Static Pages */}
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="faq" element={<FAQPage />} />
          
          {/* Legal Pages */}
          <Route path="terms" element={<TermsPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          
          {/* Demo Pages */}
          <Route path="toast-demo" element={<ToastDemo />} />
          <Route path="api-test" element={<ApiTestPage />} />
          <Route path="integration-status" element={<ApiIntegrationStatusPage />} />
        </Route>

        {/* Auth Layout Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route 
            path="login" 
            element={
              <PublicOnlyRoute>
                <LoginPage />
              </PublicOnlyRoute>
            } 
          />
          <Route 
            path="register" 
            element={
              <PublicOnlyRoute>
                <RegisterPage />
              </PublicOnlyRoute>
            } 
          />
          <Route 
            path="forgot-password" 
            element={
              <PublicOnlyRoute>
                <ForgotPasswordPage />
              </PublicOnlyRoute>
            } 
          />
        </Route>

        {/* Error Routes */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
