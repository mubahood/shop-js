import React, { useState, useEffect, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { http_post } from "../../services/Api";
import Utils from "../../services/Utils";
import { OrderModel } from "../../models/OrderModel";
import { toast } from "react-toastify";
import { useAuth } from "../../modules/auth";
import { useNavigate } from "react-router-dom";
import { DeliveryAddress } from "../../models/DeliveryAddress";

interface CheckoutPageProps {
  order: OrderModel;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ order }) => {
  const navigate = useNavigate();
  const { currentUser, clearCart, cartItems, totalCartAmount } = useAuth();

  // If user is not logged in, show a friendly prompt.
  if (!currentUser) {
    return (
      <motion.div
        className="container py-5 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 style={{ fontWeight: "bold" }}>Please Log In</h1>
        <p className="lead">
          You must be logged in to checkout. Please log in or create an account.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>
        </div>
      </motion.div>
    );
  }

  // Local form state for delivery & contact details.
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

  // Load delivery addresses from localStorage on mount.
  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const addresses = await DeliveryAddress.get_items();
        setDeliveryAddresses(addresses);
        if (addresses.length > 0 && !selectedAddressId) {
          // Default to first address.
          handleAddressChange(String(addresses[0].id));
        }
      } catch (err) {
        console.error("Failed to load delivery addresses:", err);
      }
    };
    loadAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When the dropdown value changes, update the order's delivery details.
  const handleAddressChange = (idStr: string) => {
    const id = parseInt(idStr, 10);
    setSelectedAddressId(id);
    const addressObj = deliveryAddresses.find((addr) => addr.id === id);
    if (addressObj) {
      setDeliveryRegion(addressObj.address);
      // Here we assume street address is same as address.
      setStreetAddress(addressObj.address);
      // Update order's delivery details.
      order.delivery_amount = addressObj.shipping_cost;
      order.delivery_address_text = addressObj.address;
      order.delivery_address_details = addressObj.address;
    }
  };

  const submitOrder = async () => {
    // Basic validation.
    if (
      !deliveryRegion ||
      !streetAddress ||
      !customerName ||
      !email ||
      !phone
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }
    if (!Utils.isValidMail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!phone.startsWith("+")) {
      setErrorMessage("Phone number should start with '+'.");
      return;
    }
    if (!window.confirm("Are you sure you want to submit your order?")) return;

    setErrorMessage("");
    setIsLoading(true);

    // Prepare delivery details.
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
      toast.success("Order submitted successfully!", { autoClose: 3000 });
      clearCart();
      navigate("/admin/my-order");
    } catch (error: any) {
      setErrorMessage(error.toString());
      toast.error(`Failed: ${error.toString()}`, { autoClose: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Page Header */}
      <div className="mb-5 text-center">
        <h1 style={{ fontWeight: "bold", color: "#114786" }}>Checkout</h1>
        <p className="text-muted">
          Review your details and confirm your order.
        </p>
      </div>
      <div className="row">
        {/* Left Column: Delivery & Contact Form */}
        <div className="col-md-7 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
              <div className="mb-3">
                <label className="form-label">Delivery Address</label>
                <select
                  className="form-select"
                  value={selectedAddressId ? String(selectedAddressId) : ""}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    handleAddressChange(e.target.value)
                  }
                >
                  <option value="">Select an address</option>
                  {deliveryAddresses.map((addr) => (
                    <option key={addr.id} value={addr.id}>
                      {addr.address} (Shipping: UGX{" "}
                      {Utils.moneyFormat(addr.shipping_cost)})
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Street Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  placeholder="Street, Province, Unit No."
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone number (include +)"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Order Details</label>
                <textarea
                  className="form-control"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Additional instructions or details"
                  rows={3}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        {/* Right Column: Order Summary */}
        <div className="col-md-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h4 style={{ fontWeight: "bold", color: "#114786" }}>
                Order Summary
              </h4>
              <div className="d-flex justify-content-between mb-3">
                <span>Items Total:</span>
                <span>UGX {Utils.moneyFormat(totalCartAmount.toString())}</span>
              </div>  
              <div className="d-flex justify-content-between mb-3">
                <span>Delivery Cost:</span>
                <span>
                  {order.delivery_method.toLowerCase() === "pickup"
                    ? "UGX 0.00"
                    : "UGX " + Utils.moneyFormat(order.delivery_amount)}
                </span>
              </div>
              <hr />
              <div
                className="d-flex justify-content-between fw-bold mb-3"
                style={{ fontSize: "1.3rem" }}
              >
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
                className="btn btn-lg w-100"
                style={{
                  backgroundColor: "#114786",
                  borderColor: "#114786",
                  color: "#fff",
                }}
                onClick={submitOrder}
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;
