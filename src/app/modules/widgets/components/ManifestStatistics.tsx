import React from 'react';
import { Card, Row, Col, Container, Spinner, Alert } from 'react-bootstrap';
import { useAdminStats, useAppCounts, useManifest } from '../../../hooks/useManifest';

const ManifestStatistics: React.FC = () => {
  const { isLoading, error } = useManifest();
  const adminStats = useAdminStats();
  const counts = useAppCounts();

  if (isLoading) {
    return (
      <Container className="py-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading statistics...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          Failed to load statistics: {error}
        </Alert>
      </Container>
    );
  }

  const statsData = [
    {
      title: 'Total Products',
      value: counts.total_products || 0,
      icon: 'bi-box-seam',
      color: 'primary',
      description: 'Products in inventory'
    },
    {
      title: 'Total Users',
      value: counts.total_users || 0,
      icon: 'bi-people',
      color: 'success',
      description: 'Registered users'
    },
    {
      title: 'Total Vendors',
      value: counts.total_vendors || 0,
      icon: 'bi-shop',
      color: 'info',
      description: 'Active vendors'
    },
    {
      title: 'Categories',
      value: counts.total_categories || 0,
      icon: 'bi-grid-3x3-gap',
      color: 'warning',
      description: 'Product categories'
    },
    {
      title: 'Pending Orders',
      value: counts.pending_orders || 0,
      icon: 'bi-clock-history',
      color: 'danger',
      description: 'Orders awaiting processing'
    },
    {
      title: 'Orders This Week',
      value: counts.recent_orders_this_week || 0,
      icon: 'bi-calendar-week',
      color: 'success',
      description: 'Orders placed this week'
    },
    {
      title: 'Delivery Locations',
      value: counts.total_delivery_locations || 0,
      icon: 'bi-geo-alt',
      color: 'secondary',
      description: 'Available delivery areas'
    },
    {
      title: 'Active Promotions',
      value: counts.active_promotions || 0,
      icon: 'bi-percent',
      color: 'dark',
      description: 'Active promotional offers'
    }
  ];

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h2>Dashboard Statistics</h2>
          <p className="text-muted">Overview of key metrics and counts from manifest data</p>
        </Col>
      </Row>
      
      <Row className="g-4">
        {statsData.map((stat, index) => (
          <Col key={index} xs={12} sm={6} lg={3}>
            <StatCard {...stat} />
          </Col>
        ))}
      </Row>

      {/* Additional User Stats */}
      <Row className="mt-5 g-4">
        <Col xs={12} sm={6} lg={3}>
          <StatCard
            title="Wishlist Items"
            value={counts.wishlist_count || 0}
            icon="bi-heart"
            color="danger"
            description="Items in user wishlists"
          />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatCard
            title="Cart Items"
            value={counts.cart_count || 0}
            icon="bi-cart"
            color="warning"
            description="Items in shopping carts"
          />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatCard
            title="Notifications"
            value={counts.notifications_count || 0}
            icon="bi-bell"
            color="info"
            description="Unread notifications"
          />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatCard
            title="Messages"
            value={counts.unread_messages_count || 0}
            icon="bi-chat"
            color="primary"
            description="Unread messages"
          />
        </Col>
      </Row>
    </Container>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, description }) => {
  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Body className="d-flex flex-column p-4">
        <div className="d-flex align-items-center mb-3">
          <div className={`rounded-circle p-3 me-3 bg-${color} bg-opacity-10`}>
            <i className={`${icon} fs-3 text-${color}`}></i>
          </div>
          <div className="flex-grow-1">
            <h6 className="text-muted mb-0 small text-uppercase fw-semibold">{title}</h6>
            <h2 className="mb-0 fw-bold text-dark">{value.toLocaleString()}</h2>
          </div>
        </div>
        <p className="text-muted small mb-0 mt-auto">{description}</p>
      </Card.Body>
    </Card>
  );
};

export default ManifestStatistics;
