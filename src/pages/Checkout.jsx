// Checkout.jsx
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/Carrito';
import { useNavigate, Link } from 'react-router-dom'; 
import '../styles/checkout.css';
import '../styles/index.css';
import logo from '/plus-icon.png';

const Checkout = () => {
  const { carrito, actualizarCantidad, limpiarCarrito, ordenID } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); 
  const [ordenCompletada, setOrdenCompletada] = useState(false);

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.price * item.cantidad, 0).toFixed(2);
  };

  const handlePagar = () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    const confirmacion = window.confirm(`¿Estás seguro de realizar el pago para la Orden N° ${ordenID}?`);
    if (!confirmacion) return;

    alert(`¡Gracias por tu compra! Orden N°: ${ordenID}`);
    limpiarCarrito(); 
    setOrdenCompletada(true); 

    setTimeout(() => {
      navigate('/home'); 
    }, 2000); 
  };

  const handleCancelar = () => {
    alert('La compra ha sido cancelada. Regresando al menú principal...');
    navigate('/home'); 
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div>
      <header>
        <nav className="nav-container">
          <div className="nav-logo">
            <img src={logo} alt="Logo de la empresa" className="logo" />
          </div>
          <button className="hamburger" onClick={toggleMenu}>☰</button>
          <ul className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
            <li><Link to="/home">Principal</Link></li> 
            <li><Link to="/checkout">Mi carrito</Link></li> 
          </ul>
        </nav>
      </header>

      {ordenCompletada ? (
        <div className="order-success">
          <h2>¡Tu compra ha sido exitosa!</h2>
          <p>Gracias por tu compra. Te redirigiremos al inicio en breve...</p>
        </div>
      ) : (
        <div className="cart-container">
          <h2>Carrito de Compras - Orden N°: {ordenID}</h2>
          <div className="cart-header">
            <div>Producto</div>
            <div>Cantidad</div>
            <div>Precio</div>
          </div>

          <div className="cart-items">
            {carrito.length > 0 ? (
              carrito.map((item) => (
                <div className="cart-item" key={item.id}>
                  <span className="item-name">{item.title}</span>
                  <input
                    type="number"
                    className="item-quantity"
                    value={item.cantidad}
                    min="0"
                    onChange={(e) =>
                      actualizarCantidad(item.id, parseInt(e.target.value, 10))
                    }
                  />
                  <span className="item-price">${(item.price * item.cantidad).toFixed(2)}</span>
                </div>
              ))
            ) : (
              <p>Tu carrito está vacío.</p>
            )}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Total:</span>
              <span className="total-price">${carrito.length > 0 ? calcularTotal() : '0.00'}</span>
            </div>
            <div className="cart-buttons">
              <button className="checkout-button" onClick={handlePagar}>Pagar</button>
              <button className="cancel-button" onClick={handleCancelar}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;



