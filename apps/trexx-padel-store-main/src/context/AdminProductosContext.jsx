import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS_DB } from "../data/products";

const AdminProductosContext = createContext();

export const useAdminProductos = () => {
  const context = useContext(AdminProductosContext);
  if (!context) {
    throw new Error(
      "useAdminProductos debe ser usado dentro de un AdminProductosProvider"
    );
  }
  return context;
};

export const AdminProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Cargar desde localStorage o inicializar con mock
    const loadProducts = () => {
      const stored = localStorage.getItem("trexx_admin_productos_v2");
      if (stored) {
        setProductos(JSON.parse(stored));
      } else {
        setProductos(PRODUCTS_DB);
        localStorage.setItem(
          "trexx_admin_productos_v2",
          JSON.stringify(PRODUCTS_DB)
        );
      }
      setCargando(false);
    };
    loadProducts();
  }, []);

  // Efecto para sincronizar con localStorage cuando cambian
  useEffect(() => {
    if (!cargando) {
      localStorage.setItem("trexx_admin_productos_v2", JSON.stringify(productos));
    }
  }, [productos, cargando]);

  const agregarProducto = (producto) => {
    const nuevoProducto = {
      ...producto,
      id: Date.now(), // ID temporal
      creado_en: new Date().toISOString(),
      actualizado_en: new Date().toISOString(),
    };
    setProductos((prev) => [...prev, nuevoProducto]);
  };

  const editarProducto = (id, productoActualizado) => {
    setProductos((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              ...productoActualizado,
              actualizado_en: new Date().toISOString(),
            }
          : p
      )
    );
  };

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const value = {
    productos,
    cargando,
    agregarProducto,
    editarProducto,
    eliminarProducto,
  };

  return (
    <AdminProductosContext.Provider value={value}>
      {children}
    </AdminProductosContext.Provider>
  );
};
