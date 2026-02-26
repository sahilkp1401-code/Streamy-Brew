import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: localStorage.getItem("userName") || "",
    mobile: "",
    address: ""
  });

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.qty || 1),
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
 
    if (!form.name || !form.mobile || !form.address) {
      alert("Please fill all details 📋");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty! 🛒");
      return;
    }

    const options = {
      key: "rzp_test_SJuzfa2teLVFp1",
      amount: total * 100, 
      currency: "INR",
      name: "Cafe App ",
      description: "Food Order Payment",

      handler: function (response) {
        console.log("Payment ID:", response.razorpay_payment_id);
        alert("Payment Successful 🎉");

      
        setCart([]);
        localStorage.removeItem(`cart_${localStorage.getItem("userId") || "guest"}`);

        
        navigate("/");
      },

      prefill: {
        name: form.name,
        contact: form.mobile,
      },

      theme: {
        color: "#ffb347",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="checkout-container">
      <h1>Checkout 🧾</h1>

      <div className="checkout-card">
        <input
          name="name"
          value={form.name}
          placeholder="Your Full Name"
          onChange={handleChange}
          className="auth-input"
        />

        <input
          name="mobile"
          placeholder="Mobile Number"
          onChange={handleChange}
          className="auth-input"
          maxLength="10"
        />

        <textarea
          name="address"
          placeholder="Delivery Address"
          onChange={handleChange}
          className="auth-input"
          rows="3"
        />

        <div className="total-box">
          <h2>Total Amount: ₹ {total}</h2>
        </div>

        <button className="auth-btn" onClick={placeOrder}>
          Pay Now 💳
        </button>
      </div>
    </div>
  );
};

export default Checkout;