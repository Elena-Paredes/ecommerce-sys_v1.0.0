import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* Importación de rutas */
import Home from "./pages/Home.jsx";
import PDP from "./pages/PDP.jsx";
import Checkout from "./pages/Checkout.jsx";
import CartProvider from './context/Carrito'; 

function App() {
  return (
    <CartProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/producto/:id" element={<PDP />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;


