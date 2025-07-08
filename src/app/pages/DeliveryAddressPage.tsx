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
import DynamicBreadcrumb from '../components/shared/DynamicBreadcrumb';

// Inline styles for DeliveryAddressPage following the unified, clean, centered card design
const deliveryAddressPageStyles = `
  .delivery-address-page {
    min-height: 100vh;
    background: var(--background-body);
  }

  .delivery-form-wrapper {
    width: 100%;
    min-height: 60vh;
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-md);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0;
    border: none;
  }

  .delivery-header {
    padding: 32px 32px 0 32px;
    text-align: center;
    background: none;
    border: none;
  }

  .delivery-title {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--text-color-dark);
    margin-bottom: 0.25rem;
  }

  .delivery-subtitle {
    font-size: 1rem;
    color: var(--text-color-medium);
    margin-bottom: 0;
  }

  form {
    padding: 32px;
    background: none;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
  }

  .form-group-modern {
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .form-label-modern {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-color-dark);
    margin-bottom: 2px;
    text-transform: none;
    letter-spacing: 0;
  }

  .form-control-modern {
    font-size: 1rem !important;
    border-radius: var(--border-radius) !important;
    border: 1px solid var(--border-color) !important;
    background: var(--white) !important;
    padding: 10px 14px !important;
    box-shadow: none !important;
    font-weight: 400 !important;
    transition: border-color 0.2s;
  }

  .form-control-modern:focus {
    border-color: var(--primary-color) !important;
    background: var(--background-light) !important;
    outline: none !important;
    box-shadow: none !important;
  }

  .error-message {
    color: var(--danger-color);
    font-size: 0.95rem;
    margin-top: 2px;
    font-weight: 500;
    background: none;
    border: none;
    padding: 0;
  }

  .delivery-actions {
    display: flex;
    justify-content: center;
    gap: 16px;
    padding: 32px 0 0 0;
    background: none;
    border: none;
  }

  .btn-back {
    font-size: 1rem;
    color: var(--primary-color);
    background: var(--white);
    border: 1px solid var(--primary-color);
    border-radius: var(--border-radius);
    min-width: 120px;
    font-weight: 500;
    transition: all 0.2s;
  }

  .btn-back:hover {
    background: var(--primary-color);
    color: var(--white);
  }

  .btn-continue {
    font-size: 1rem;
    font-weight: 600;
    border-radius: var(--border-radius);
    background: var(--primary-color);
    color: var(--white);
    border: none;
    min-width: 140px;
    transition: all 0.2s;
  }

  .btn-continue:hover:not(:disabled) {
    background: var(--primary-color-dark);
    color: var(--white);
  }

  .btn-continue:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 575.98px) {
    .delivery-form-wrapper, .delivery-header, form, .delivery-actions {
      padding: 16px !important;
    }
    .delivery-title {
      font-size: 1.1rem;
    }
  }
`;

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
    <>
      <style dangerouslySetInnerHTML={{ __html: deliveryAddressPageStyles }} />
      <DynamicBreadcrumb showBackground={true} showIcons={true} />
      <div className="delivery-address-page">
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <div className="delivery-form-wrapper w-100" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
        </Container>
      </div>

    </>
  );
}

export default DeliveryAddressPage;
