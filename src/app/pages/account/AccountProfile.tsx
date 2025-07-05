// src/app/pages/account/AccountProfile.tsx
import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { User, Mail, Phone, Calendar, Save, Edit3 } from "lucide-react";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  bio: string;
}

const AccountProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-01-15",
    gender: "male",
    bio: "I love shopping for quality products and discovering new brands."
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3 mb-0">My Profile</h1>
            <Button 
              variant={isEditing ? "success" : "outline-primary"}
              onClick={() => isEditing ? handleSave({} as React.FormEvent) : setIsEditing(true)}
            >
              {isEditing ? (
                <>
                  <Save size={16} className="me-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit3 size={16} className="me-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </Col>
      </Row>

      {/* Success Alert */}
      {showSuccess && (
        <Row className="mb-4">
          <Col>
            <Alert variant="success" className="d-flex align-items-center">
              <Save size={16} className="me-2" />
              Profile updated successfully!
            </Alert>
          </Col>
        </Row>
      )}

      <Row>
        {/* Profile Card */}
        <Col lg={8} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom-0 py-3">
              <h3 className="h5 mb-0 d-flex align-items-center">
                <User size={20} className="me-2 text-primary" />
                Personal Information
              </h3>
            </Card.Header>
            <Card.Body className="p-4">
              <Form onSubmit={handleSave}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-light" : ""}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-light" : ""}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>
                        <Mail size={16} className="me-2" />
                        Email Address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-light" : ""}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>
                        <Phone size={16} className="me-2" />
                        Phone Number
                      </Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={profile.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-light" : ""}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>
                        <Calendar size={16} className="me-2" />
                        Date of Birth
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="dateOfBirth"
                        value={profile.dateOfBirth}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-light" : ""}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        name="gender"
                        value={profile.gender}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-light" : ""}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="mb-3">
                    <Form.Group>
                      <Form.Label>Bio</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="bio"
                        value={profile.bio}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-light" : ""}
                        placeholder="Tell us a bit about yourself..."
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {isEditing && (
                  <div className="d-flex gap-2">
                    <Button type="submit" variant="primary">
                      <Save size={16} className="me-2" />
                      Save Changes
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline-secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Profile Summary */}
        <Col lg={4} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center p-4">
              <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "80px", height: "80px" }}>
                <User size={40} />
              </div>
              <h3 className="h5 mb-1">{profile.firstName} {profile.lastName}</h3>
              <p className="text-muted mb-3">{profile.email}</p>
              <div className="border-top pt-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Member since:</span>
                  <span>Jan 2023</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Total orders:</span>
                  <span>12</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Loyalty points:</span>
                  <span className="text-primary fw-semibold">2,450</span>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Quick Links */}
          <Card className="border-0 shadow-sm mt-3">
            <Card.Header className="bg-white border-bottom-0 py-3">
              <h4 className="h6 mb-0">Quick Links</h4>
            </Card.Header>
            <Card.Body className="p-0">
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/account" className="px-3 py-2 border-bottom">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/account/orders" className="px-3 py-2 border-bottom">
                  My Orders
                </Nav.Link>
                <Nav.Link as={Link} to="/account/addresses" className="px-3 py-2 border-bottom">
                  Addresses
                </Nav.Link>
                <Nav.Link as={Link} to="/account/settings" className="px-3 py-2">
                  Settings
                </Nav.Link>
              </Nav>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Navigation Tabs for Mobile */}
      <Row className="d-lg-none mt-4">
        <Col>
          <Nav variant="pills" className="justify-content-center">
            <Nav.Item>
              <Nav.Link as={Link} to="/account">Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/account/orders">Orders</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/account/profile" active>Profile</Nav.Link>
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

export default AccountProfile;
