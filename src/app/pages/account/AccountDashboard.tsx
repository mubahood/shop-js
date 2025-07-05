// src/app/pages/account/AccountDashboard.tsx
import React from "react";
import { Container, Row, Col, Card, Button, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { User, ShoppingBag, MapPin, Settings, Heart, CreditCard } from "lucide-react";
import { APP_CONFIG } from "../../constants";

const AccountDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Mock user data - in real app this would come from Redux store
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    memberSince: "January 2023",
    totalOrders: 12,
    totalSpent: 1250.99,
    wishlistCount: 8,
    addressesCount: 2
  };

  const quickActions = [
    {
      title: "My Orders",
      description: "Track and manage your orders",
      icon: <ShoppingBag size={24} />,
      link: "/account/orders",
      count: user.totalOrders
    },
    {
      title: "Profile",
      description: "Manage your personal information",
      icon: <User size={24} />,
      link: "/account/profile"
    },
    {
      title: "Addresses",
      description: "Manage shipping addresses",
      icon: <MapPin size={24} />,
      link: "/account/addresses",
      count: user.addressesCount
    },
    {
      title: "Wishlist",
      description: "View your saved items",
      icon: <Heart size={24} />,
      link: "/wishlist",
      count: user.wishlistCount
    },
    {
      title: "Payment Methods",
      description: "Manage payment options",
      icon: <CreditCard size={24} />,
      link: "/account/settings"
    },
    {
      title: "Settings",
      description: "Account preferences",
      icon: <Settings size={24} />,
      link: "/account/settings"
    }
  ];

  const recentOrders = [
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 89.99,
      items: 3
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-10",
      status: "Shipped",
      total: 159.99,
      items: 2
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-05",
      status: "Processing",
      total: 299.99,
      items: 1
    }
  ];

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3 mb-0">My Account</h1>
            <Button 
              variant="outline-secondary" 
              size="sm"
              onClick={() => navigate("/account/settings")}
            >
              <Settings size={16} className="me-2" />
              Account Settings
            </Button>
          </div>
        </Col>
      </Row>

      {/* Welcome Section */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm bg-primary text-white">
            <Card.Body className="p-4">
              <Row>
                <Col md={8}>
                  <h2 className="h4 mb-2">Welcome back, {user.name}!</h2>
                  <p className="mb-3 opacity-75">
                    Member since {user.memberSince}
                  </p>
                  <div className="d-flex gap-4">
                    <div>
                      <div className="h5 mb-0">{user.totalOrders}</div>
                      <small className="opacity-75">Total Orders</small>
                    </div>
                    <div>
                      <div className="h5 mb-0">${user.totalSpent.toFixed(2)}</div>
                      <small className="opacity-75">Total Spent</small>
                    </div>
                  </div>
                </Col>
                <Col md={4} className="text-end d-none d-md-block">
                  <div className="bg-white bg-opacity-25 rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: "80px", height: "80px" }}>
                    <User size={40} />
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Quick Actions */}
        <Col lg={8} className="mb-4">
          <h3 className="h5 mb-3">Quick Actions</h3>
          <Row>
            {quickActions.map((action, index) => (
              <Col md={6} lg={4} key={index} className="mb-3">
                <Card className="h-100 border-0 shadow-sm hover-shadow-lg transition-all">
                  <Card.Body className="text-center p-4">
                    <div className="text-primary mb-3">
                      {action.icon}
                    </div>
                    <h4 className="h6 mb-2">{action.title}</h4>
                    <p className="text-muted small mb-3">{action.description}</p>
                    {action.count && (
                      <div className="badge bg-primary rounded-pill mb-3">
                        {action.count}
                      </div>
                    )}
                    <div>
                      <Link 
                        to={action.link} 
                        className="btn btn-outline-primary btn-sm"
                      >
                        View
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        {/* Recent Orders */}
        <Col lg={4} className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="h5 mb-0">Recent Orders</h3>
            <Link to="/account/orders" className="text-decoration-none">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <Card key={order.id} className="border-0 shadow-sm">
                <Card.Body className="p-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h6 className="mb-1">{order.id}</h6>
                      <small className="text-muted">{order.date}</small>
                    </div>
                    <span className={`badge ${
                      order.status === 'Delivered' ? 'bg-success' :
                      order.status === 'Shipped' ? 'bg-info' :
                      'bg-warning'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted small">{order.items} items</span>
                    <span className="fw-semibold">${order.total}</span>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
      </Row>

      {/* Navigation Tabs for Mobile */}
      <Row className="d-lg-none mt-4">
        <Col>
          <Nav variant="pills" className="justify-content-center">
            <Nav.Item>
              <Nav.Link as={Link} to="/account" active>Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/account/orders">Orders</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/account/profile">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/account/settings">Settings</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountDashboard;
