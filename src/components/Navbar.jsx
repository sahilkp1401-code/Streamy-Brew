import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"
const Navbar = ({ cartCount }) => {
  const navigate = useNavigate();
  
  
  const user = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    alert("Logged out successfully! 👋");
    navigate("/login");
  };

  return (
    <div className="navbar" style={styles.navbar}>
      <div className="logo">
        <Link to="/">
          <img 
            src={logo}
            alt="Logo" 
            style={styles.logoImg} 
          />
        </Link>
      </div>

      <div className="nav-links" style={styles.navLinks}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/menu" style={styles.link}>Menu</Link>
        <Link to="/cart" style={styles.link}>Cart ({cartCount || 0})</Link>

        
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span style={{ color: "#f39c12", fontWeight: "bold" }}>Hi, {user}</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </div>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Signup</Link>
          </>
        )}

        <Link to="/admin-dashboard" style={styles.adminLink}>Admin</Link>
      </div>
    </div>
  );
};


const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 8%",
    backgroundColor: "rgba(18, 18, 18, 0.95)", 
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(201, 160, 80, 0.2)", 
    zIndex: 1000,
    transition: "0.4s ease"
  },
  logoImg: { 
    height: "150px",
    width: "150px",
    filter: "drop-shadow(0 0 10px rgba(201, 160, 80, 0.4))", 
    transition: "0.3s"
  },
  navLinks: { 
    display: "flex", 
    gap: "30px", 
    alignItems: "center" 
  },
  link: { 
    color: "#e0e0e0", 
    textDecoration: "none", 
    fontSize: "15px",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "1px",
    transition: "0.3s"
  },
  
  adminLink: { 
    color: "#c9a050", 
    textDecoration: "none", 
    fontWeight: "bold",
    border: "1px solid #c9a050",
    padding: "5px 15px",
    borderRadius: "2px",
    fontSize: "13px",
    transition: "0.3s"
  },
  logoutBtn: { 
    backgroundColor: "transparent", 
    color: "#ff4d4d", 
    border: "1px solid #ff4d4d", 
    padding: "6px 15px", 
    borderRadius: "2px", 
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "bold",
    textTransform: "uppercase",
    transition: "0.3s"
  }
};

export default Navbar;