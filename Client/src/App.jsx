import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/home";
import Products from "./components/products";
import Cart from "./components/cart";
import ProductDetails from "./components/productDetails";
import "./App.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
