import { useState } from "react";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";

const Cart = ({ cart, setCart }) => {
  const [showCheckout, setShowCheckout] = useState(false);

 
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
  };

  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, qty: newQty } : item
    );
    setCart(updatedCart);
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.qty || 1),
    0
  );

  return (
    <div className="cart-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 className="menu-title" style={{ margin: 0, textAlign: 'left' }}>Your Cart 🛒</h1>
        <Link to="/menu" style={{ color: '#ffb347', textDecoration: 'none', fontWeight: '600' }}>
          ← Back to Menu
        </Link>
      </div>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2 style={{ opacity: 0.7 }}>No Prudct Added</h2>
          <Link to="/menu">
            <button className="add-btn" style={{ marginTop: '20px', padding: '12px 30px' }}>
              Order Now 🍔
            </button>
          </Link>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="item-details">
                <h3 style={{ color: '#ffb347' }}>{item.name}</h3>
                <p style={{ opacity: 0.8 }}>Price: ₹ {item.price}</p>
                
                {/* Quantity Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' }}>
                  <button 
                    onClick={() => updateQty(item._id, (item.qty || 1) - 1)}
                    style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid #ffb347', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' }}
                  > - </button>
                  <span style={{ fontWeight: '600', fontSize: '18px' }}>{item.qty || 1}</span>
                  <button 
                    onClick={() => updateQty(item._id, (item.qty || 1) + 1)}
                    style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid #ffb347', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' }}
                  > + </button>
                </div>
              </div>

              <button 
                className="remove-btn" 
                onClick={() => removeFromCart(item._id)}
                style={{ background: 'transparent', color: '#ff4d4d', border: '1px solid #ff4d4d', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', transition: '0.3s' }}
                onMouseOver={(e) => { e.target.style.background = '#ff4d4d'; e.target.style.color = '#000'; }}
                onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#ff4d4d'; }}
              >
                Remove 🗑️
              </button>
            </div>
          ))}

          <div style={{ marginTop: '40px', textAlign: 'right', animation: 'fadeIn 1s ease' }}>
            <h2 style={{ marginBottom: '20px' }}>Total Amount: <span style={{ color: '#ffb347' }}>₹ {total}</span></h2>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                <Link to="/menu">
                    <button className="filter-buttons" style={{ border: '1px solid #ffb347', color: '#ffb347', padding: '10px 20px', borderRadius: '30px', background: 'transparent', cursor: 'pointer' }}>
                        Add More
                    </button>
                </Link>
                <button className="checkout-btn" onClick={() => setShowCheckout(true)}>
                    Proceed to Checkout
                </button>
            </div>
          </div>
        </>
      )}

      {showCheckout && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowCheckout(false)}> ✖ </button>
            <Checkout cart={cart} setCart={setCart} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;