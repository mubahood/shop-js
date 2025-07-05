// src/app/pages/account/AccountSettings.tsx
import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Settings, Shield, Bell, CreditCard, Eye, EyeOff, Save } from "lucide-react";

const AccountSettings: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  
  // Settings state
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    securityAlerts: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'private',
    dataSharing: false,
    analytics: true,
    personalization: true
  });

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setPrivacySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (securitySettings.newPassword !== securitySettings.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    // In a real app, this would make an API call
    setShowSuccess(true);
    setSecuritySettings(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSettingsSave = () => {
    // In a real app, this would make an API call
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3 mb-0">Account Settings</h1>
            <Button variant="success" onClick={handleSettingsSave}>
              <Save size={16} className="me-2" />
              Save All Changes
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
              Settings updated successfully!
            </Alert>
          </Col>
        </Row>
      )}

      <Row>
        {/* Security Settings */}
        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-bottom-0 py-3">
              <h3 className="h5 mb-0 d-flex align-items-center">
                <Shield size={20} className="me-2 text-primary" />
                Security & Password
              </h3>
            </Card.Header>
            <Card.Body className="p-4">
              <Form onSubmit={handlePasswordUpdate}>
                <div className="mb-4">
                  <h6>Change Password</h6>
                  <Row>
                    <Col className="mb-3">
                      <Form.Group>
                        <Form.Label>Current Password</Form.Label>
                        <div className="position-relative">
                          <Form.Control
                            type={showCurrentPassword ? "text" : "password"}
                            name="currentPassword"
                            value={securitySettings.currentPassword}
                            onChange={handleSecurityChange}
                          />
                          <Button
                            variant="link"
                            className="position-absolute top-50 end-0 translate-middle-y border-0 text-muted"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </Button>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>New Password</Form.Label>
                        <div className="position-relative">
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            name="newPassword"
                            value={securitySettings.newPassword}
                            onChange={handleSecurityChange}
                          />
                          <Button
                            variant="link"
                            className="position-absolute top-50 end-0 translate-middle-y border-0 text-muted"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </Button>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={securitySettings.confirmPassword}
                          onChange={handleSecurityChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button type="submit" variant="outline-primary" size="sm">
                    Update Password
                  </Button>
                </div>

                <div className="border-top pt-3">
                  <h6>Two-Factor Authentication</h6>
                  <Form.Check
                    type="switch"
                    label="Enable two-factor authentication"
                    name="twoFactorEnabled"
                    checked={securitySettings.twoFactorEnabled}
                    onChange={handleSecurityChange}
                    className="mb-2"
                  />
                  <small className="text-muted">
                    Add an extra layer of security to your account
                  </small>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Notification Settings */}
        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-bottom-0 py-3">
              <h3 className="h5 mb-0 d-flex align-items-center">
                <Bell size={20} className="me-2 text-primary" />
                Notifications
              </h3>
            </Card.Header>
            <Card.Body className="p-4">
              <div className="mb-4">
                <h6>Email Notifications</h6>
                <Form.Check
                  type="switch"
                  label="Enable email notifications"
                  name="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onChange={handleNotificationChange}
                  className="mb-2"
                />
                <Form.Check
                  type="switch"
                  label="Order updates"
                  name="orderUpdates"
                  checked={notificationSettings.orderUpdates}
                  onChange={handleNotificationChange}
                  className="mb-2"
                  disabled={!notificationSettings.emailNotifications}
                />
                <Form.Check
                  type="switch"
                  label="Promotions and offers"
                  name="promotions"
                  checked={notificationSettings.promotions}
                  onChange={handleNotificationChange}
                  className="mb-2"
                  disabled={!notificationSettings.emailNotifications}
                />
                <Form.Check
                  type="switch"
                  label="Newsletter"
                  name="newsletter"
                  checked={notificationSettings.newsletter}
                  onChange={handleNotificationChange}
                  className="mb-2"
                  disabled={!notificationSettings.emailNotifications}
                />
              </div>

              <div className="border-top pt-3 mb-4">
                <h6>SMS Notifications</h6>
                <Form.Check
                  type="switch"
                  label="Enable SMS notifications"
                  name="smsNotifications"
                  checked={notificationSettings.smsNotifications}
                  onChange={handleNotificationChange}
                  className="mb-2"
                />
                <small className="text-muted">
                  Receive important order updates via SMS
                </small>
              </div>

              <div className="border-top pt-3">
                <h6>Security Alerts</h6>
                <Form.Check
                  type="switch"
                  label="Security alerts"
                  name="securityAlerts"
                  checked={notificationSettings.securityAlerts}
                  onChange={handleNotificationChange}
                  className="mb-2"
                />
                <small className="text-muted">
                  Get notified about login attempts and security changes
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Privacy Settings */}
        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom-0 py-3">
              <h3 className="h5 mb-0 d-flex align-items-center">
                <Settings size={20} className="me-2 text-primary" />
                Privacy Settings
              </h3>
            </Card.Header>
            <Card.Body className="p-4">
              <div className="mb-4">
                <h6>Profile Visibility</h6>
                <Form.Select
                  name="profileVisibility"
                  value={privacySettings.profileVisibility}
                  onChange={handlePrivacyChange}
                  className="mb-2"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="friends">Friends Only</option>
                </Form.Select>
                <small className="text-muted">
                  Control who can see your profile information
                </small>
              </div>

              <div className="mb-4">
                <h6>Data & Analytics</h6>
                <Form.Check
                  type="switch"
                  label="Share data for analytics"
                  name="analytics"
                  checked={privacySettings.analytics}
                  onChange={handlePrivacyChange}
                  className="mb-2"
                />
                <Form.Check
                  type="switch"
                  label="Enable personalization"
                  name="personalization"
                  checked={privacySettings.personalization}
                  onChange={handlePrivacyChange}
                  className="mb-2"
                />
                <Form.Check
                  type="switch"
                  label="Allow data sharing with partners"
                  name="dataSharing"
                  checked={privacySettings.dataSharing}
                  onChange={handlePrivacyChange}
                  className="mb-2"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Payment Methods */}
        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom-0 py-3">
              <h3 className="h5 mb-0 d-flex align-items-center">
                <CreditCard size={20} className="me-2 text-primary" />
                Payment Methods
              </h3>
            </Card.Header>
            <Card.Body className="p-4">
              <div className="d-flex align-items-center justify-content-between mb-3 p-3 border rounded">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <CreditCard size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="fw-semibold">•••• •••• •••• 4242</div>
                    <small className="text-muted">Expires 12/26</small>
                  </div>
                </div>
                <div>
                  <Button variant="outline-primary" size="sm" className="me-2">
                    Edit
                  </Button>
                  <Button variant="outline-danger" size="sm">
                    Remove
                  </Button>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between mb-3 p-3 border rounded">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <CreditCard size={24} className="text-success" />
                  </div>
                  <div>
                    <div className="fw-semibold">PayPal Account</div>
                    <small className="text-muted">john.doe@example.com</small>
                  </div>
                </div>
                <div>
                  <Button variant="outline-primary" size="sm" className="me-2">
                    Edit
                  </Button>
                  <Button variant="outline-danger" size="sm">
                    Remove
                  </Button>
                </div>
              </div>

              <Button variant="outline-primary" className="w-100">
                <CreditCard size={16} className="me-2" />
                Add New Payment Method
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Danger Zone */}
      <Row>
        <Col>
          <Card className="border-danger">
            <Card.Header className="bg-danger bg-opacity-10 border-danger">
              <h3 className="h5 mb-0 text-danger">Danger Zone</h3>
            </Card.Header>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-danger mb-1">Delete Account</h6>
                  <p className="text-muted mb-0">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                </div>
                <Button variant="outline-danger">
                  Delete Account
                </Button>
              </div>
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
              <Nav.Link as={Link} to="/account/profile">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/account/settings" active>Settings</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountSettings;
