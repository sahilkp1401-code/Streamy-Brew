import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminOrders from "./components/Admin/AdminOrders"; 
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminProducts from "./components/Admin/AdminProducts";
import Login from "./pages/Login"; 
import Signup from "./pages/Signup";

function App() {
  // 🔐 User login che ke nahi e check karo
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "guest");

  // 🛒 Cart state - user login hoy to tene alag key thi fetch karse
  const [cart, setCart] = useState(() => {
    const cartKey = `cart_${userId}`;
    const savedCart = localStorage.getItem(cartKey);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 🔄 Jyare pan user login/logout thai tyare cart refresh thavu joie
  useEffect(() => {
    const currentUserId = localStorage.getItem("userId") || "guest";
    setUserId(currentUserId);
    
    const cartKey = `cart_${currentUserId}`;
    const savedCart = localStorage.getItem(cartKey);
    setCart(savedCart ? JSON.parse(savedCart) : []);
  }, [userId]);

  // 💾 Cart ma kai pan badlav thai to e specific user ni key sathe save thase
  useEffect(() => {
    const cartKey = `cart_${userId}`;
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart, userId]);

  return (
    <BrowserRouter>
      {/* User change thai tyare Navbar refresh thava mate key muki shakay */}
      <Navbar cartCount={cart.length} setUserId={setUserId} />
      <Routes>
        <Route path="/login" element={<Login setUserId={setUserId} />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
        
        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-orders" element={<AdminOrders />} />
        <Route path="/admin-products" element={<AdminProducts />} />
        
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;