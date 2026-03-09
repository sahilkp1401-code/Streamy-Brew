import { useEffect, useState } from "react";
import axios from "axios";

// Props ma cart ane setCart lidha che
const Menu = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://cafebackend-6gyr.onrender.com/api/product/all");
      setProducts(res.data);
    } catch (error) {
      console.log("Error fetching products", error);
    }
  };

  // Add to Cart logic jethi local state ane localStorage banne update thay
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      // Check karo ke item cart ma pehle thi che ke nahi
      const existingItem = prevCart.find((item) => item._id === product._id);

      if (existingItem) {
        // Jo hoy to qty vadharo
        return prevCart.map((item) =>
          item._id === product._id 
            ? { ...item, qty: (item.qty || 1) + 1 } 
            : item
        );
      }
      // Jo na hoy to navi item add karo
      return [...prevCart, { ...product, qty: 1 }];
    });
    
    alert(`${product.name} added to cart 🛒`);
  };

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((item) => item.category === filter);

  return (
    <div className="menu-container">
      <h1 className="menu-title">Our Menu 🍽️</h1>

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("coffee")}>Coffee</button>
        <button onClick={() => setFilter("burger")}>Burger</button>
        <button onClick={() => setFilter("fries")}>Fries</button>
        <button onClick={() => setFilter("pizza")}>Pizza</button>
        <button onClick={() => setFilter("dessert")}>Dessert</button>
      </div>

      <div className="menu-grid">
        {filteredProducts.map((product) => (
          <div key={product._id} className="menu-card">
            <img
              src={product.image}
              alt={product.name}
              className="menu-image"
            />
            <h3>{product.name}</h3>
            <p>₹ {product.price}</p>

            <button
              className="add-btn"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;