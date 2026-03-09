import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronRight, User, MapPin, Phone, Package, CreditCard } from "lucide-react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://cafebackend-6gyr.onrender.com/api/order/all");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/order/update/${id}`, { status: newStatus });
      fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "#f39c12";
      case "Confirmed": return "#3498db";
      case "Shipped": return "#9b59b6";
      case "Delivered": return "#2ecc71";
      case "Cancelled": return "#e74c3c";
      default: return "#7f8c8d";
    }
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#f4f7f6", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <h1 style={{ marginBottom: "30px", color: "#2c3e50", display: "flex", alignItems: "center", gap: "10px" }}>
        <Package size={32} color="#4f46e5" /> Admin Orders Panel
      </h1>

      {orders.length === 0 && <p style={{ textAlign: "center", color: "#7f8c8d" }}>No orders found yet.</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "20px" }}>
        {orders.map((order) => (
          <div key={order._id} style={styles.orderCard}>
            {/* Header: Status Badge */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
              <span style={{ fontWeight: "bold", color: "#7f8c8d" }}>ID: #{order._id.slice(-6)}</span>
              <span style={{ ...styles.badge, backgroundColor: getStatusColor(order.status) }}>{order.status}</span>
            </div>

            {/* Customer Info */}
            <div style={styles.infoSection}>
              <p style={styles.infoText}><User size={16} /> <strong>{order.customer.name}</strong></p>
              <p style={styles.infoText}><Phone size={16} /> {order.customer.mobile}</p>
              <p style={styles.infoText}><MapPin size={16} /> {order.customer.address}</p>
            </div>

            {/* Items */}
            <div style={styles.itemsBox}>
              <h4 style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#7f8c8d", textTransform: "uppercase" }}>Items</h4>
              {order.items.map((item, index) => (
                <div key={index} style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <span>{item.name} <small>x{item.qty}</small></span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}
              <div style={styles.totalRow}>
                <span>Total Amount</span>
                <span>₹ {order.totalAmount}</span>
              </div>
            </div>

            {/* Action Section */}
            <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
              <label style={{ fontWeight: "600", color: "#2c3e50" }}>Update Status:</label>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                style={styles.selectStatus}
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  orderCard: { backgroundColor: "white", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", border: "1px solid #edf2f7" },
  badge: { color: "white", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" },
  infoSection: { marginBottom: "15px", borderBottom: "1px solid #f1f1f1", paddingBottom: "10px" },
  infoText: { display: "flex", alignItems: "center", gap: "8px", margin: "5px 0", color: "#4a5568" },
  itemsBox: { backgroundColor: "#f8fafc", padding: "15px", borderRadius: "10px" },
  totalRow: { marginTop: "10px", paddingTop: "10px", borderTop: "1px dashed #cbd5e0", fontWeight: "bold", display: "flex", justifyContent: "space-between", color: "#2d3748" },
  selectStatus: { padding: "8px", borderRadius: "8px", border: "1px solid #cbd5e0", outline: "none", cursor: "pointer", flex: 1 }
};

export default AdminOrders;