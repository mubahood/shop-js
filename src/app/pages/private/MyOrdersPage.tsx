import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { OrderModel } from "../../models/OrderModel";
import { http_get } from "../../services/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OrderDetailsModal: React.FC<{
  order: OrderModel;
  onClose: () => void;
}> = ({ order, onClose }) => {
  let itemsContent = "";
  try {
    const items = JSON.parse(order.items);
    itemsContent = JSON.stringify(items, null, 2);
  } catch {
    itemsContent = order.items;
  }

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1000,
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          padding: "1.5rem",
          zIndex: 1001,
          width: "90%",
          maxWidth: "600px",
          border: "1px solid #ddd",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h3
          style={{
            borderBottom: "1px solid #ddd",
            paddingBottom: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          Order Details (ID: {order.id})
        </h3>
        <div style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
          <p>
            <strong>Date:</strong> {order.created_at}
          </p>
          <p>
            <strong>Status:</strong> {order.getOrderStatus()}
          </p>
          <p>
            <strong>Total:</strong> UGX {order.order_total}
          </p>
          <p>
            <strong>Delivery Method:</strong> {order.delivery_method}
          </p>
          <p>
            <strong>Shipping Cost:</strong> UGX {order.delivery_amount}
          </p>
          <p>
            <strong>Payable Amount:</strong> UGX {order.payable_amount}
          </p>
          <p>
            <strong>Payment Confirmation:</strong> {order.payment_confirmation}
          </p>
          <p>
            <strong>Customer Name:</strong> {order.customer_name || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {order.mail || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {order.customer_phone_number_1 || "N/A"}
          </p>
          <p>
            <strong>Address:</strong> {order.delivery_address_text} -{" "}
            {order.delivery_address_details}
          </p>
          <p>
            <strong>Order Instructions:</strong>
          </p>
          <pre style={{ background: "#f8f9fa", padding: "0.5rem" }}>
            {order.order_details}
          </pre>
          <p>
            <strong>Items:</strong>
          </p>
          <pre style={{ background: "#f8f9fa", padding: "0.5rem" }}>
            {itemsContent}
          </pre>
        </div>
        <div style={{ textAlign: "right", marginTop: "1rem" }}>
          <button className="btn btn-outline-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </motion.div>
    </>
  );
};

const MyOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderModel | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const ordersData = await OrderModel.fetchItems();
        setOrders(ordersData);
      } catch (err: any) {
        setError(err.toString());
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <motion.div
        className="container py-5 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2>Loading orders...</h2>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="container py-5 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2>Error loading orders</h2>
        <p>{error}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1
        className="mb-5 text-center"
        style={{ fontWeight: "bold", color: "#114786" }}
      >
        My Orders
      </h1>
      {orders.length === 0 ? (
        <div className="text-center">
          <p className="lead text-muted">You have not placed any orders yet.</p>
          <button className="btn btn-primary" onClick={() => navigate("/shop")}>
            Shop Now
          </button>
        </div>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div key={order.id} className="col-md-6 mb-4">
              <div
                className="p-3 border"
                style={{ borderRadius: 0, border: "1px solid #ddd" }}
              >
                <h5 style={{ marginBottom: "0.5rem", color: "#114786" }}>
                  Order #{order.id}
                </h5>
                <p className="mb-1">
                  <strong>Date:</strong> {order.created_at}
                </p>
                <p className="mb-1">
                  <strong>Status:</strong> {order.getOrderStatus()}
                </p>
                <p className="mb-1">
                  <strong>Total:</strong> UGX {order.order_total}
                </p>
                <div className="d-flex justify-content-between mt-2">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View Details
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => navigate(`/admin/my-orders/${order.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </motion.div>
  );
};

export default MyOrdersPage;
