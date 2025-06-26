import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.REACT_APP_API_URL || "http://localhost:5000";
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/cart/getCart`)
      .then((response) => setCartItems(response.data))
      .catch((error) => console.log(error));
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (_id, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item._id === _id ? { ...item, quantity: parseInt(quantity) } : item
    );
    setCartItems(updatedCart);
  };

  const handleRemoveItem = (id) => {
    axios
      .delete(`${apiUrl}/api/cart/deleteCart/${id}`)
      .then(() => {
        const updatedCart = cartItems.filter((item) => item._id !== id);
        setCartItems(updatedCart);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p style={styles.text}> 🛒 Your cart is empty</p>
      )
       : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} style={styles.cartItem}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <label>
                Quantity:
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    handleQuantityChange(item._id, e.target.value)
                  }
                  style={styles.input}
                />
              </label>
              <button
                onClick={() => handleRemoveItem(item._id)}
                style={styles.removeButton}
              >
                Remove
              </button>
            </div>
          ))}
          <div style={styles.total}>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button
              style={styles.productButton}
              onClick={() => navigate("/products")}
            >
              Back to Products
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    padding: "20px",
    margin: "0 auto",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#333",
    textAlign: "center",
  },
  emptyText: {
    fontSize: "1.2rem",
    color: "#666",
    textAlign: "center",
  },

  cartItem: {
    borderBottom: "1px solid #ddd",
    padding: "15px 0",
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    alignItems: "center",
    gap: "10px",
  },

  input: {
    width: "60px",
    padding: "5px",
    marginLeft: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },

  total: {
    marginTop: "30px",
    textAlign: "right",
    fontSize: "1.5rem",
  },

  productButton: {
    marginTop: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "12px 25px",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  removeButton:{
    backgroundColor: "red",
  },
  text: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#555",
    backgroundColor: "#f8f8f8",  // Removed extra space before #
    padding: "20px 30px",
    textAlign: "center",         // Value should be in quotes
    border: "2px dashed #ccc",
    borderRadius: "12px",
    margin: "50px auto",
    width: "400px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  }
  
};

export default Cart;
