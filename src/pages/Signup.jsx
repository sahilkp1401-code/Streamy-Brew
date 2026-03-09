import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://cafebackend-cz00.onrender.com/api/auth/register", formData);
      alert("Account Created! 🚀 Please Login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign Up ☕</h2>
        <form onSubmit={handleSignup}>
          <input className="auth-input" type="text" placeholder="Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          <input className="auth-input" type="email" placeholder="Email Address" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <input className="auth-input" type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          <button className="auth-btn" type="submit">Create Account</button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;