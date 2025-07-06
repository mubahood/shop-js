// src/app/pages/account/AccountProfile.tsx
import React, { useState } from "react";
import { Row, Col, Card, Form, Button, Alert, Nav } from "react-bootstrap";
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
    <>
      {/* Page Header */}
      <div className="account-page-header">
        <h1 className="account-page-title">My Profile</h1>
        <p className="account-page-subtitle">Manage your personal information</p>
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

      {/* Success Alert */}
      {showSuccess && (
        <Alert variant="success" className="d-flex align-items-center mb-4">
          <Save size={16} className="me-2" />
          Profile updated successfully!
        </Alert>
      )}

      {/* Profile Card */}
      <Card className="border-0 shadow-sm mb-4">
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

      {/* Navigation Tabs for Mobile */}
      <div className="d-lg-none mt-4">
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
      </div>
    </>
  );
};

export default AccountProfile;
