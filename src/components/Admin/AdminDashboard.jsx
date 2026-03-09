import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Package, ShoppingBag, LogOut, TrendingUp, DollarSign } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from "recharts";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/admin-login");
    }
    fetchOrders();
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://cafebackend-6gyr.onrender.com/api/order/all");
      const data = res.data;
      setOrders(data);

      const monthlyData = {};
      data.forEach((order) => {
        const month = new Date(order.createdAt).toLocaleString("default", { month: "short" });
        monthlyData[month] = (monthlyData[month] || 0) + order.totalAmount;
      });

      const formattedData = Object.keys(monthlyData).map((month) => ({
        month,
        revenue: monthlyData[month],
      }));

      setChartData(formattedData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

  return (
    <div style={{ padding: "40px", backgroundColor: "#f0f2f5", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header Section */}
      <div style={styles.header}>
        <div>
          <h1 style={{ margin: 0, fontSize: "28px", color: "#1a202c" }}>Admin Overview</h1>
          <p style={{ color: "#718096", marginTop: "5px" }}>Welcome back! Here is what's happening today.</p>
        </div>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Navigation Shortcuts */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>
        <button onClick={() => navigate("/admin-products")} style={{ ...styles.navBtn, backgroundColor: "#4f46e5" }}>
          <Package size={20} /> Manage Products
        </button>
        <button onClick={() => navigate("/admin")} style={{ ...styles.navBtn, backgroundColor: "#0891b2" }}>
          <ShoppingBag size={20} /> View Orders
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "25px", marginBottom: "40px" }}>
        <div style={{ ...styles.card, borderLeft: "6px solid #4f46e5" }}>
          <div style={styles.cardIconBox}><ShoppingBag color="#4f46e5" /></div>
          <div>
            <p style={styles.cardLabel}>Total Orders</p>
            <h2 style={styles.cardValue}>{orders.length}</h2>
          </div>
        </div>
        
        <div style={{ ...styles.card, borderLeft: "6px solid #10b981" }}>
          <div style={styles.cardIconBox}><DollarSign color="#10b981" /></div>
          <div>
            <p style={styles.cardLabel}>Total Revenue</p>
            <h2 style={styles.cardValue}>₹ {totalRevenue.toLocaleString()}</h2>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div style={styles.chartContainer}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "25px" }}>
          <TrendingUp color="#4f46e5" />
          <h3 style={{ margin: 0, color: "#2d3748" }}>Monthly Revenue Analysis</h3>
        </div>
        <div style={{ width: "100%", height: 350 }}>
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf2f7" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#718096" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#718096" }} />
              <Tooltip 
                cursor={{ fill: "#f7fafc" }}
                contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
              />
              <Bar dataKey="revenue" radius={[6, 6, 0, 0]} barSize={40}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#6366f1" : "#818cf8"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#ef4444",
    color: "white",
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.3s",
  },
  navBtn: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px 24px",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  },
  card: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
  },
  cardIconBox: {
    backgroundColor: "#f8fafc",
    padding: "15px",
    borderRadius: "12px",
  },
  cardLabel: {
    margin: 0,
    color: "#718096",
    fontSize: "14px",
    fontWeight: "500",
  },
  cardValue: {
    margin: "5px 0 0 0",
    fontSize: "24px",
    color: "#1a202c",
    fontWeight: "700",
  },
  chartContainer: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.04)",
  }
};

export default AdminDashboard;