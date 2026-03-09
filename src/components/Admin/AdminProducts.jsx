import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, LogOut, Coffee } from "lucide-react";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const navigate = useNavigate();
  
  // Backend URL check karjo ke barobar che ke nahi
  const API_URL = "https://cafebackend-6gyr.onrender.com/api/product";

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) navigate("/admin-login");
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/all`);
      console.log("Fetched Products:", res.data); // Console ma check karva mate
      setProducts(res.data);
    } catch (err) { 
      console.error("Error fetching products:", err); 
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${API_URL}/delete/${id}`);
        fetchProducts();
      } catch (err) { 
        alert("Delete failed!"); 
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isAddMode) {
        await axios.post(`${API_URL}/add`, editData);
      } else {
        await axios.put(`${API_URL}/update/${editData._id}`, editData);
      }
      setEditData(null);
      setIsAddMode(false);
      fetchProducts();
    } catch (err) { 
      alert("Error saving product. Check if all fields are filled."); 
    }
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#f9fafb", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header Area */}
      <div style={styles.header}>
        <div>
          <h1 style={{ margin: 0, display: "flex", alignItems: "center", gap: "10px", color: "black" }}>
            <Coffee color="#2f31a8" /> Menu Management
          </h1>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button 
            onClick={() => { 
              setEditData({ name: "", price: "", category: "Coffee", image: "" }); 
              setIsAddMode(true); 
            }} 
            style={styles.addBtn}
          >
            <Plus size={18} /> Add Product
          </button>
          <button 
            onClick={() => { 
              localStorage.removeItem("isAdmin"); 
              navigate("/admin-login"); 
            }} 
            style={styles.logoutBtn}
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHead}>
              <th style={styles.th}>Product</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p) => (
                <tr key={p._id} style={styles.tableRow}>
                  <td style={styles.td}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <img src={p.image} alt={p.name} style={styles.productImg} />
                      <span style={{ fontWeight: "600" }}>{p.name || "No Name"}</span>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.categoryTag}>{p.category}</span>
                  </td>
                  <td style={styles.td}>
                    {/* Price display logic: Agar 'price' field backend ma nanu (p) che to p.price j avse */}
                    <strong style={{ color: "#111827" }}>₹ {p.price}</strong>
                  </td>
                  <td style={styles.td}>
                    <button 
                      onClick={() => { setEditData(p); setIsAddMode(false); }} 
                      style={styles.actionBtnEdit}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(p._id)} 
                      style={styles.actionBtnDelete}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {editData && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={{ marginBottom: "20px" }}>{isAddMode ? "New Product" : "Edit Product"}</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <input 
                type="text" 
                placeholder="Name" 
                value={editData.name} 
                onChange={(e) => setEditData({...editData, name: e.target.value})} 
                style={styles.input} 
                required 
              />
              <input 
                type="number" 
                placeholder="Price" 
                value={editData.price} 
                onChange={(e) => setEditData({...editData, price: e.target.value})} 
                style={styles.input} 
                required 
              />
              <input 
                type="text" 
                placeholder="Image URL" 
                value={editData.image} 
                onChange={(e) => setEditData({...editData, image: e.target.value})} 
                style={styles.input} 
                required 
              />
              <select 
                value={editData.category} 
                onChange={(e) => setEditData({...editData, category: e.target.value})} 
                style={styles.input}
              >
                <option value="Coffee">Coffee</option>
                <option value="Burger">Burger</option>
                <option value="Fries">Fries</option>
                <option value="Pizza">Pizza</option>
                <option value="Dessert">Dessert</option>
              </select>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button type="submit" style={styles.saveBtn}>Save Product</button>
                <button type="button" onClick={() => setEditData(null)} style={styles.cancelBtn}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// CSS Styles
const styles = {
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
  addBtn: { backgroundColor: "#6366f1", color: "white", padding: "10px 20px", border: "none", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontWeight: "600" },
  logoutBtn: { backgroundColor: "#fee2e2", color: "#ef4444", padding: "10px", border: "none", borderRadius: "10px", cursor: "pointer" },
  tableContainer: { backgroundColor: "white", borderRadius: "15px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  tableHead: { backgroundColor: "#f8fafc", textAlign: "left" },
  th: { padding: "15px", color: "#64748b", fontWeight: "600", borderBottom: "1px solid #f1f5f9" },
  td: { padding: "15px", borderBottom: "1px solid #f1f5f9", verticalAlign: "middle" },
  productImg: { width: "45px", height: "45px", borderRadius: "10px", objectFit: "cover" },
  categoryTag: { backgroundColor: "#e0e7ff", color: "#4338ca", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600" },
  actionBtnEdit: { backgroundColor: "#f0f9ff", color: "#0369a1", border: "none", padding: "8px", borderRadius: "8px", cursor: "pointer", marginRight: "8px" },
  actionBtnDelete: { backgroundColor: "#fff1f2", color: "#be123c", border: "none", padding: "8px", borderRadius: "8px", cursor: "pointer" },
  modalOverlay: { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 100 },
  modal: { backgroundColor: "white", padding: "30px", borderRadius: "20px", width: "400px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" },
  input: { padding: "12px", borderRadius: "10px", border: "1px solid #d1d5db", outline: "none" },
  saveBtn: { flex: 1, backgroundColor: "#6366f1", color: "white", padding: "12px", border: "none", borderRadius: "10px", fontWeight: "600", cursor: "pointer" },
  cancelBtn: { flex: 1, backgroundColor: "#f3f4f6", color: "#4b5563", padding: "12px", border: "none", borderRadius: "10px", fontWeight: "600", cursor: "pointer" }
};

export default AdminProducts;