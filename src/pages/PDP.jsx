// PDP.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import { CartContext } from '../context/Carrito'; 
import axios from 'axios';
import '../styles/producto.css';
import logo from '/plus-icon.png';

const Producto = () => {
  const { id } = useParams(); // ID de los productos
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(0); 
  const navigate = useNavigate();

  const { carrito, agregarProducto, actualizarCantidad } = useContext(CartContext); 

  const fetchProducto = async () => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProducto(response.data);
    } catch (error) {
      console.error('Error al cargar el producto:', error);
    }
  };

//Actualización en tiempo real del carrito, si no hay nada 0. 
  const sincronizarCantidad = () => {
    const productoEnCarrito = carrito.find((item) => item.id === parseInt(id));
    setCantidad(productoEnCarrito ? productoEnCarrito.cantidad : 0); 
  };

  const handleAgregarAlCarrito = () => {
    if (!producto) return;
    if (cantidad > 0) {
      const productoEnCarrito = carrito.find((item) => item.id === parseInt(id));
      if (productoEnCarrito) {
        // Se ctualiza la cantidad seleccionada
        actualizarCantidad(parseInt(id), cantidad);
      } else {
        // Agregar el producto con la cantidad seleccionada si está vacio el carrito
        agregarProducto({
          id: producto.id,
          title: producto.title,
          price: producto.price,
          image: producto.image,
          cantidad,
        });
      }
      alert(`Se actualizó el carrito con ${cantidad} ${producto.title}(s).`);
    } else {
      alert(`Selecciona una cantidad mayor a 0 para agregar al carrito.`);
    }
  };

  const incrementarCantidad = () => setCantidad(cantidad + 1);

  const decrementarCantidad = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };

  useEffect(() => {
    fetchProducto();
  }, [id]);

  useEffect(() => {
    sincronizarCantidad(); 
  }, [carrito]);

  return (
    <div>
      <header>
        <nav>
          <div className="nav-logo">
            <img src={logo} alt="Logo de la empresa" className="logo" />
          </div>
          <ul className="nav-menu">
            <li><Link to="/home">Principal</Link></li> 
            <li><Link to="/checkout">Mi carrito</Link></li> 
          </ul>
        </nav>
      </header>

      <div className="producto-info-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', paddingTop: '80px' }}>
        <div className="producto-container">
          {producto ? (
            <div className="producto-box">
              <div className="producto-image-container">
                <img
                  src={producto.image || 'https://via.placeholder.com/300'}
                  alt={producto.title}
                  className="producto-image"
                />
              </div>
              <h2 className="producto-title">{producto.title}</h2>
              <div className="producto-info">
                <p>
                  <strong>Categoría:</strong> {producto.category.charAt(0).toUpperCase() + producto.category.slice(1)}
                </p>
                <p>
                  <strong>Descripción:</strong> {producto.description}
                </p>
                <p>
                  <strong>Precio:</strong> ${producto.price.toFixed(2)}
                </p>
              </div>

              <div className="product-counter-container">
                <p><strong>Selecciona la cantidad:</strong></p>
                <button className="counter-button" onClick={decrementarCantidad}>-</button>
                <span className="counter-display">{cantidad}</span>
                <button className="counter-button" onClick={incrementarCantidad}>+</button>
              </div>

              <button className="cta-button mt-3" onClick={handleAgregarAlCarrito}>
                Agregar al carrito
              </button>
              <button className="back-button" onClick={() => navigate(-1)}>
                ← Volver
              </button>
            </div>
          ) : (
            <p className="loading">Cargando información del producto...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Producto;






