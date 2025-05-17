import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 const apiUrl = import.meta.env.REACT_APP_API_URL || "http://localhost:5001";
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/products/${id}`
        );
        setProduct(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <button onClick={(addToCart) => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "5px",
    textAlign: "center",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  price: {
    fontSize: "1.5rem",
    color: "#007bff",
    marginBottom: "15px",
  },
  description: {
    fontSize: "1.2rem",
    color: "#666",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#218838",
  },
};

export default ProductDetails;

