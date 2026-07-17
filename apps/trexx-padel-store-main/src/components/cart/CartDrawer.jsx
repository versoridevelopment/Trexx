import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* BACKDROP (Fondo oscuro) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />

          {/* DRAWER (Panel Lateral) */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#0a0a0a] z-[70] border-l border-white/10 flex flex-col shadow-2xl"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-black italic text-white uppercase tracking-wider flex items-center gap-2">
                <ShoppingBag size={20} className="text-trexx-red" /> Tu Carrito
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-white/50 hover:text-white p-1 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* LISTA DE ITEMS */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/20">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-white/40 space-y-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p className="uppercase tracking-widest text-sm">
                    Tu carrito está vacío
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-trexx-red font-bold underline hover:text-white transition-colors"
                  >
                    Volver a la tienda
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedSize}`}
                    className="flex gap-4 group"
                  >
                    {/* Imagen */}
                    <div className="w-20 h-24 bg-white/5 rounded-sm overflow-hidden flex-shrink-0 border border-white/5">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-white font-bold text-sm uppercase tracking-wide line-clamp-2">
                          {item.name}
                        </h3>
                        <div className="flex gap-3 text-[10px] text-white/50 uppercase mt-1 font-bold">
                          {item.selectedSize && (
                            <span>Talle: {item.selectedSize}</span>
                          )}
                          {/* Si quisieras mostrar color también, agrégalo al context */}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-white/10 rounded-sm">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.selectedSize,
                                "minus",
                              )
                            }
                            className="p-1 hover:bg-white/10 text-white/60 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-2 text-xs font-mono text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.selectedSize, "plus")
                            }
                            className="p-1 hover:bg-white/10 text-white/60 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-trexx-red font-mono font-bold text-sm">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Eliminar */}
                    <button
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-white/20 hover:text-red-500 transition-colors self-start p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* FOOTER (Totales y Checkout) */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#050505]">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white/60 text-xs uppercase tracking-widest">
                    Subtotal
                  </span>
                  <span className="text-white font-mono font-bold text-xl">
                    ${cartTotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-[10px] text-white/30 mb-6 text-center">
                  El costo de envío se calcula en el siguiente paso.
                </p>
                <button className="w-full bg-trexx-red text-white py-4 font-black italic uppercase tracking-widest hover:bg-red-700 transition-all flex items-center justify-center gap-2 group">
                  Iniciar Compra
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
