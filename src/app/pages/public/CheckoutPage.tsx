import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { http_post } from "../../services/Api";
import Utils from "../../services/Utils";
import { OrderModel } from "../../models/OrderModel";
import { toast } from "react-toastify";
import { useAuth } from "../../modules/auth";
import { useNavigate } from "react-router-dom";
import { DeliveryAddress } from "../../models/DeliveryAddress";
// If using React-Bootstrap, install & import needed components:
import { Modal, Button } from "react-bootstrap";

interface CheckoutPageProps {
  order: OrderModel;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ order }) => {
  const navigate = useNavigate();
  const { currentUser, clearCart, cartItems, totalCartAmount } = useAuth();

  const [deliveryAddresses, setDeliveryAddresses] = useState<DeliveryAddress[]>(
    []
  );
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [deliveryRegion, setDeliveryRegion] = useState(
    order.delivery_address_text || ""
  );
  const [streetAddress, setStreetAddress] = useState(
    order.delivery_address_details || ""
  );
  const [customerName, setCustomerName] = useState(order.customer_name || "");
  const [email, setEmail] = useState(order.mail || "");
  const [phone, setPhone] = useState(order.customer_phone_number_1 || "");
  const [orderNotes, setOrderNotes] = useState(order.order_details || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const addresses = await DeliveryAddress.get_items();
        setDeliveryAddresses(addresses);
        if (addresses.length > 0 && !selectedAddressId) {
          handleAddressChange(String(addresses[0].id));
        }
      } catch (err) {
        console.error("Failed to load delivery addresses:", err);
      }
    };
    loadAddresses();
  }, [selectedAddressId]);

  const handleAddressChange = (idStr: string) => {
    const id = parseInt(idStr, 10);
    setSelectedAddressId(id);
    const addressObj = deliveryAddresses.find((addr) => addr.id === id);
    if (addressObj) {
      setDeliveryRegion(addressObj.address);
      setStreetAddress(addressObj.address);
      order.delivery_amount = addressObj.shipping_cost;
      order.delivery_address_text = addressObj.address;
      order.delivery_address_details = addressObj.address;
    }
  };

  const handlePlaceOrderClick = () => {
    if (
      !deliveryRegion ||
      !streetAddress ||
      !customerName ||
      !email ||
      !phone
    ) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (!Utils.isValidMail(email)) {
      setErrorMessage("Enter a valid email address.");
      return;
    }
    if (!phone.startsWith("+")) {
      setErrorMessage("Phone number should start with '+' sign.");
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirm(false);
    setErrorMessage("");
    setIsLoading(true);

    const delivery = {
      ...order.toJson(),
      delivery_address_text: deliveryRegion,
      delivery_address_details: streetAddress,
      mail: email,
      customer_name: customerName,
      customer_phone_number_1: phone,
      order_details: orderNotes,
      customer_phone_number_2: order.customer_phone_number_2 || phone,
    };

    try {
      const data = await http_post("orders-create", {
        items: JSON.stringify(cartItems),
        delivery: JSON.stringify(delivery),
      });
      const updatedOrder = OrderModel.fromJson(data);
      toast.success("Order placed successfully!");
      clearCart();
      navigate("/admin/my-order");
    } catch (error: any) {
      setErrorMessage(error.toString());
      toast.error(`Error: ${error.toString()}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <motion.div
        className="container py-5 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="fw-bold">Please Log In</h1>
        <p className="lead">
          Log in or create an account to complete your purchase.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate("/auth/login")}
          >
            Login
          </button>
          <button
            className="btn btn-outline-primary btn-lg"
            onClick={() => navigate("/auth/register")}
          >
            Register
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="text-center mb-5">
        <h1 className="fw-bold" style={{ color: "#114786" }}>
          Checkout
        </h1>
        <p className="text-muted">Complete your details to place your order.</p>
      </div>

      <div className="row g-4">
        <div className="col-md-7">
          <div className="card border-0 shadow-sm p-4 rounded">
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}

            <div className="mb-3">
              <label className="form-label fw-bold">
                Select Delivery Address
              </label>
              <select
                className="form-select"
                value={selectedAddressId ? String(selectedAddressId) : ""}
                onChange={(e) => handleAddressChange(e.target.value)}
              >
                <option value="">Choose an address</option>
                {deliveryAddresses.map((addr) => (
                  <option key={addr.id} value={addr.id}>
                    {addr.address} (Shipping: UGX{" "}
                    {Utils.moneyFormat(addr.shipping_cost)})
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Street, Apartment, Unit No."
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Full Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Phone (+CountryCode)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <textarea
              className="form-control mb-3"
              placeholder="Order Notes (optional)"
              rows={3}
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-5">
          <div className="card border-0 shadow-sm p-4 rounded">
            <h4 className="fw-bold mb-4">Order Summary</h4>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span>UGX {Utils.moneyFormat(totalCartAmount.toString())}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Delivery:</span>
              <span>
                {order.delivery_method.toLowerCase() === "pickup"
                  ? "UGX 0.00"
                  : `UGX ${Utils.moneyFormat(order.delivery_amount)}`}
              </span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total:</span>
              <span>
                UGX{" "}
                {Utils.moneyFormat(
                  (
                    Utils.int_parse(order.payable_amount) +
                    Utils.int_parse(order.getTax(totalCartAmount.toString()))
                  ).toString()
                )}
              </span>
            </div>
            <button
              className="btn btn-primary btn-lg w-100 mt-4 shadow"
              onClick={handlePlaceOrderClick}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Your Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to place this order?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmSubmit}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </motion.div>
  );
};

export default CheckoutPage;
