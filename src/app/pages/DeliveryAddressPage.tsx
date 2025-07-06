// src/app/pages/DeliveryAddressPage.tsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { OrderModel } from '../models/OrderModel';
import { DeliveryAddressModel } from '../models/DeliveryAddressModel';
import { useDeliveryLocations } from '../hooks/useManifest';
import { formatPrice } from '../utils';
import ToastService from '../services/ToastService';
import Utils from '../services/Utils';
import { OrderModelUtils } from '../utils/OrderModelUtils';
import './DeliveryAddressPage.css';

interface LocationState {
  order: OrderModel;
}

const DeliveryAddressPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { order: initialOrder } = (location.state as LocationState) || {};

  const [order, setOrder] = useState<OrderModel>(() => {
    // Ensure order is properly instantiated with all methods using utility
    return OrderModelUtils.ensureOrderModel(initialOrder);
  });
  
  // Get delivery locations from manifest
  const manifestDeliveryLocations = useDeliveryLocations();
  const [deliveryAddresses, setDeliveryAddresses] = useState<DeliveryAddressModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadDeliveryAddresses();
  }, [manifestDeliveryLocations]);

  const loadDeliveryAddresses = async () => {
    try {
      setIsLoadingAddresses(true);
      
      // Use delivery locations from manifest if available, otherwise fallback to API
      if (manifestDeliveryLocations && manifestDeliveryLocations.length > 0) {
        // Convert manifest delivery locations to DeliveryAddressModel format
        const addresses = manifestDeliveryLocations.map(location => {
          const address = new DeliveryAddressModel();
          address.id = location.id;
          address.address = location.name;
          address.shipping_cost = location.shipping_cost.toString();
          return address;
        });
        setDeliveryAddresses(addresses);
      } else {
        // Fallback to direct API call if manifest not available
        const addresses = await DeliveryAddressModel.getItems();
        setDeliveryAddresses(addresses);
      }
    } catch (error) {
      console.error('Error loading delivery addresses:', error);
      ToastService.error('Failed to load delivery addresses');
    } finally {
      setIsLoadingAddresses(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate delivery address selection
    if (!order.delivery_address_id) {
      newErrors.delivery_address_id = 'Please select a delivery region';
    }

    // Validate street address
    if (!order.delivery_address_details || order.delivery_address_details.length < 5) {
      newErrors.delivery_address_details = 'Please enter a clear address';
    }

    // Validate customer name
    if (!order.customer_name || order.customer_name.trim().length < 2) {
      newErrors.customer_name = 'Please enter your name';
    }

    // Validate email
    if (!order.mail || !Utils.isValidMail(order.mail)) {
      newErrors.mail = 'Please enter a valid email address';
    }

    // Validate phone number
    if (!order.customer_phone_number_1 || order.customer_phone_number_1.length < 10) {
      newErrors.customer_phone_number_1 = 'Please enter a valid phone number';
    }

    // Check if phone starts with +
    if (order.customer_phone_number_1 && order.customer_phone_number_1.startsWith('+')) {
      newErrors.customer_phone_number_1 = 'Phone number should not start with +';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDeliveryAddressChange = (addressId: string) => {
    const selectedAddress = deliveryAddresses.find(addr => addr.id.toString() === addressId);
    if (selectedAddress) {
      const updatedOrder = new OrderModel();
      Object.assign(updatedOrder, order);
      updatedOrder.delivery_address_id = selectedAddress.id.toString();
      updatedOrder.delivery_address_text = selectedAddress.address;
      updatedOrder.delivery_amount = selectedAddress.shipping_cost;
      setOrder(updatedOrder);
    }
  };

  const handleInputChange = (field: keyof OrderModel, value: string) => {
    const updatedOrder = new OrderModel();
    Object.assign(updatedOrder, order);
    (updatedOrder as any)[field] = value;
    setOrder(updatedOrder);

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      ToastService.error('Please fix the errors below');
      return;
    }

    try {
      setIsLoading(true);
      
      // Navigate to checkout with updated order
      navigate('/checkout', { state: { order } });
    } catch (error) {
      console.error('Error proceeding to checkout:', error);
      ToastService.error('Failed to proceed to checkout');
    } finally {
      setIsLoading(false);
    }
  };

  if (!initialOrder) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          No order information found. Please start from the cart.
        </Alert>
      </Container>
    );
  }

  return (
    <div className="delivery-address-page">
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col lg={8} xl={6}>
            <div className="delivery-form-wrapper">
              <div className="delivery-header">
                <h2 className="delivery-title">Delivery Information</h2>
                <p className="delivery-subtitle">Please provide your delivery details</p>
              </div>

              <Form onSubmit={handleSubmit}>
                {/* Delivery Region Selection */}
                <div className="form-group-modern">
                  <label className="form-label-modern">Delivery Region *</label>
                  {isLoadingAddresses ? (
                    <div className="text-center py-3">
                      <Spinner animation="border" size="sm" />
                      <span className="ms-2">Loading regions...</span>
                    </div>
                  ) : (
                    <Form.Select
                      value={order.delivery_address_id}
                      onChange={(e) => handleDeliveryAddressChange(e.target.value)}
                      isInvalid={!!errors.delivery_address_id}
                      className="form-control-modern"
                    >
                      <option value="">Select a delivery region</option>
                      {deliveryAddresses.map((address) => (
                        <option key={address.id} value={address.id.toString()}>
                          {address.address} - {formatPrice(address.shipping_cost)}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                  {errors.delivery_address_id && (
                    <div className="error-message">{errors.delivery_address_id}</div>
                  )}
                </div>

                {/* Street Address */}
                <div className="form-group-modern">
                  <label className="form-label-modern">Street Address *</label>
                  <Form.Control
                    type="text"
                    value={order.delivery_address_details}
                    onChange={(e) => handleInputChange('delivery_address_details', e.target.value)}
                    placeholder="Enter your street address"
                    isInvalid={!!errors.delivery_address_details}
                    className="form-control-modern"
                  />
                  {errors.delivery_address_details && (
                    <div className="error-message">{errors.delivery_address_details}</div>
                  )}
                </div>

                {/* Customer Name */}
                <div className="form-group-modern">
                  <label className="form-label-modern">Full Name *</label>
                  <Form.Control
                    type="text"
                    value={order.customer_name}
                    onChange={(e) => handleInputChange('customer_name', e.target.value)}
                    placeholder="Enter your full name"
                    isInvalid={!!errors.customer_name}
                    className="form-control-modern"
                  />
                  {errors.customer_name && (
                    <div className="error-message">{errors.customer_name}</div>
                  )}
                </div>

                {/* Email Address */}
                <div className="form-group-modern">
                  <label className="form-label-modern">Email Address *</label>
                  <Form.Control
                    type="email"
                    value={order.mail}
                    onChange={(e) => handleInputChange('mail', e.target.value)}
                    placeholder="Enter your email address"
                    isInvalid={!!errors.mail}
                    className="form-control-modern"
                  />
                  {errors.mail && (
                    <div className="error-message">{errors.mail}</div>
                  )}
                </div>

                {/* Phone Number */}
                <div className="form-group-modern">
                  <label className="form-label-modern">Phone Number *</label>
                  <Form.Control
                    type="tel"
                    value={order.customer_phone_number_1}
                    onChange={(e) => handleInputChange('customer_phone_number_1', e.target.value)}
                    placeholder="Enter your phone number"
                    isInvalid={!!errors.customer_phone_number_1}
                    className="form-control-modern"
                  />
                  {errors.customer_phone_number_1 && (
                    <div className="error-message">{errors.customer_phone_number_1}</div>
                  )}
                </div>

                {/* Alternate Phone Number */}
                <div className="form-group-modern">
                  <label className="form-label-modern">Alternate Phone Number</label>
                  <Form.Control
                    type="tel"
                    value={order.customer_phone_number_2}
                    onChange={(e) => handleInputChange('customer_phone_number_2', e.target.value)}
                    placeholder="Enter alternate phone number (optional)"
                    className="form-control-modern"
                  />
                </div>

                {/* Order Details */}
                <div className="form-group-modern">
                  <label className="form-label-modern">Order Notes</label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={order.order_details}
                    onChange={(e) => handleInputChange('order_details', e.target.value)}
                    placeholder="Any special instructions for delivery (optional)"
                    className="form-control-modern"
                  />
                </div>

                {/* Action Buttons */}
                <div className="delivery-actions">
                  <Button
                    variant="outline-secondary"
                    onClick={() => navigate('/cart')}
                    className="btn-back"
                  >
                    Back to Cart
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="btn-continue"
                  >
                    {isLoading ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        Processing...
                      </>
                    ) : (
                      'Continue to Checkout'
                    )}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DeliveryAddressPage;
