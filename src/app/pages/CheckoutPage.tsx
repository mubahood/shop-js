// src/app/pages/CheckoutPage.tsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Alert, Modal } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { OrderModel } from '../models/OrderModel';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils';
import ToastService from '../services/ToastService';
import { http_post } from '../services/Api';
import { OrderModelUtils } from '../utils/OrderModelUtils';
import './CheckoutPage.css';

interface LocationState {
  order: OrderModel;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { order: initialOrder } = (location.state as LocationState) || {};
  const { cartItems, getFormattedTotal, clearCart } = useCart();

  // Early validation to prevent crashes
  useEffect(() => {
    if (!initialOrder || cartItems.length === 0) {
      console.warn('CheckoutPage: Missing order data or empty cart, redirecting to cart');
      navigate('/cart');
    }
  }, [initialOrder, cartItems.length, navigate]);

  const [order, setOrder] = useState<OrderModel>(() => {
    // Create order with proper initialization and safety checks
    if (initialOrder && typeof initialOrder === 'object') {
      return OrderModelUtils.ensureOrderModel(initialOrder);
    }
    return new OrderModel();
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Calculate totals with safety checks
  const cartTotal = parseFloat(getFormattedTotal().replace(/[^0-9.-]+/g, '')) || 0;
  const deliveryAmount = parseFloat(order?.delivery_amount || '0') || 0;
  const payableAmount = parseFloat(order?.payable_amount || '0') || 0;
  const finalTotal = cartTotal + deliveryAmount;

  useEffect(() => {
    if (!initialOrder || cartItems.length === 0) {
      navigate('/cart');
      return;
    }

    // Update order amounts exactly like Dart: widget.order.payable_amount = (mainController.tot + Utils.int_parse(widget.order.delivery_amount)).toString();
    setOrder(prevOrder => {
      // Ensure proper OrderModel instance with all methods
      const currentOrder = OrderModelUtils.ensureOrderModel(prevOrder);
      
      // Update calculated values
      currentOrder.order_total = cartTotal.toString();
      currentOrder.payable_amount = (cartTotal + deliveryAmount).toString(); // Items total + delivery (before tax)
      
      return currentOrder;
    });
  }, [cartTotal, deliveryAmount, initialOrder, cartItems.length, navigate]);

  const submitOrder = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      // Validate order data
      if (!order || typeof order !== 'object') {
        setErrorMessage('Order information is invalid. Please restart the checkout process.');
        navigate('/cart');
        return;
      }

      if (!order.customer_name || !order.customer_phone_number_1) {
        setErrorMessage('Order information is incomplete. Please go back and fill all required fields.');
        return;
      }

      // Validate cart items
      if (!cartItems || cartItems.length === 0) {
        setErrorMessage('Your cart is empty. Please add items before checkout.');
        navigate('/cart');
        return;
      }

      // Prepare delivery data exactly like Dart implementation
      const deliveryData = OrderModelUtils.toJson(order);
      
      // Handle phone numbers exactly like Dart code
      deliveryData.phone_number_2 = order.customer_phone_number_2 || order.customer_phone_number_1;
      deliveryData.phone_number_1 = order.customer_phone_number_1;
      deliveryData.phone_number = deliveryData.phone_number_1;

      console.log('Submitting order with data:', { 
        items: cartItems.length + ' items',
        delivery: deliveryData 
      });

      // Submit order to API with exact same structure as Dart
      const response = await http_post('orders-create', {
        items: JSON.stringify(cartItems),
        delivery: JSON.stringify(deliveryData),
      });

      console.log('API Response:', response);

      if (response.code !== 1) {
        setErrorMessage(response.message || 'Failed to submit order');
        ToastService.error(`Failed ${response.message || 'to submit order'}`);
        return;
      }

      // Parse the created order from response
      let createdOrder: OrderModel;
      try {
        if (response.data && typeof OrderModel.fromJson === 'function') {
          createdOrder = OrderModel.fromJson(response.data);
        } else {
          // Fallback: use utility to ensure proper OrderModel
          createdOrder = OrderModelUtils.ensureOrderModel(response.data);
        }
      } catch (error) {
        console.error('Error parsing order response:', error);
        setErrorMessage('Failed to process order response');
        ToastService.error('Failed to process order response');
        return;
      }
      
      if (!createdOrder || createdOrder.id < 1) {
        setErrorMessage(response.message || 'Invalid order response');
        ToastService.error('Failed to submit order');
        return;
      }

      // Clear cart after successful order submission (like Dart: await CartItem.deleteAll())
      await clearCart();

      ToastService.success('Order submitted successfully!', { autoClose: 4000 });

      // Navigate to success page or home (like Dart: Get.offAll(() => const BoardingWelcomeScreen()))
      navigate('/', { 
        state: { 
          orderSuccess: true, 
          orderId: createdOrder.id,
          paymentUrl: OrderModelUtils.getPaymentLink(createdOrder)
        } 
      });

    } catch (error: any) {
      console.error('Error submitting order:', error);
      setErrorMessage(error.message || 'Failed to submit order');
      ToastService.error('Failed to submit order: ' + (error.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
      setShowConfirmModal(false);
    }
  };

  const handleSubmitClick = () => {
    setShowConfirmModal(true);
  };

  if (!initialOrder || cartItems.length === 0) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Your cart is empty or order information is missing. Please start from the cart.
        </Alert>
      </Container>
    );
  }

