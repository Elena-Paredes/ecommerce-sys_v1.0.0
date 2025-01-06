// Carrito.jsx
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [ordenID, setOrdenID] = useState(() => {
    const savedOrder = localStorage.getItem('ordenID');
    return savedOrder ? JSON.parse(savedOrder) : Date.now(); 
  });

  const [carrito, setCarrito] = useState(() => {
    const savedCart = localStorage.getItem('carrito');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const agregarProducto = (producto) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find((item) => item.id === producto.id);
      if (productoExistente) {
        return prevCarrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  const actualizarCantidad = (id, cantidad) => {
    setCarrito((prevCarrito) =>
      prevCarrito
        .map((item) =>
          item.id === id ? { ...item, cantidad } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const limpiarCarrito = () => {
    setCarrito([]); 
    localStorage.removeItem('carrito');
    const nuevaOrdenID = Date.now(); 
    setOrdenID(nuevaOrdenID);
    localStorage.setItem('ordenID', JSON.stringify(nuevaOrdenID)); 
  };

  useEffect(() => {
    if (carrito.length === 0) {
      localStorage.removeItem('carrito'); 
    } else {
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  }, [carrito]);

  return (
    <CartContext.Provider value={{ carrito, agregarProducto, actualizarCantidad, limpiarCarrito, ordenID }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;






