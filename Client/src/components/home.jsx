import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Welcome to Our E-Commerce Store</h1>
        <p style={styles.text}>
          Discover amazing products at unbeatable prices!
        </p>
        <Link to="/products" style={styles.button}>
          Shop Now
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100vw', 
    height: '100vh', 
    margin: 0,
    padding: 0,
    background: 'linear-gradient(135deg, #fceabb, #f8b500)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: '#ffffffcc',
    padding: '50px 30px',
    borderRadius: '20px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    maxWidth: '600px',
    width: '90%',
  },
  heading: {
    fontSize: '2.8rem',
    marginBottom: '20px',
    color: '#333333',
  },
  text: {
    fontSize: '1.25rem',
    marginBottom: '30px',
    color: '#555555',
  },
  button: {
    display: 'inline-block',
    padding: '12px 30px',
    backgroundColor: '#ff6f61',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '30px',
    fontSize: '1.1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
};

export default Home;
