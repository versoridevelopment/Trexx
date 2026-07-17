import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

// --- MOCK DATA INICIAL ---
const INITIAL_CART = [
  {
    id: 1,
    name: "Trexx Pro Attack",
    category: "PALA - POTENCIA",
    price: 320000,
    image:
      "https://images.unsplash.com/photo-1626246366036-248d2b99371d?q=80&w=800&auto=format&fit=crop",
    quantity: 1,
    size: null,
  },
  {
    id: 2,
    name: "Camiseta Técnica Red",
    category: "ROPA - HOMBRE",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1581655701329-1c5c56d77341?q=80&w=800&auto=format&fit=crop",
    quantity: 2,
    size: "L",
  },
  {
    id: 3,
    name: "Pack Medias Pro",
    category: "ACCESORIOS",
    price: 12000,
    image:
      "https://plus.unsplash.com/premium_photo-1664303498871-337cb1041935?q=80&w=800&auto=format&fit=crop",
    quantity: 1,
    size: "M",
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(INITIAL_CART);

  // Calcular subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100000 ? 0 : 5000; // Envío gratis si supera 100k
  const total = subtotal + shipping;

  // Manejadores
  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }),
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-trexx-bg pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ENCABEZADO */}
        <div className="flex items-end gap-4 mb-12 border-b border-white/10 pb-6">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white">
            TU <span className="text-trexx-red">EQUIPAMIENTO</span>
          </h1>
          <span className="text-white/40 font-bold text-lg mb-2 tracking-widest">
            ({cartItems.length} ITEMS)
          </span>
        </div>

        {cartItems.length === 0 ? (
          <EmptyCartState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* --- COLUMNA IZQUIERDA: LISTA DE PRODUCTOS --- */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdate={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* --- COLUMNA DERECHA: RESUMEN (STICKY) --- */}
            <div className="relative">
              <div className="sticky top-32">
                <div className="bg-[#0a0a0a] border border-white/10 p-8 shadow-2xl relative overflow-hidden group">
                  {/* Decoración */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-trexx-red/10 blur-2xl rounded-full"></div>

                  <h3 className="text-xl font-black italic text-white tracking-wider mb-6">
                    RESUMEN
                  </h3>

                  <div className="space-y-4 text-sm mb-8 border-b border-white/10 pb-8">
                    <div className="flex justify-between text-white/70">
                      <span>Subtotal</span>
                      <span className="font-mono">
                        ${subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Envío</span>
                      <span className="font-mono">
                        {shipping === 0 ? (
                          <span className="text-green-400">GRATIS</span>
                        ) : (
                          `$${shipping.toLocaleString()}`
                        )}
                      </span>
                    </div>
                    {/* Código Promo Input (Visual) */}
                    <div className="pt-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="CÓDIGO PROMO"
                          className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 text-xs focus:outline-none focus:border-trexx-red uppercase placeholder:text-white/20"
                        />
                        <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 text-xs font-bold transition-colors">
                          APLICAR
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mb-8">
                    <span className="text-white font-bold tracking-widest text-sm">
                      TOTAL
                    </span>
                    <span className="text-3xl font-black text-white italic tracking-tighter">
                      ${total.toLocaleString()}
                    </span>
                  </div>

                  <button className="w-full bg-trexx-red hover:bg-red-600 text-white font-black italic tracking-widest py-4 text-lg transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] flex items-center justify-center gap-2 group/btn">
                    FINALIZAR COMPRA{" "}
                    <ArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-2 text-white/30 text-[10px] uppercase tracking-widest">
                    <ShieldCheck size={12} /> Compra Segura y Encriptada
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- SUBCOMPONENTE: ITEM DE CARRITO ---
const CartItem = ({ item, onUpdate, onRemove }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
      className="bg-[#0f0f0f] border border-white/5 p-4 sm:p-6 flex flex-col sm:flex-row gap-6 group hover:border-white/10 transition-colors"
    >
      {/* Imagen */}
      <div className="w-full sm:w-32 h-32 bg-white/5 overflow-hidden relative flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-trexx-red text-[10px] font-bold tracking-widest uppercase mb-1">
                {item.category}
              </p>
              <h3 className="text-white font-bold text-lg sm:text-xl tracking-wide uppercase">
                {item.name}
              </h3>
              {item.size && (
                <p className="text-white/40 text-xs mt-1">
                  TALLE: <span className="text-white">{item.size}</span>
                </p>
              )}
            </div>

            {/* Botón Eliminar Desktop */}
            <button
              onClick={() => onRemove(item.id)}
              className="hidden sm:block text-white/30 hover:text-trexx-red transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-end mt-4 sm:mt-0">
          {/* Controles Cantidad */}
          <div className="flex items-center gap-4 bg-black/40 border border-white/10 px-3 py-1 w-fit">
            <button
              onClick={() => onUpdate(item.id, -1)}
              className="text-white/50 hover:text-white transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="text-white font-mono text-sm w-4 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdate(item.id, 1)}
              className="text-white/50 hover:text-white transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Precio */}
          <span className="text-white font-mono text-lg tracking-tight">
            ${(item.price * item.quantity).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Botón Eliminar Móvil */}
      <button
        onClick={() => onRemove(item.id)}
        className="sm:hidden absolute top-4 right-4 text-white/30 hover:text-trexx-red transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </motion.div>
  );
};

// --- SUBCOMPONENTE: CARRITO VACÍO ---
const EmptyCartState = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center border border-white/5 bg-white/[0.02]"
    >
      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 text-white/20">
        <ShoppingBag size={40} strokeWidth={1} />
      </div>
      <h2 className="text-2xl font-black italic text-white mb-2 tracking-wide">
        TU CARRITO ESTÁ VACÍO
      </h2>
      <p className="text-white/40 mb-8 max-w-md mx-auto">
        Parece que aún no has elegido tu arma para el próximo partido. Revisa
        nuestro catálogo de élite.
      </p>
      <Link
        to="/palas"
        className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors"
      >
        Ver Catálogo
      </Link>
    </motion.div>
  );
};

export default CartPage;
