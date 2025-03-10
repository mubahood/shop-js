import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../modules/auth";
import { toAbsoluteUrl } from "../../../_metronic/helpers";

// Sample wishlist item interface (for demo purposes)
interface WishlistItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  inStock?: boolean;
}

const sampleWishlist: WishlistItem[] = [
  // Sample items can be added here.
];

const CartPage: React.FC = () => {
  const { cartItems, increase, decrease, removeFromCart, totalCartAmount } =
    useAuth();

  if (cartItems.length === 0) {
    return (
      <motion.div
        className="container py-5 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="mb-4">Cart</h1>
        <p className="lead text-muted">Your cart is currently empty.</p>
        <Link to="/shop" className="btn btn-lg btn-outline-primary">
          Shop Now
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <style>{`
        .cart-card {
          border: 1px solid #ddd;
          border-radius: 0;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cart-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .cart-card-body {
          padding: 1rem;
        }
        .cart-item-img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 0;
        }
        .remove-link {
          color: #f33d02;
          font-size: 0.9rem;
          cursor: pointer;
          border: none;
          background: none;
          margin-left: 1rem;
        }
        .remove-link:hover {
          text-decoration: underline;
        }
        .cart-summary-card {
          border: 1px solid #e0e0e0;
          border-radius: 0;
          overflow: hidden;
          background-color: #fff;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cart-summary-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .cart-summary-card-body {
          padding: 1rem;
        }
        .checkout-btn {
          background-color: #f33d02;
          border-color: #f33d02;
          color: #fff;
          width: 100%;
          font-weight: 600;
          margin-top: 1rem;
        }
        .checkout-btn:hover {
          background-color: #d12e00;
          border-color: #d12e00;
        }
      `}</style>

      <div className="row">
        {/* Left Column: Cart Items */}
        <div className="col-lg-8 mb-4">
          <h1 className="mb-4">Cart ({cartItems.length})</h1>
          <div className="row g-3">
            {cartItems.map((item) => (
              <div className="col-12" key={item.product_id}>
                <div className="cart-card">
                  <div className="cart-card-body">
                    <div className="d-flex">
                      {/* Product Image */}
                      <div style={{ width: "80px", marginRight: "1rem" }}>
                        <img
                          src={item.product_feature_photo}
                          alt={item.product_name}
                          className="cart-item-img"
                        />
                      </div>
                      {/* Product Info & Actions */}
                      <div className="flex-grow-1 d-flex flex-column justify-content-between">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h5 style={{ fontSize: "1rem", fontWeight: 600 }}>
                              {item.product_name}
                            </h5>
                            {item.color && (
                              <div
                                className="text-muted"
                                style={{ fontSize: "0.85rem" }}
                              >
                                Variant: {item.color}
                              </div>
                            )}
                            {item.size && (
                              <div
                                className="text-muted"
                                style={{ fontSize: "0.85rem" }}
                              >
                                Size: {item.size}
                              </div>
                            )}
                            <div
                              className="text-muted"
                              style={{ fontSize: "0.85rem" }}
                            >
                              In stock
                            </div>
                          </div>
                          <div className="text-end">
                            <strong style={{ color: "#114786" }}>
                              UGX{" "}
                              {parseFloat(
                                item.product_price_1
                              ).toLocaleString()}
                            </strong>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mt-2">
                          {/* Quantity Controls */}
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => decrease(item.product_id)}
                          >
                            <i className="bi bi-dash"></i>
                          </button>
                          <span
                            style={{
                              minWidth: "40px",
                              textAlign: "center",
                              margin: "0 0.5rem",
                            }}
                          >
                            {item.product_quantity}
                          </span>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => increase(item.product_id)}
                          >
                            <i className="bi bi-plus"></i>
                          </button>
                          {/* Remove button */}
                          <button
                            className="remove-link"
                            onClick={() => removeFromCart(item.product_id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      {/* Subtotal */}
                      <div
                        className="text-end ms-3"
                        style={{ minWidth: "100px" }}
                      >
                        <strong>
                          UGX {item.totalPrice().toLocaleString()}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="col-lg-4">
          <div className="cart-summary-card">
            <div className="cart-summary-card-body">
              <h4 style={{ fontWeight: 600 }}>Cart Summary</h4>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>UGX {totalCartAmount.toLocaleString()}</span>
              </div>
              <hr />
              <div
                className="d-flex justify-content-between fw-bold"
                style={{ fontSize: "1.1rem" }}
              >
                <span>Total:</span>
                <span>UGX {totalCartAmount.toLocaleString()}</span>
              </div>
              <Link to="/checkout" className="btn checkout-btn">
                Checkout (UGX {totalCartAmount.toLocaleString()})
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Wishlist Section (optional sample) */}
      <div className="mt-5">
        <h3 className="mb-3">Wishlist ({sampleWishlist.length})</h3>
        <div className="wishlist-grid">
          {sampleWishlist.map((wish) => (
            <div key={wish.id} className="wishlist-item">
              <img src={wish.imageUrl} alt={wish.name} />
              <h6>{wish.name}</h6>
              <div className="price">UGX {wish.price.toLocaleString()}</div>
              {wish.inStock ? (
                <div className="stock-status in-stock">In Stock</div>
              ) : (
                <div className="stock-status out-stock">Sold Out</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CartPage;
