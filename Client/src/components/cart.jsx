import React, { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${"http://localhost:5000"}/api/cart`)
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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  itemPrice: {
    fontSize: "1.1rem",
    color: "#666",
  },
  removeButton: {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
  },
  removeButtonHover: {
    backgroundColor: "#cc0000",
  },
  total: {
    marginTop: "20px",
    textAlign: "right",
  },
  totalText: {
    fontSize: "1.5rem",
    color: "#333",
  },
  checkoutButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
  },
  checkoutButtonHover: {
    backgroundColor: "#218838",
  },
};

export default Cart;
