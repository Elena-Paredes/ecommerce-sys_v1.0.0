import React, { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/Carrito'; 
import '../styles/index.css';
import logo from '/plus-icon.png';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [productos, setProductos] = useState([]);
  const { agregarProducto } = useContext(CartContext); 
  const navigate = useNavigate();
  const dropdownRef = useRef(null); 

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const fetchProductos = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  };

  useEffect(() => {
    fetchProductos(); 
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const productosPorCategoria = (categoria) =>
    productos.filter((producto) => producto.category === categoria);

  return (
    <div>
      <header>
        <nav>
          <div className="nav-logo">
            <img src={logo} alt="Logo de la empresa" className="logo" />
          </div>
          <button className="hamburger" onClick={toggleMenu}>
            ☰
          </button>
          <ul className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
            <li><a href="/">Principal</a></li>
            <li className="dropdown" ref={dropdownRef}>
              <a href="#" onClick={toggleDropdown} className="dropbtn">Productos</a>
              <ul className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                <li><a href="#ropa-dama">Ropa de Dama</a></li>
                <li><a href="#ropa-caballero">Ropa de Caballero</a></li>
                <li><a href="#joyeria">Joyería</a></li>
                <li><a href="#electronicos">Electrónica</a></li>
              </ul>
            </li>
            <li>
              <a href="#" onClick={() => navigate('/checkout')}>Mi carrito</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* CARRUSEL */}
      <div className="hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1>Varieté Market</h1>
          <p>La variedad que buscas, con la calidad que mereces</p>
          <a href="#" className="cta-button">
            ¡Conócenos!
          </a>
        </div>
      </div>

      {/* SOBRE NOSOTROS */}
      <section className="about-us">
        <h1>Sobre nosotros</h1>
        <h3>Descubre lo que necesitas, cuando quieras</h3>
        <div className="about-us-container">
          <div className="about-us-item">
            <h4>Nuestros Productos</h4>
            <p>
              En Varieté Market, ofrecemos una amplia variedad de productos para satisfacer todas tus
              necesidades. Desde tecnología innovadora hasta moda de tendencia y accesorios únicos,
              garantizamos calidad, estilo y comodidad en cada compra.
            </p>
          </div>
          <div className="about-us-image">
            <img src="/Pills.png" alt="Syringe" />
          </div>
          <div className="about-us-item">
            <h4>Nuestra Sucursal</h4>
            <p>
              Nos comprometemos a ofrecer una experiencia de compra excepcional, con un catálogo diverso y
              productos de alta calidad. Nuestro equipo trabaja continuamente para garantizar:
            </p>
            <ul>
              <li>Atención al cliente personalizada y eficiente.</li>
              <li>Amplia selección de categorías y tendencias.</li>
              <li>Mejora continua en la experiencia de compra y satisfacción del cliente.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PRODUCTOS POR CATEGORÍA */}
      {["women's clothing", "men's clothing", "jewelery", "electronics"].map((categoria) => (
        <section
          key={categoria}
          className="services"
          id={
            categoria === "women's clothing"
              ? "ropa-dama"
              : categoria === "men's clothing"
              ? "ropa-caballero"
              : categoria === "jewelery"
              ? "joyeria"
              : "electronicos"
          }
        >
          <h2>
            {categoria === "women's clothing"
              ? "Ropa de Dama"
              : categoria === "men's clothing"
              ? "Ropa de Caballero"
              : categoria === "jewelery"
              ? "Joyería"
              : "Electrónicos"}
          </h2>
          <div className="services-container">
            {productosPorCategoria(categoria).map((producto) => (
              <div key={producto.id} className="service-item">
                <h3>{producto.title}</h3>
                <img src={producto.image} alt={producto.title} className="rounded-circle" />
                <p><strong>Precio:</strong> ${producto.price.toFixed(2)}</p>
                <button className="add-to-cart" onClick={() => {
                  console.log('Agregando al carrito:', producto); 
                  agregarProducto(producto);
                }}>
                  Agregar al carrito
                </button>
                <button className="read-more" onClick={() => navigate(`/producto/${producto.id}`)}>
                  Ver producto
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 Varieté Market. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;


