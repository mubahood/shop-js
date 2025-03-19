import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../modules/auth";
import { toAbsoluteUrl } from "../../../_metronic/helpers";

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
        <h1 className="mb-4">Your Cart is Empty</h1>
        <p className="lead text-muted mb-4">Browse our latest electronics and find something you love!</p>
        <Link to="/shop" className="btn btn-lg btn-primary shadow">
          Continue Shopping
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div className="container py-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="row g-4">
        <div className="col-lg-8">
          <h2 className="mb-4">Your Shopping Cart</h2>
          {cartItems.map((item) => (
            <div
              className="card border-0 shadow-sm mb-3 p-3 d-flex flex-md-row align-items-center"
              key={item.product_id}
            >
              <img
                src={item.product_feature_photo}
                alt={item.product_name}
                className="rounded me-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <div className="flex-grow-1">
                <h5 className="fw-semibold mb-1">{item.product_name}</h5>
                <small className="text-muted">
                  {item.color && `Color: ${item.color} | `}
                  {item.size && `Size: ${item.size}`} | Price: UGX {parseFloat(item.product_price_1).toLocaleString()}
                </small>
                <div className="d-flex align-items-center mt-2">
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => decrease(item.product_id)}
                  >
                    <i className="bi bi-dash"></i>
                  </button>
                  <span className="fw-bold mx-2">{item.product_quantity}</span>
                  <button
                    className="btn btn-sm btn-outline-secondary me-3"
                    onClick={() => increase(item.product_id)}
                  >
                    <i className="bi bi-plus"></i>
                  </button>
                  <button
                    className="btn btn-link text-danger p-0"
                    onClick={() => removeFromCart(item.product_id)}
                  >
                    <i className="bi bi-trash"></i> Remove
                  </button>
                </div>
              </div>
              <div className="text-end">
                <strong>UGX {item.totalPrice().toLocaleString()}</strong>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm border-0 p-4">
            <h4 className="fw-bold mb-3">Cart Summary</h4>
            <hr />
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>UGX {totalCartAmount.toLocaleString()}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold fs-5 mt-3">
              <span>Total</span>
              <span>UGX {totalCartAmount.toLocaleString()}</span>
            </div>
            <Link to="/checkout" className="btn btn-lg btn-primary mt-4 shadow">
              Proceed to Checkout
            </Link>
            <Link to="/shop" className="btn btn-outline-secondary mt-2 w-100">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartPage;
