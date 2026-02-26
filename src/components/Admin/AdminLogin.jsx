import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔐 Hardcoded Admin Credentials
    if (email === "admin@gmail.com" && password === "12345") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin-dashboard");
    } else {
      alert("Invalid Admin Credentials ❌");
    }
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Admin Login 🔐</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Login</button>
        <button
          onClick={() => {
            localStorage.removeItem("isAdmin");
            navigate("/admin-login");
          }}
        >
          Logout
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;