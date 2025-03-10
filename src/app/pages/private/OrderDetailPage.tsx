import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { OrderModel } from "../../models/OrderModel";
import { http_get } from "../../services/Api";
import { toast } from "react-toastify";
import Utils from "../../services/Utils";

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // Fetch the order by ID using your API.
        const response = await http_get(`orders/${id}`, {});
        if (response.code !== 1) {
          throw new Error(response.message || "Failed to fetch order details.");
        }
        const fetchedOrder = OrderModel.fromJson(response.data);
        setOrder(fetchedOrder);
      } catch (err: any) {
        setError(err.toString());
        toast.error("Failed to load order details", { autoClose: 3000 });
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  // Optionally parse order items if JSON
  let itemsContent = "";
  if (order) {
    try {
      const items = JSON.parse(order.items);
      itemsContent = JSON.stringify(items, null, 2);
    } catch (e) {
      itemsContent = order.items;
    }
  }

  if (loading) {
    return (
      <motion.div className="container py-5 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2>Loading order details...</h2>
      </motion.div>
    );
  }

  if (error || !order) {
    return (
      <motion.div className="container py-5 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2>Error loading order details</h2>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div className="container py-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>
        &larr; Back to My Orders
      </button>
      <h1 className="mb-4 text-center" style={{ fontWeight: "bold", color: "#114786" }}>
        Order Details (ID: {order.id})
      </h1>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div style={{ border: "1px solid #ddd", padding: "1.5rem", borderRadius: 0, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <p><strong>Date:</strong> {order.created_at}</p>
            <p><strong>Status:</strong> {order.getOrderStatus()}</p>
            <p><strong>Total:</strong> UGX {order.order_total}</p>
            <p><strong>Payment Confirmation:</strong> {order.payment_confirmation || "Not confirmed"}</p>
            <p><strong>Delivery Method:</strong> {order.delivery_method}</p>
            <p><strong>Shipping Cost:</strong> UGX {order.delivery_amount}</p>
            <p><strong>Payable Amount:</strong> UGX {order.payable_amount}</p>
            <p><strong>Customer Name:</strong> {order.customer_name || "N/A"}</p>
            <p><strong>Email:</strong> {order.mail || "N/A"}</p>
            <p><strong>Phone:</strong> {order.customer_phone_number_1 || "N/A"}</p>
            <p>
              <strong>Address:</strong> {order.delivery_address_text} - {order.delivery_address_details}
            </p>
            <p><strong>Order Instructions:</strong></p>
            <pre style={{ background: "#f8f9fa", padding: "0.5rem" }}>{order.order_details}</pre>
            <p><strong>Items:</strong></p>
            <pre style={{ background: "#f8f9fa", padding: "0.5rem" }}>{itemsContent}</pre>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderDetailPage;
