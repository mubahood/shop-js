// src/app/pages/HomePage.tsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Alert } from "react-bootstrap";
import HeroSection from "../components/HomePage/HeroSection";
import DealsSection from "../components/HomePage/DealsSection";
import SuperBuyerSection from "../components/HomePage/SuperBuyerSection";
import TopProductsSection from "../components/HomePage/TopProductsSection";
import VendorsSection from "../components/HomePage/VendorsSection";
import FeaturedCategoriesSection from "../components/HomePage/FeaturedCategoriesSection";
import ToastService from "../services/ToastService";
import "../components/HomePage/SuperBuyerSection.css";

interface LocationState {
  orderSuccess?: boolean;
  orderId?: number;
  paymentUrl?: string;
}

const HomePage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  useEffect(() => {
    // Show order success message when user returns from checkout
    if (state?.orderSuccess && state?.orderId) {
      ToastService.success(
        `🎉 Order #${state.orderId} placed successfully! Thank you for your purchase.`,
        { autoClose: 6000 }
      );
      
      // Clear the state to prevent showing message on refresh
      window.history.replaceState({}, document.title);
    }
  }, [state]);

  return (
    <div className="container mt-4">
      {/* Order Success Alert */}
      {state?.orderSuccess && state?.orderId && (
        <Alert variant="success" className="mb-4">
          <Alert.Heading>🎉 Order Placed Successfully!</Alert.Heading>
          <p>
            Your order <strong>#{state.orderId}</strong> has been confirmed and is being processed.
            You will receive a confirmation email shortly.
          </p>
          <hr />
          <div className="d-flex justify-content-between">
            <a href="/account/orders" className="btn btn-outline-success">
              <i className="bi bi-list-ul me-2"></i>
              View My Orders
            </a>
            {state.paymentUrl && (
              <a href={`/payment/${state.orderId}`} className="btn btn-success">
                <i className="bi bi-credit-card me-2"></i>
                Complete Payment
              </a>
            )}
          </div>
        </Alert>
      )}

      <HeroSection />
      <FeaturedCategoriesSection />
      <TopProductsSection />
      <VendorsSection />
      <DealsSection />
      <SuperBuyerSection />
    </div>
  );
};

export default HomePage;