  return (
    <div className="checkout-page">
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col lg={8} xl={6}>
            <div className="checkout-card">
              <div className="checkout-header">
                <h2 className="checkout-title">Order Summary</h2>
                <p className="checkout-subtitle">
                  Please confirm your order details below before proceeding to payment
                </p>
              </div>

              <div className="checkout-content">
                {/* Order Items Total */}
                <div className="summary-item">
                  <div className="summary-item-content">
                    <h4 className="summary-item-title">Order Items Total</h4>
                    <p className="summary-item-subtitle">
                      Total amount of all items in your cart
                    </p>
                  </div>
                  <div className="summary-item-amount">
                    {formatPrice(cartTotal.toString())}
                  </div>
                </div>

                <div className="summary-divider"></div>

                {/* Delivery Cost */}
                <div className="summary-item">
                  <div className="summary-item-content">
                    <h4 className="summary-item-title">Delivery Cost</h4>
                    <p className="summary-item-subtitle">
                      {`${order?.delivery_address_text || 'Delivery address'}, ${order?.delivery_address_details || ''}`}
                    </p>
                  </div>
                  <div className="summary-item-amount">
                    {formatPrice(order?.delivery_amount || "0")}
                  </div>
                </div>

                <div className="summary-divider-bold"></div>

                {/* Total */}
                <div className="summary-item summary-total">
                  <div className="summary-item-content">
                    <h3 className="summary-total-title">Total</h3>
                    <p className="summary-item-subtitle">
                      Final amount including all charges
                    </p>
                  </div>
                  <div className="summary-total-amount">
                    {formatPrice(finalTotal.toString())}
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <Alert variant="danger" className="checkout-error">
                  {errorMessage}
                </Alert>
              )}

              {/* Submit Button */}
              <div className="checkout-actions">
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate('/delivery-address', { state: { order } })}
                  className="btn-back-checkout"
                  disabled={isLoading}
                >
                  Back to Delivery Info
                </Button>
                
                <Button
                  onClick={handleSubmitClick}
                  disabled={isLoading}
                  className="btn-submit-order"
                >
                  {isLoading ? (
                    <>
                      <Spinner size="sm" className="me-2" />
                      Submitting Order...
                    </>
                  ) : (
                    'Submit Order'
                  )}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Order Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to submit this order?</p>
          <div className="modal-order-summary">
            <strong>Total Amount: {formatPrice(finalTotal.toString())}</strong>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="outline-secondary" 
            onClick={() => setShowConfirmModal(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={submitOrder}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner size="sm" className="me-2" />
                Submitting...
              </>
            ) : (
              'Confirm Order'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CheckoutPage;
