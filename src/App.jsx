import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Importación de rutas */
import Home from "./pages/Home.jsx";
import PDP from "./pages/PDP.jsx";
import Checkout from "./pages/Checkout.jsx";
import CartProvider from './context/Carrito'; // Proveedor del contexto del carrito

function App() {
  return (
    <CartProvider> {/* Envolviendo toda la app con CartProvider */}
      <Router>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="/producto/:id" element={<PDP />} />
          <Route path="checkout" element={<Checkout />} />
          {/*<Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />*/}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

