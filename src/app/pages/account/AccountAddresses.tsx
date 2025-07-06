// src/app/pages/account/AccountAddresses.tsx
import React, { useState } from "react";
import { Row, Col, Card, Button, Form, Modal, Nav, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MapPin, Plus, Edit3, Trash2, Home, Building } from "lucide-react";

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  isDefault: boolean;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

const AccountAddresses: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      type: "home",
      isDefault: true,
      firstName: "John",
      lastName: "Doe",
      address1: "123 Main Street",
      address2: "Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      phone: "+1 (555) 123-4567"
    },
    {
      id: "2",
      type: "work",
      isDefault: false,
      firstName: "John",
      lastName: "Doe",
      company: "Tech Corp Inc.",
      address1: "456 Business Ave",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "United States",
      phone: "+1 (555) 987-6543"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<Partial<Address>>({
    type: 'home',
    isDefault: false,
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: ''
  });

  const handleAddAddress = () => {
    setEditingAddress(null);
    setFormData({
      type: 'home',
      isDefault: false,
      firstName: '',
      lastName: '',
      company: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      phone: ''
    });
    setShowModal(true);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setFormData(address);
    setShowModal(true);
  };

  const handleDeleteAddress = (addressId: string) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses(prev => prev.filter(addr => addr.id !== addressId));
    }
  };

  const handleSetDefault = (addressId: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAddress) {
      // Update existing address
      setAddresses(prev => prev.map(addr => 
        addr.id === editingAddress.id ? { ...formData as Address, id: editingAddress.id } : addr
      ));
    } else {
      // Add new address
      const newAddress: Address = {
        ...formData as Address,
        id: Date.now().toString()
      };
      
      // If this is set as default, remove default from others
      if (newAddress.isDefault) {
        setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: false })));
      }
      
      setAddresses(prev => [...prev, newAddress]);
    }
    
    setShowModal(false);
  };

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <Home size={16} />;
      case 'work':
        return <Building size={16} />;
      default:
        return <MapPin size={16} />;
    }
  };

  return (
    <>
      {/* Page Header */}
      <div className="account-page-header">
        <h1 className="account-page-title">My Addresses</h1>
        <p className="account-page-subtitle">Manage your delivery addresses</p>
        <Button variant="primary" onClick={handleAddAddress}>
          <Plus size={16} className="me-2" />
          Add New Address
        </Button>
      </div>

      {/* Addresses Grid */}
      <Row>
        {addresses.length === 0 ? (
          <Col>
            <Card className="border-0 shadow-sm text-center py-5">
              <Card.Body>
                <MapPin size={48} className="text-muted mb-3" />
                <h3 className="h5">No addresses found</h3>
                <p className="text-muted mb-4">Add your first address to get started.</p>
                <Button variant="primary" onClick={handleAddAddress}>
                  <Plus size={16} className="me-2" />
                  Add Address
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          addresses.map((address) => (
            <Col md={6} lg={4} key={address.id} className="mb-4">
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center">
                      <div className="text-primary me-2">
                        {getAddressIcon(address.type)}
                      </div>
                      <h6 className="mb-0 text-capitalize">{address.type}</h6>
                    </div>
                    {address.isDefault && (
                      <Badge bg="success" className="rounded-pill">Default</Badge>
                    )}
                  </div>

                  <div className="mb-3">
                    <div className="fw-semibold">{address.firstName} {address.lastName}</div>
                    {address.company && (
                      <div className="text-muted small">{address.company}</div>
                    )}
                    <div className="mt-2">
                      <div>{address.address1}</div>
                      {address.address2 && <div>{address.address2}</div>}
                      <div>{address.city}, {address.state} {address.zipCode}</div>
                      <div>{address.country}</div>
                    </div>
                    {address.phone && (
                      <div className="text-muted small mt-2">{address.phone}</div>
                    )}
                  </div>

                  <div className="d-flex gap-2">
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      onClick={() => handleEditAddress(address)}
                    >
                      <Edit3 size={14} className="me-1" />
                      Edit
                    </Button>
                    {!address.isDefault && (
                      <Button 
                        variant="outline-success" 
                        size="sm"
                        onClick={() => handleSetDefault(address.id)}
                      >
                        Set Default
                      </Button>
                    )}
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleDeleteAddress(address.id)}
                      disabled={address.isDefault}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Add/Edit Address Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingAddress ? 'Edit Address' : 'Add New Address'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveAddress}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Address Type</Form.Label>
                  <Form.Select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="home">Home</option>
                    <option value="work">Work</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Set as default address"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleInputChange}
                  className="mt-4"
                />
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="mb-3">
                <Form.Group>
                  <Form.Label>Company (Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="mb-3">
                <Form.Group>
                  <Form.Label>Address Line 1</Form.Label>
                  <Form.Control
                    type="text"
                    name="address1"
                    value={formData.address1}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="mb-3">
                <Form.Group>
                  <Form.Label>Address Line 2 (Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    name="address2"
                    value={formData.address2}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3} className="mb-3">
                <Form.Group>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3} className="mb-3">
                <Form.Group>
                  <Form.Label>ZIP Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Country</Form.Label>
                  <Form.Select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Phone Number (Optional)</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveAddress}>
            {editingAddress ? 'Update Address' : 'Add Address'}
          </Button>
        </Modal.Footer>
      </Modal>

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
              <Nav.Link as={Link} to="/account/addresses" active>Addresses</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </>
  );
};

export default AccountAddresses;
