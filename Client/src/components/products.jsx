import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
 const apiUrl = import.meta.env.REACT_APP_API_URL || "http://localhost:5001";
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/products`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product._id}>
          <h2>{product.name}</h2>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "15px",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  cardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  name: {
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  price: {
    fontSize: "1.2rem",
    color: "#666",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default Products;
