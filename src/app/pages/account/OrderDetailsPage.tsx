// src/app/pages/account/OrderDetailsPage.tsx
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Badge, Spinner, Alert, Button, Accordion } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { OrderModel } from '../../models/OrderModel';
import { formatPrice } from '../../utils';
import ToastService from '../../services/ToastService';
import './OrderDetailsPage.css';

const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      loadOrderDetails();
    }
  }, [orderId]);

  const loadOrderDetails = async () => {
    try {
      setIsLoading(true);
      // For now, we'll get all orders and find the specific one
      // In a real app, you'd have an API endpoint for single order
      const orders = await OrderModel.fetchItems();
      const foundOrder = orders.find(o => o.id.toString() === orderId);
      
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        ToastService.error('Order not found');
        navigate('/account/orders');
      }
    } catch (error) {
      console.error('Error loading order details:', error);
      ToastService.error('Failed to load order details');
      navigate('/account/orders');
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case '0':
        return <Badge bg="danger">Pending</Badge>;
      case '1':
        return <Badge bg="warning">Processing</Badge>;
      case '2':
        return <Badge bg="success">Completed</Badge>;
      case '3':
        return <Badge bg="secondary">Canceled</Badge>;
      case '4':
        return <Badge bg="danger">Failed</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };



  const handlePayOrder = () => {
    if (order && order.getPaymentLink()) {
      // Navigate to payment page (like WebViewExample in Dart)
      navigate(`/payment/${order.id}`);
    } else {
      ToastService.info('Payment link not available');
    }
  };

  if (isLoading) {
    return (
      <div className="account-page-header text-center">
        <Spinner animation="border" variant="primary" />
        <div className="mt-3">Loading order details...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <Alert variant="warning">
        Order not found. <a href="/account/orders">Return to orders</a>
      </Alert>
    );
  }

  return (
    <>
      {/* Page Header */}
      <div className="account-page-header">
        <h1 className="account-page-title">Order Details</h1>
        <p className="account-page-subtitle">
          Invoice #{order.id} - {formatDate(order.created_at)}
        </p>
      </div>
        {/* Order Header */}
        <div className="order-header-section">
          <Row>
            <Col>
              <div className="order-header-card">
                <div className="order-amount-display">
                  {formatPrice(order.order_total)}
                </div>
                <div className="order-status-info">
                  <div className="status-row">
                    <span className="status-label">PAYMENT STATUS:</span>
                    <Badge bg={order.isPaid() ? 'success' : 'danger'} className="ms-2">
                      {order.isPaid() ? 'Paid' : 'Not Paid'}
                    </Badge>
                  </div>
                </div>
                <div className="order-invoice-info">
                  <Row className="align-items-center">
                    <Col>
                      <div className="invoice-details">
                        <h3 className="invoice-number">INVOICE-{order.id}</h3>
                        <div className="status-row">
                          <span className="status-label">ORDER STATUS:</span>
                          {getOrderStatusBadge(order.order_state)}
                        </div>
                      </div>
                    </Col>
                    <Col xs="auto">
                      <Button variant="light" size="sm" className="invoice-btn">
                        <i className="bi bi-file-earmark-text"></i>
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Order Details */}
        <Row>
          <Col>
            <Card className="order-details-card">
              <Card.Body>
                {/* Invoice Date */}
                <div className="detail-section">
                  <div className="detail-icon">
                    <i className="bi bi-calendar-event"></i>
                  </div>
                  <div className="detail-content">
                    <h6 className="detail-title">Invoice Date</h6>
                    <p className="detail-value">{formatDate(order.created_at)}</p>
                  </div>
                </div>

                <hr />

                {/* Order Summary Accordion */}
                <Accordion defaultActiveKey="0" className="order-accordion">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <div className="accordion-header-content">
                        <i className="bi bi-bag-check me-3"></i>
                        <span>Order Summary</span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="order-summary-details">
                        <div className="summary-row">
                          <span>Order Items Total</span>
                          <span className="amount">{formatPrice(order.order_total)}</span>
                        </div>
                        <div className="summary-row">
                          <span>Delivery Cost</span>
                          <span className="amount">{formatPrice(order.delivery_amount || '0')}</span>
                        </div>
                        <hr />
                        <div className="summary-row total-row">
                          <span><strong>Total</strong></span>
                          <span className="amount total-amount">
                            <strong>
                              {formatPrice(order.payable_amount || order.order_total)}
                            </strong>
                          </span>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* Delivery Information */}
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      <div className="accordion-header-content">
                        <i className="bi bi-geo-alt me-3"></i>
                        <span>Delivery Information</span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="delivery-info">
                        <div className="delivery-details">
                          <div className="address-info">
                            <strong>Delivery Address:</strong>
                            <div>{order.delivery_address_text}</div>
                            <div>{order.delivery_address_details}</div>
                          </div>
                          <div className="delivery-cost mt-2">
                            <strong>Delivery Cost:</strong> {formatPrice(order.delivery_amount || '0')}
                          </div>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* Contact Information */}
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      <div className="accordion-header-content">
                        <i className="bi bi-person-lines-fill me-3"></i>
                        <span>Contact Information</span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="contact-info">
                        <div><strong>Name:</strong> {order.customer_name}</div>
                        <div><strong>Email:</strong> {order.mail}</div>
                        <div><strong>Phone:</strong> {order.customer_phone_number_1}</div>
                        {order.customer_phone_number_2 && (
                          <div><strong>Alternate Phone:</strong> {order.customer_phone_number_2}</div>
                        )}
                        {order.order_details && (
                          <div className="mt-2">
                            <strong>Order Notes:</strong>
                            <p className="mt-1">{order.order_details}</p>
                          </div>
                        )}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Action Buttons */}
        <Row className="mt-4">
          <Col>
            <div className="order-actions">
              <Button 
                variant="outline-secondary"
                onClick={() => navigate('/account/orders')}
                className="me-3"
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Orders
              </Button>
              
              {!order.isPaid() && (
                <Button 
                  variant="primary"
                  onClick={handlePayOrder}
                  size="lg"
                  className="pay-order-btn"
                >
                  <i className="bi bi-credit-card me-2"></i>
                  PAY ORDER
                </Button>
              )}
            </div>
          </Col>
        </Row>
    </>
  );
};

export default OrderDetailsPage;
