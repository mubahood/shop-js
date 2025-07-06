// src/app/pages/account/AccountOrdersPage.tsx
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Badge, Spinner, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { OrderModel } from '../../models/OrderModel';
import { formatPrice } from '../../utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import ToastService from '../../services/ToastService';
import './AccountOrdersPage.css';

const AccountOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user && user.id) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const fetchedOrders = await OrderModel.fetchItems();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
      ToastService.error('Failed to load orders');
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
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user || !user.id) {
    return (
      <Alert variant="warning">
        Please log in to view your orders.
      </Alert>
    );
  }

  return (
    <>
      {/* Page Header */}
      <div className="account-page-header">
        <h1 className="account-page-title">My Orders</h1>
        <p className="account-page-subtitle">Track and manage your orders</p>
      </div>

      {isLoading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <div className="mt-3">Loading your orders...</div>
        </div>
      ) : orders.length === 0 ? (
        <div className="empty-orders text-center py-5">
                <div className="empty-orders-icon mb-3">
                  <i className="bi bi-bag-x" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
                </div>
                <h4>No Orders Found</h4>
                <p className="text-muted mb-4">You haven't placed any orders yet.</p>
                <Button 
                  variant="primary" 
                  onClick={loadOrders}
                  className="me-3"
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  Reload
                </Button>
                <Link to="/products" className="btn btn-outline-primary">
                  <i className="bi bi-shop me-2"></i>
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <Card key={order.id} className="order-card mb-3">
                    <Card.Body>
                      <Row className="align-items-center">
                        <Col md={8}>
                          <div className="order-info">
                            <div className="order-header d-flex align-items-center mb-2">
                              <h5 className="order-date mb-0">
                                {formatDate(order.created_at)}
                              </h5>
                              <div className="ms-3">
                                {getOrderStatusBadge(order.order_state)}
                              </div>
                            </div>
                            <div className="order-details">
                              <div className="order-id text-muted">
                                <i className="bi bi-receipt me-1"></i>
                                Order #{order.id}
                              </div>
                              {order.delivery_method && (
                                <div className="delivery-method text-muted">
                                  <i className="bi bi-truck me-1"></i>
                                  Delivery
                                </div>
                              )}
                            </div>
                          </div>
                        </Col>
                        <Col md={4} className="text-md-end">
                          <div className="order-amount">
                            <div className="amount-value">
                              {formatPrice(order.order_total)}
                            </div>
                            <div className="payment-status">
                              {order.isPaid() ? (
                                <Badge bg="success">
                                  <i className="bi bi-check-circle me-1"></i>
                                  Paid
                                </Badge>
                              ) : (
                                <Badge bg="warning">
                                  <i className="bi bi-clock me-1"></i>
                                  Pending Payment
                                </Badge>
                              )}
                            </div>
                          </div>
                        </Col>
                      </Row>
                      
                      <hr className="my-3" />
                      
                      <div className="order-actions d-flex justify-content-between align-items-center">
                        <Link 
                          to={`/account/orders/${order.id}`}
                          className="btn btn-outline-primary btn-sm"
                        >
                          <i className="bi bi-eye me-1"></i>
                          View Details
                        </Link>
                        
                        {!order.isPaid() && order.getPaymentLink() && (
                          <Link 
                            to={`/payment/${order.id}`}
                            className="btn btn-primary btn-sm"
                          >
                            <i className="bi bi-credit-card me-1"></i>
                            Pay Now
                          </Link>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                ))}
                
                <div className="text-center mt-4">
                  <Button 
                    variant="outline-secondary" 
                    onClick={loadOrders}
                  >
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Refresh Orders
                  </Button>
                </div>
              </div>
            )}
    </>
  );
};

export default AccountOrdersPage;
