import { FC, useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import { getCSSVariableValue } from "../../../_metronic/assets/ts/_utils";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";  
import { OrderModel } from "../../models/OrderModel"; // Adjust import as needed
import { useAuth } from "../../modules/auth";
import { http_get } from "../../services/Api";

const initChart = (chartSize = 70, chartLine = 11, chartRotate = 145) => {
  const el = document.getElementById("kt_card_widget_17_chart");
  if (!el) return;
  el.innerHTML = "";

  const options = {
    size: chartSize,
    lineWidth: chartLine,
    rotate: chartRotate,
  };

  const canvas = document.createElement("canvas");
  const span = document.createElement("span");
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.height = options.size;

  el.appendChild(span);
  el.appendChild(canvas);

  ctx?.translate(options.size / 2, options.size / 2);
  ctx?.rotate((-1 / 2 + options.rotate / 180) * Math.PI);
  const radius = (options.size - options.lineWidth) / 2;

  const drawCircle = (color: string, lineWidth: number, percent: number) => {
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2 * Math.min(Math.max(0, percent), 1), false);
    ctx.strokeStyle = color;
    ctx.lineCap = "round";
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };

  drawCircle("#E4E6EF", options.lineWidth, 1);
  drawCircle(getCSSVariableValue("--bs-primary"), options.lineWidth, 100 / 150);
  drawCircle(getCSSVariableValue("--bs-success"), options.lineWidth, 100 / 250);
};

const DashboardPage: FC = () => {
  const { currentUser } = useAuth();
  const [recentOrders, setRecentOrders] = useState<OrderModel[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await http_get("/orders", {});
        if (response.data) {
          setRecentOrders(response.data.map(OrderModel.fromJson).slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const statusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "badge bg-warning";
      case "processing":
        return "badge bg-info";
      case "completed":
        return "badge bg-success";
      case "canceled":
        return "badge bg-danger";
      case "failed":
        return "badge bg-dark";
      default:
        return "badge bg-secondary";
    }
  };

  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="fw-bold mb-4" style={{ color: "#114786" }}>
        Welcome, {currentUser?.name}
      </h1>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 text-center">
            <h4 className="fw-bold">Orders</h4>
            <p className="fs-1 fw-bold" style={{ color: "#f33d02" }}>
              {recentOrders.length}
            </p>
            <Link to="/admin/my-orders" className="btn btn-outline-primary w-100">
              View All Orders
            </Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 text-center">
            <h4 className="fw-bold">Account Info</h4>
            <p className="text-muted">Email: {currentUser?.email}</p>
            <p className="text-muted">
              Phone: {currentUser?.phone_number_1 ?? "Not provided"}
            </p>
            <Link to="/account" className="btn btn-outline-primary w-100">
              Manage Account
            </Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 text-center">
            <h4 className="fw-bold">Wishlist</h4>
            <p className="fs-1 fw-bold text-success">0</p>
            <Link to="/wishlist" className="btn btn-outline-primary w-100">
              View Wishlist
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="fw-bold mb-4">Recent Orders</h3>
        {recentOrders.length === 0 ? (
          <p className="text-muted">You have no recent orders.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td>
                      <span className={statusColor(order.getOrderStatus())}>
                        {order.getOrderStatus()}
                      </span>
                    </td>
                    <td>
                      UGX {parseFloat(order.payable_amount).toLocaleString()}
                    </td>
                    <td>
                      <Link to={`/admin/my-orders/${order.id}`} className="btn btn-sm btn-primary">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const DashboardWrapper: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.DASHBOARD" })}
      </PageTitle>
      <DashboardPage />
    </>
  );
};
