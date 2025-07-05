// src/app/pages/CartPage.tsx
import React from "react";
import { Container, Row, Col, Card, Button, Form, Table, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { 
  removeItem, 
  updateItemQuantity, 
  clearCart
} from "../store/slices/cartSlice";
import { formatPrice } from "../utils";
import "./CartPage.css";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.cart);

  const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.product.price_1) * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (productId: number, newQuantity: number, selectedVariants?: { [key: string]: string }) => {
    if (newQuantity < 1) {
      dispatch(removeItem({ productId, selectedVariants }));
    } else {
      dispatch(updateItemQuantity({ productId, quantity: newQuantity, selectedVariants }));
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <Container>
          <div className="empty-cart text-center py-5">
            <i className="bi bi-cart-x fs-1 text-muted mb-4"></i>
            <h2 className="mb-3">Your cart is empty</h2>
            <p className="text-muted mb-4">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/shop" className="btn btn-primary btn-lg">
              Start Shopping
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="my-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none">Home</Link>
            </li>
            <li className="breadcrumb-item active">Shopping Cart</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2 mb-0">Shopping Cart</h1>
          <Badge bg="secondary">{items.length} item{items.length !== 1 ? 's' : ''}</Badge>
        </div>

        <Row>
          {/* Cart Items */}
          <Col lg={8}>
            <Card className="cart-items-card">
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table className="cart-table mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={`${item.product.id}-${index}`}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={item.product.feature_photo}
                                alt={item.product.name}
                                className="cart-item-image me-3"
                                onError={(e) => {
                                  e.currentTarget.src = "/media/products/placeholder.jpg";
                                }}
                              />
                              <div>
                                <h6 className="mb-1">
                                  <Link 
                                    to={`/product/${item.product.id}`}
                                    className="text-decoration-none text-dark"
                                  >
                                    {item.product.name}
                                  </Link>
                                </h6>
                                {item.selectedVariants && Object.entries(item.selectedVariants).map(([key, value]) => (
                                  <small key={key} className="text-muted d-block">
                                    {key}: {value}
                                  </small>
                                ))}
                              </div>
                            </div>
                          </td>
                          <td className="align-middle">
                            <span className="fw-semibold">{formatPrice(parseFloat(item.product.price_1))}</span>
                          </td>
                          <td className="align-middle">
                            <div className="quantity-controls d-flex align-items-center">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => handleQuantityChange(item.product.id, item.quantity - 1, item.selectedVariants)}
                                className="quantity-btn"
                              >
                                <i className="bi bi-dash"></i>
                              </Button>
                              <Form.Control
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value) || 1, item.selectedVariants)}
                                className="quantity-input mx-2 text-center"
                                min="1"
                                style={{ width: "70px" }}
                              />
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => handleQuantityChange(item.product.id, item.quantity + 1, item.selectedVariants)}
                                className="quantity-btn"
                              >
                                <i className="bi bi-plus"></i>
                              </Button>
                            </div>
                          </td>
                          <td className="align-middle">
                            <span className="fw-bold">
                              {formatPrice(parseFloat(item.product.price_1) * item.quantity)}
                            </span>
                          </td>
                          <td className="align-middle">
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => dispatch(removeItem({ productId: item.product.id, selectedVariants: item.selectedVariants }))}
                              className="remove-btn"
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>

            {/* Cart Actions */}
            <div className="cart-actions d-flex justify-content-between mt-4">
              <Link to="/shop" className="btn btn-outline-primary">
                <i className="bi bi-arrow-left me-2"></i>
                Continue Shopping
              </Link>
              <Button 
                variant="outline-danger"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </Button>
            </div>
          </Col>

          {/* Order Summary */}
          <Col lg={4}>
            <Card className="order-summary-card sticky-top">
              <Card.Header>
                <h5 className="mb-0">Order Summary</h5>
              </Card.Header>
              <Card.Body>
                <div className="summary-row d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="summary-row d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-success">FREE</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>

                <div className="summary-row d-flex justify-content-between mb-3">
                  <span>Tax:</span>
                  <span>{formatPrice(tax)}</span>
                </div>

                <hr />

                <div className="summary-row d-flex justify-content-between mb-4">
                  <strong>Total:</strong>
                  <strong className="text-primary">{formatPrice(total)}</strong>
                </div>

                {/* Free Shipping Notice */}
                {subtotal < 100 && (
                  <div className="free-shipping-notice mb-4 p-3 bg-light rounded">
                    <small className="text-muted">
                      <i className="bi bi-truck me-2"></i>
                      Add {formatPrice(100 - subtotal)} more for FREE shipping!
                    </small>
                  </div>
                )}

                <Button
                  variant="primary"
                  size="lg"
                  className="w-100"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </Button>

                {/* Security badges */}
                <div className="security-badges text-center mt-4">
                  <small className="text-muted d-block mb-2">Secure Checkout</small>
                  <div className="d-flex justify-content-center gap-2">
                    <i className="bi bi-shield-check text-success"></i>
                    <i className="bi bi-lock-fill text-muted"></i>
                    <span className="small text-muted">SSL Encrypted</span>
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

export default CartPage;
