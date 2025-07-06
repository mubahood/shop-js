// src/app/components/Account/AccountDashboard.tsx
import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useAppCounts, useRecentOrders } from '../../hooks/useManifest';

const AccountDashboardContent: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const appCounts = useAppCounts();
  const recentOrders = useRecentOrders();

  const quickActions = [
    {
      title: 'View Orders',
      description: 'Track your recent orders',
      icon: 'bi-bag-check',
      link: '/account/orders',
      color: 'primary'
    },
    {
      title: 'Update Profile',
      description: 'Manage your account information',
      icon: 'bi-person-gear',
      link: '/account/profile',
      color: 'success'
    },
    {
      title: 'Address Book',
      description: 'Manage delivery addresses',
      icon: 'bi-geo-alt',
      link: '/account/addresses',
      color: 'info'
    },
    {
      title: 'Payment Settings',
      description: 'Manage payment methods',
      icon: 'bi-credit-card',
      link: '/account/payment',
      color: 'warning'
    }
  ];

  const accountStats = [
    {
      label: 'Total Orders',
      value: appCounts.total_orders.toString(),
      icon: 'bi-bag-check',
      color: 'primary'
    },
    {
      label: 'Unread Messages',
      value: appCounts.unread_messages_count.toString(),
      icon: 'bi-chat-dots',
      color: 'warning'
    },
    {
      label: 'Wishlist Items',
      value: appCounts.wishlist_count.toString(),
      icon: 'bi-heart',
      color: 'danger'
    },
    {
      label: 'Notifications',
      value: appCounts.notifications_count.toString(),
      icon: 'bi-bell',
      color: 'success'
    }
  ];

  return (
    <>
      {/* Page Header */}
      <div className="account-page-header">
        <h1 className="account-page-title">
          Welcome back, {user?.first_name || 'Customer'}!
        </h1>
        <p className="account-page-subtitle">
          Manage your account, track orders, and update your preferences
        </p>
      </div>

      {/* Account Stats */}
      <Row className="mb-4">
        {accountStats.map((stat, index) => (
          <Col md={6} lg={3} key={index} className="mb-3">
            <Card className="account-content-card h-100">
              <Card.Body className="text-center">
                <div className={`text-${stat.color} mb-3`}>
                  <i className={`${stat.icon}`} style={{ fontSize: '2.5rem' }}></i>
                </div>
                <h3 className="mb-1">{stat.value}</h3>
                <p className="text-muted mb-0">{stat.label}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Quick Actions */}
      <div className="mb-4">
        <h3 className="mb-3">Quick Actions</h3>
        <Row>
          {quickActions.map((action, index) => (
            <Col md={6} lg={3} key={index} className="mb-3">
              <Card className="account-content-card h-100">
                <Card.Body className="d-flex flex-column">
                  <div className={`text-${action.color} mb-3`}>
                    <i className={`${action.icon}`} style={{ fontSize: '2rem' }}></i>
                  </div>
                  <h5 className="card-title">{action.title}</h5>
                  <p className="card-text text-muted flex-grow-1">{action.description}</p>
                  <Link to={action.link} className={`btn btn-outline-${action.color} btn-sm mt-auto`}>
                    Go to {action.title}
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Recent Activity */}
      <Row>
        <Col lg={8}>
          <Card className="account-content-card">
            <Card.Header>
              <h5 className="mb-0">Recent Orders</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex align-items-center justify-content-center py-5">
                <div className="text-center">
                  <i className="bi bi-bag-x text-muted" style={{ fontSize: '3rem' }}></i>
                  <h5 className="mt-3">No Recent Orders</h5>
                  <p className="text-muted mb-3">You haven't placed any orders yet</p>
                  <Link to="/products" className="btn btn-primary">
                    Start Shopping
                  </Link>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="account-content-card mb-3">
            <Card.Header>
              <h6 className="mb-0">Account Status</h6>
            </Card.Header>
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-shield-check text-success me-2"></i>
                <span>Email Verified</span>
                <Badge bg="success" className="ms-auto">✓</Badge>
              </div>
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-phone text-warning me-2"></i>
                <span>Phone Verified</span>
                <Badge bg="warning">Pending</Badge>
              </div>
              <div className="d-flex align-items-center">
                <i className="bi bi-person-check text-success me-2"></i>
                <span>Profile Complete</span>
                <Badge bg="success" className="ms-auto">85%</Badge>
              </div>
            </Card.Body>
          </Card>

          <Card className="account-content-card">
            <Card.Header>
              <h6 className="mb-0">Inbox Messages</h6>
            </Card.Header>
            <Card.Body>
              <div className="text-center py-3">
                <i className="bi bi-envelope-open text-muted" style={{ fontSize: '2rem' }}></i>
                <p className="mt-2 mb-0 text-muted">No new messages</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AccountDashboardContent;
