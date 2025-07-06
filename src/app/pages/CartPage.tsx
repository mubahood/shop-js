// src/app/pages/CartPage.tsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Image, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { CartItemModel } from "../models/CartItemModel";
import { OrderModel } from "../models/OrderModel";
import { formatPrice } from "../utils";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ToastService from "../services/ToastService";
import "./CartPage.css";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    cartCount, 
    isEmpty, 
    isLoading,
    updateQuantity, 
    removeFromCart,
    clearCart,
    getFormattedTotal 
  } = useCart();
  
  // Get user from Redux store
  const { user } = useSelector((state: RootState) => state.auth);
  
  // Order state to track delivery method and info
  const [order, setOrder] = useState<OrderModel>(() => {
    const newOrder = new OrderModel();
    newOrder.delivery_method = "delivery"; // Default to delivery as per Dart code
    return newOrder;
  });

  // Initialize order with user info when user is available
  useEffect(() => {
    if (user) {
      const updatedOrder = new OrderModel();
      Object.assign(updatedOrder, order);
      updatedOrder.mail = user.email || "";
      updatedOrder.customer_name = `${user.first_name || ""} ${user.last_name || ""}`.trim();
      updatedOrder.customer_phone_number_1 = user.phone_number_1 || "";
      updatedOrder.customer_phone_number_2 = user.phone_number_2 || "";
      updatedOrder.delivery_method = "delivery";
      setOrder(updatedOrder);
    }
  }, [user]);

  const handleQuantityChange = async (item: CartItemModel, newQuantity: number) => {
    await updateQuantity(item.product_id, newQuantity, item.variant);
  };

  const handleRemoveItem = async (item: CartItemModel) => {
    await removeFromCart(item.product_id, item.variant);
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      await clearCart();
    }
  };

  const handleCheckout = () => {
    // Validate user is logged in
    if (!user || !user.id) {
      ToastService.error('Please login to continue');
      navigate('/auth/login');
      return;
    }

    // Validate cart is not empty
    if (isEmpty) {
      ToastService.error('Your cart is empty, Please add items to your cart');
      return;
    }

    // For delivery method, proceed to delivery address page
    navigate('/delivery-address', { state: { order } });
  };

  if (isEmpty) {
    return (
      <div className="cart-page-modern">
        <Container className="py-5">
          <div className="empty-cart-modern">
            <div className="empty-cart-icon">
              <i className="bi bi-cart-x"></i>
            </div>
            <h2 className="empty-cart-title">Your cart is empty</h2>
            <p className="empty-cart-subtitle">
              Discover amazing products and add them to your cart
            </p>
            <Link to="/products" className="btn-modern btn-modern-primary">
              <i className="bi bi-shop me-2"></i>
              Start Shopping
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="cart-page-modern">
      <Container className="py-4">
        {/* Modern Header */}
        <div className="cart-header">
          <div className="cart-title-section">
            <h1 className="cart-main-title">Shopping Cart</h1>
            <p className="cart-items-count">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
          </div>
          <Button 
            variant="link" 
            className="clear-cart-btn"
            onClick={handleClearCart}
            disabled={isLoading}
          >
            <i className="bi bi-trash3 me-1"></i>
            Clear All
          </Button>
        </div>

        <Row className="g-4">
          {/* Cart Items - Minimalistic Cards */}
          <Col lg={8}>
            <div className="cart-items-modern">
              {cartItems.map((item: CartItemModel, index) => (
                <div key={item.id} className="cart-item-modern">
                  <div className="cart-item-image-section">
                    <Image 
                      src={item.getImageUrl()}
                      alt={item.product_name}
                      className="cart-item-image-modern"
                      onError={(e) => {
                        e.currentTarget.src = '/media/svg/files/blank-image.svg';
                      }}
                    />
                  </div>

                  <div className="cart-item-details">
                    <Link 
                      to={`/product/${item.product_id}`}
                      className="cart-item-name"
                    >
                      {item.product_name}
                    </Link>
                    
                    {item.hasVariant() && (
                      <div className="cart-item-variant">
                        {item.getVariantDisplay()}
                      </div>
                    )}
                    
                    <div className="cart-item-price">
                      {formatPrice(item.product_price_1)}
                    </div>
                  </div>

                  <div className="cart-item-quantity">
                    <div className="quantity-control-modern">
                      <button
                        className="quantity-btn-modern quantity-btn-minus"
                        onClick={() => handleQuantityChange(item, Math.max(1, item.product_quantity - 1))}
                        disabled={isLoading || item.product_quantity <= 1}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      
                      <span className="quantity-display-modern">
                        {item.product_quantity}
                      </span>
                      
                      <button
                        className="quantity-btn-modern quantity-btn-plus"
                        onClick={() => handleQuantityChange(item, item.product_quantity + 1)}
                        disabled={isLoading}
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-total">
                    <div className="item-total-price">
                      {formatPrice((item.getSubtotal()).toString())}
                    </div>
                    <button
                      className="remove-item-btn-modern"
                      onClick={() => handleRemoveItem(item)}
                      disabled={isLoading}
                      title="Remove item"
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="continue-shopping-section">
              <Link to="/products" className="btn-modern btn-modern-outline">
                <i className="bi bi-arrow-left me-2"></i>
                Continue Shopping
              </Link>
            </div>
          </Col>

          {/* Modern Order Summary */}
          <Col lg={4}>
            <div className="order-summary-modern">
              <h3 className="summary-title">Order Summary</h3>
              
              <div className="summary-details">
                <div className="summary-line">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="summary-value">{getFormattedTotal()}</span>
                </div>
                
                <div className="summary-line">
                  <span>Shipping</span>
                  <span className="summary-value summary-free">Calculated at checkout</span>
                </div>
                
                <div className="summary-line summary-total">
                  <span>Total</span>
                  <span className="summary-value summary-total-amount">{getFormattedTotal()}</span>
                </div>
              </div>

              {/* Delivery Information Section */}
              <div className="delivery-info-section mb-4">
                <div className="delivery-info-item">
                  <div className="delivery-info-icon">
                    <i className="bi bi-geo-alt-fill"></i>
                  </div>
                  <div className="delivery-info-content">
                    <h6 className="delivery-info-title">Delivery Information</h6>
                    <p className="delivery-info-subtitle">
                      {order.delivery_amount ? 
                        `${formatPrice(order.delivery_amount)}` : 
                        'Select delivery address'
                      }
                    </p>
                  </div>
                  <div className="delivery-info-arrow">
                    <i className="bi bi-chevron-right"></i>
                  </div>
                </div>
              </div>

              <div className="checkout-actions">
                <Button 
                  className="btn-modern btn-modern-primary btn-checkout"
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  <i className="bi bi-shield-check me-2"></i>
                  Checkout
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="trust-indicators">
                <div className="trust-item">
                  <i className="bi bi-shield-fill-check"></i>
                  <span>Secure Payment</span>
                </div>
                <div className="trust-item">
                  <i className="bi bi-truck"></i>
                  <span>Fast Delivery</span>
                </div>
                <div className="trust-item">
                  <i className="bi bi-arrow-clockwise"></i>
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartPage;
