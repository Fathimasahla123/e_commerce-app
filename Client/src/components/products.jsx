import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/products`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleAddToCart = (product) => {
    axios
      .post(`${apiUrl}/api/cart`, { ...product, quantity: 1 })
      .then(() => navigate("/cart"))
      .catch((err) => console.log(err));
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Our Products</h1>
      <div style={styles.container}>
        {products.map((product) => (
          <div key={product._id} style={styles.card}>
            <h2 style={styles.name}>{product.name}</h2>
            <p style={styles.price}>${product.price}</p>
            <button
              style={styles.button}
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

const styles = {
  page: {
    padding: "40px 20px",
    background: "#f8f9fa",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: "center",
    fontSize: "2.5rem",
    marginBottom: "30px",
    color: "#333",
  },
  container: {
    width: '100vw', 
    height: '100vh',
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  name: {
    fontSize: "1.5rem",
    marginBottom: "10px",
    color: "#222",
  },
  price: {
    fontSize: "1.2rem",
    marginBottom: "15px",
    color: "#555",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#ff6f61",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
  },
};

export default Products;
