// src/app/pages/PaymentPage.tsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const contactNumber = "+256 701 070684"; // Same as Dart WebViewExample

  const handleCallToPay = () => {
    const telUrl = `tel:${contactNumber}`;
    window.location.href = telUrl;
  };

  const handleWhatsApp = () => {
    const message = `Hello, I would like to pay for order #${orderId}. Please assist me with the payment process.`;
    const whatsappUrl = `https://wa.me/${contactNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="payment-page">
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col lg={6} md={8}>
            <Card className="payment-card">
              <Card.Body className="text-center p-5">
                {/* Payment Icon */}
                <div className="payment-icon mb-4">
                  <i className="bi bi-credit-card-2-front"></i>
                </div>

                {/* Payment Title */}
                <h2 className="payment-title mb-3">
                  Complete Your Order
                </h2>

                {/* Payment Description */}
                <p className="payment-description mb-4">
                  For a secure and smooth payment process, please contact us directly at the number below. 
                  Our team will assist you with all payment details for order #{orderId}.
                </p>

                {/* Contact Number */}
                <div className="contact-number mb-4">
                  <div className="contact-label">Contact Number</div>
                  <div className="contact-value">{contactNumber}</div>
                </div>

                {/* Action Buttons */}
                <div className="payment-actions">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    onClick={handleCallToPay}
                    className="payment-btn mb-3"
                  >
                    <i className="bi bi-telephone-fill me-2"></i>
                    Call to Pay
                  </Button>

                  <Button 
                    variant="success" 
                    size="lg" 
                    onClick={handleWhatsApp}
                    className="payment-btn mb-3"
                  >
                    <i className="bi bi-whatsapp me-2"></i>
                    WhatsApp Us
                  </Button>

                  <Button 
                    variant="outline-secondary" 
                    onClick={() => navigate('/account/orders')}
                    className="back-btn"
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Orders
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="trust-indicators mt-4">
                  <div className="trust-item">
                    <i className="bi bi-shield-fill-check"></i>
                    <span>Secure Payment</span>
                  </div>
                  <div className="trust-item">
                    <i className="bi bi-headset"></i>
                    <span>24/7 Support</span>
                  </div>
                  <div className="trust-item">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Instant Processing</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PaymentPage;
