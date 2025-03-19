import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { OrderModel } from "../../models/OrderModel";
import { http_get } from "../../services/Api";
import { toast } from "react-toastify";

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await http_get(`orders/${id}`, {});
        if (response.code !== 1) {
          throw new Error(response.message || "Failed to fetch order details.");
        }
        setOrder(OrderModel.fromJson(response.data));
      } catch (err: any) {
        setError(err.toString());
        toast.error("Failed to load order details", { autoClose: 3000 });
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  // Function to parse JSON safely
  const parseItems = (data: string) => {
    try {
      const items = JSON.parse(data);
      return Array.isArray(items) ? items : [];
    } catch {
      return [];
    }
  };

  if (loading) {
    return (
      <motion.div
        className="container py-5 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2>Loading order details...</h2>
      </motion.div>
    );
  }

  if (error || !order) {
    return (
      <motion.div
        className="container py-5 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2>Error loading order details</h2>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>
        &larr; Back to My Orders
      </button>
      <h1
        className="mb-4 text-center"
        style={{ fontWeight: "bold", color: "#114786" }}
      >
        Order Details (ID: {order.id})
      </h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>
                      <strong>Date:</strong>
                    </td>
                    <td>{order.created_at || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Status:</strong>
                    </td>
                    <td>{order.getOrderStatus()}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total:</strong>
                    </td>
                    <td>UGX {order.order_total || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Payment Confirmation:</strong>
                    </td>
                    <td>{order.payment_confirmation || "Not confirmed"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Delivery Method:</strong>
                    </td>
                    <td>{order.delivery_method || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Shipping Cost:</strong>
                    </td>
                    <td>UGX {order.delivery_amount || "0.00"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Payable Amount:</strong>
                    </td>
                    <td>UGX {order.payable_amount || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Customer Name:</strong>
                    </td>
                    <td>{order.customer_name || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Email:</strong>
                    </td>
                    <td>{order.mail || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Phone:</strong>
                    </td>
                    <td>{order.customer_phone_number_1 || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Address:</strong>
                    </td>
                    <td>
                      {order.delivery_address_text} -{" "}
                      {order.delivery_address_details}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Order Instructions:</strong>
                    </td>
                    <td>{order.order_details || "N/A"}</td>
                  </tr>
                </tbody>
              </table>

              {/* Order Items Section */}
              <h5 className="mt-4">Order Items:</h5>
              {parseItems(order.items).length > 0 ? (
                <ul className="list-group">
                  {parseItems(order.items).map((item: any, index: number) => (
                    <li key={index} className="list-group-item">
                      <strong>{item.name}</strong> - Quantity: {item.quantity},
                      Price: UGX {item.price}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No items found</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          .table {
            font-size: 16px;
            background: #fff;
          }
          .list-group-item {
            background: #f8f9fa;
            font-family: "Arial", sans-serif;
          }
        `}
      </style>
    </motion.div>
  );
};

export default OrderDetailPage;
