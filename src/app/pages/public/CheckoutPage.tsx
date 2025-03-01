import React, { useState } from "react";
import { motion } from "framer-motion";
import { http_post } from "../../services/Api";
import Utils from "../../services/Utils";
import { OrderModel } from "../../models/OrderModel";
import { toast } from "react-toastify";
import { useAuth } from "../../modules/auth";

interface CheckoutPageProps {
  order: OrderModel;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ order }) => {
  const { cartItems, totalCartAmount } = useAuth();
  // Local form state for delivery & customer details
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

  const submitOrder = async () => {
    // Basic validation
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
    if (!phone.startsWith("+")) {
      setErrorMessage("Phone number should start with '+'.");
      return;
    }
    const confirmSubmit = window.confirm(
      "Are you sure you want to submit your order?"
    );
    if (!confirmSubmit) return;

    setErrorMessage("");
    setIsLoading(true);

    // Prepare delivery details from the form
    const delivery = {
      ...order.toJson(),
      delivery_address_text: deliveryRegion,
      delivery_address_details: streetAddress,
      mail: email,
      customer_name: customerName,
      customer_phone_number_1: phone,
      order_details: orderNotes,
      // If second phone number is not set, use primary
      customer_phone_number_2: order.customer_phone_number_2 || phone,
    };

    try {
      const resp = await http_post("orders-create", {
        items: JSON.stringify(cartItems),
        delivery: JSON.stringify(delivery),
      });
      if (resp.code !== 1) {
        setErrorMessage(resp.message);
        toast(`Failed: ${resp.message}`, { autoClose: 3000, type: "error" });
        setIsLoading(false);
        return;
      }
      // Update order with returned data
      const updatedOrder = OrderModel.fromJson(resp.data);
      if (updatedOrder.id < 1) {
        setErrorMessage(resp.message);
        toast("Failed to submit order", { autoClose: 3000, type: "error" });
        setIsLoading(false);
        return;
      }
      toast("Order submitted successfully!", {
        autoClose: 3000,
        type: "success",
      });
      //   history.push("/order-confirmation");
    } catch (error: any) {
      setErrorMessage(error.toString());
      toast(`Failed: ${error.toString()}`, { autoClose: 3000, type: "error" });
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
      <div className="row">
        {/* Left Column: Checkout Form */}
        <div className="col-lg-8 mb-4">
          <div className="card mb-3 shadow-sm">
            <div
              className="card-header"
              style={{ backgroundColor: "#114786", color: "#fff" }}
            >
              <h3 className="mb-0">Checkout</h3>
            </div>
            <div className="card-body">
              <p>
                Please confirm your order details before proceeding to payment.
              </p>
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
              <form>
                <div className="mb-3">
                  <label className="form-label">Delivery Region</label>
                  <input
                    type="text"
                    className="form-control"
                    value={deliveryRegion}
                    onChange={(e) => setDeliveryRegion(e.target.value)}
                    placeholder="Select a delivery region"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Street Address (Province, Unit Number)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="Enter your street address"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Primary phone number"
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
              </form>
            </div>
          </div>
        </div>
        {/* Right Column: Order Summary */}
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div
              className="card-header"
              style={{ backgroundColor: "#114786", color: "#fff" }}
            >
              <h4 className="mb-0">Order Summary</h4>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Items Total:</span>
                <span>
                  {"UGX "}
                  {Utils.moneyFormat(totalCartAmount.toString())}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax (13% VAT):</span>
                <span>
                  {"UGX "}
                  {Utils.moneyFormat(order.getTax(totalCartAmount.toString()))}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Delivery Cost:</span>
                <span>
                  {order.delivery_method.toLowerCase() === "pickup"
                    ? "UGX 0.00"
                    : "UGX " + Utils.moneyFormat(order.delivery_amount)}
                </span>
              </div>
              <hr />
              <div
                className="d-flex justify-content-between fw-bold"
                style={{ fontSize: "1.2rem" }}
              >
                <span>Total:</span>
                <span>
                  {"UGX "}
                  {Utils.moneyFormat(
                    (
                      Utils.int_parse(order.payable_amount) +
                      Utils.int_parse(order.getTax(totalCartAmount.toString()))
                    ).toString()
                  )}
                </span>
              </div>
              <button
                className="btn btn-lg mt-3"
                style={{
                  backgroundColor: "#114786",
                  borderColor: "#114786",
                  color: "#fff",
                  width: "100%",
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
