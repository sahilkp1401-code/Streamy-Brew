import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
 //import "../Auth.css";

const Login = ({ setUserId }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("userToken", res.data.token);
      localStorage.setItem("userName", res.data.result.name);
      localStorage.setItem("userId", res.data.result._id); // UserId save karo
      
      setUserId(res.data.result._id); // App.jsx nu cart refresh thase
      alert("Welcome Back! ☕");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login 🔐</h2>
        <form onSubmit={handleLogin}>
          <input className="auth-input" type="email" placeholder="Email Address" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <input className="auth-input" type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          <button className="auth-btn" type="submit">Login</button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;