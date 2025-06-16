import React, { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
 const apiUrl = import.meta.env.REACT_APP_API_URL || "http://localhost:5000";
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/cart/getCart`)
      .then((response) => setCartItems(response.data))
      .catch((error) => console.log(error));
  }, []);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: parseInt(quantity) } : item
    );
    setCartItems(updatedCart);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p style={styles.text}>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <label>
                Quantity:
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                  style={styles.input}
                />
              </label>
              <button
                onClick={() => handleRemoveItem(item.id)}
                style={styles.removeButton}
              >
                Remove
              </button>
            </div>
          ))}
          <div style={styles.total}>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button style={styles.checkoutButton}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
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
  
  checkoutButton: {
    marginTop: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "12px 25px",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  
};

export default Cart;
