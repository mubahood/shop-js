import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useAuth } from "../../modules/auth" // Adjust path as needed
import { toAbsoluteUrl } from "../../../_metronic/helpers"

/**
 * Sample wishlist item interface.
 * In your real code, you might fetch these from an API or context.
 */
interface WishlistItem {
  id: number
  name: string
  price: number
  imageUrl: string
  inStock?: boolean
}

const sampleWishlist: WishlistItem[] = [
/*   {
    id: 1,
    name: "Executive Poultry Incubator",
    price: 800000,
    imageUrl: toAbsoluteUrl("media/products/incubator.png"),
    inStock: true,
  },
  {
    id: 2,
    name: "Hisense Original Split AC",
    price: 1200000,
    imageUrl: toAbsoluteUrl("media/products/ac.png"),
    inStock: true,
  },
  {
    id: 3,
    name: "Hoffmans 2 in 1 Multipurpose Vacuum",
    price: 150000,
    imageUrl: toAbsoluteUrl("media/products/vacuum.png"),
    inStock: false,
  }, */
  // Add more items as you wish
]

const CartPage: React.FC = () => {
  const { cartItems, increase, decrease, totalCartAmount } = useAuth()

  // If cart is empty, show an empty state
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
    )
  }

  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Inline or external .css styles */}
      <style>
        {`
          .cart-card {
            border: 1px solid #ddd;
            border-radius: 4px;
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
            border-radius: 4px;
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
            border-radius: 4px;
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
          .wishlist-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 1rem;
          }
          .wishlist-item {
            border: 1px solid #eaeaea;
            border-radius: 4px;
            padding: 0.5rem;
            background-color: #fff;
            text-align: center;
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .wishlist-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          .wishlist-item img {
            width: 100%;
            height: 120px;
            object-fit: cover;
            border-radius: 4px;
          }
          .wishlist-item h6 {
            font-size: 0.9rem;
            margin: 0.5rem 0;
            font-weight: 600;
          }
          .wishlist-item .price {
            color: #114786;
            font-weight: 700;
            font-size: 0.9rem;
          }
          .wishlist-item .stock-status {
            font-size: 0.75rem;
            margin-top: 0.25rem;
            display: inline-block;
          }
          .wishlist-item .in-stock {
            color: #28a745;
          }
          .wishlist-item .out-stock {
            color: #dc3545;
          }
        `}
      </style>

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
                              {parseFloat(item.product_price_1).toLocaleString()}
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

                          {/* Remove link */}
                          <button
                            className="remove-link"
                            onClick={() => {
                              // Decreasing until zero effectively removes the item
                              const qty = parseInt(item.product_quantity) || 1
                              for (let i = 0; i < qty; i++) {
                                decrease(item.product_id)
                              }
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      {/* Subtotal on the far right */}
                      <div className="text-end ms-3" style={{ minWidth: "100px" }}>
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

        {/* Right Column: Summary */}
        <div className="col-lg-4">
          <div className="cart-summary-card">
            <div className="cart-summary-card-body">
              <h4 style={{ fontWeight: 600 }}>Cart Summary</h4>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>UGX {totalCartAmount.toLocaleString()}</span>
              </div>
              {/* If you have shipping or tax, show them here */}
              {/* <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>UGX 5,000</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax:</span>
                <span>UGX 3,000</span>
              </div> */}
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

      {/* Sample Wishlist Section */}
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
  )
}

export default CartPage
