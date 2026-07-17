import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

// Agregamos esta línea para silenciar la advertencia de Vite/ESLint
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }) => {
  // Inicializar estado desde LocalStorage si existe
  const [cart, setCart] = useState(() => {
    // Verificamos si estamos en el navegador para evitar errores de SSR si usaras framework
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("trexx_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Guardar en LocalStorage cada vez que cambie el carrito
  useEffect(() => {
    localStorage.setItem("trexx_cart", JSON.stringify(cart));
  }, [cart]);

  // --- MÉTODOS ---

  const addToCart = (product, quantity = 1, size = null) => {
    setCart((prevCart) => {
      // Buscamos si el producto YA existe (mismo ID y mismo Talle)
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedSize === size,
      );

      if (existingItemIndex >= 0) {
        // Si existe, actualizamos la cantidad
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        // Si no existe, lo agregamos nuevo
        return [...prevCart, { ...product, quantity, selectedSize: size }];
      }
    });
    setIsCartOpen(true); // Abrir carrito automáticamente al agregar
  };

  const removeFromCart = (id, size) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === id && item.selectedSize === size),
      ),
    );
  };

  const updateQuantity = (id, size, type) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id && item.selectedSize === size) {
          const newQuantity =
            type === "plus" ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: Math.max(1, newQuantity) }; // Mínimo 1
        }
        return item;
      }),
    );
  };

  const clearCart = () => setCart([]);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // --- DATOS DERIVADOS ---
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        setIsCartOpen,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
