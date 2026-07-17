import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  ChevronRight,
  AlertCircle,
  Zap,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 20 },
  },
};

const ProductDetailView = ({ product, isPreview = false }) => {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [zipCode, setZipCode] = useState("");
  const [shippingResult, setShippingResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [mainImage, setMainImage] = useState(product?.img || "");

  // Si el producto cambia (ej: por escritura en vivo en el preview), actualizar la imagen y resetear estados
  useEffect(() => {
    setMainImage(product?.img || "");
    setQuantity(1);
    setSelectedSize(null);
    setShippingResult(null);
    setZipCode("");
  }, [product?.id, product?.img]); // Solo resetear si cambia ID o la imagen base

  if (!product) {
    return (
      <div className="min-h-full bg-[#050505] flex flex-col items-center justify-center text-white relative overflow-hidden py-20 rounded-lg">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <AlertCircle size={48} className="text-trexx-red mb-4 relative z-10" />
        <h2 className="text-xl font-bold uppercase tracking-widest relative z-10">
          Esperando datos...
        </h2>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (isPreview) return; // Bloquear en preview
    
    const isApparel =
      product.category === "ropa" || product.category === "zapatillas";
    if (isApparel && !selectedSize) {
      alert("Por favor selecciona un talle.");
      return;
    }
    addToCart(product, quantity, selectedSize);
  };

  const calculateShipping = (e) => {
    e.preventDefault();
    if (isPreview) return; // Bloquear en preview
    
    if (zipCode.length < 4) return;
    setIsCalculating(true);
    setShippingResult(null);
    setTimeout(() => {
      setIsCalculating(false);
      const isLocal = zipCode.startsWith("1");
      setShippingResult({
        price: isLocal ? 4500 : 8900,
        days: isLocal ? "24-48hs" : "3-5 días hábiles",
        provider: "Andreani",
      });
    }, 1500);
  };

  const handleQuantity = (type) => {
    if (type === "minus" && quantity > 1) setQuantity(quantity - 1);
    if (type === "plus" && quantity < 10) setQuantity(quantity + 1);
  };

  const isApparel =
    product.category === "ropa" || product.category === "zapatillas";
  const features = product.features || [
    "Calidad Profesional",
    "Garantía Oficial",
    "Envío Asegurado",
  ];
  const description =
    product.description ||
    `Diseñado para la excelencia. El modelo ${product.name || 'Sin Nombre'} combina materiales de vanguardia.`;
  const displayGender =
    product.gender && product.gender.toLowerCase() !== "unisex"
      ? ` / ${product.gender}`
      : "";
      
  const displayPrice = product.price || 0;
  const displayInstallments = product.installments || 6;
  const hasStock = product.stock !== undefined ? product.stock > 0 : true;

  return (
    <div className={`bg-[#050505] overflow-hidden relative ${isPreview ? 'rounded-xl h-full pb-8' : 'min-h-screen pt-32 pb-20'}`}>
      {/* FONDO CON RUIDO Y GRADIENTES */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div
          className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-trexx-red/10 blur-[80px] md:blur-[120px] rounded-full mix-blend-screen"
          style={{ backgroundColor: `${product.color || '#333'}20` }}
        />
      </div>

      <div className={`mx-auto px-4 md:px-8 relative z-10 ${isPreview ? 'w-full' : 'max-w-[1200px]'}`}>
        {/* BREADCRUMBS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 text-[10px] md:text-xs text-white/40 font-mono uppercase tracking-widest overflow-hidden whitespace-nowrap mb-6 pt-4"
        >
          {!isPreview && (
            <>
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={10} />
              <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
              <ChevronRight size={10} />
            </>
          )}
          <span className="text-trexx-red font-bold truncate">
            {product.name || "NUEVO PRODUCTO"}
          </span>
        </motion.div>

        <div className={`grid grid-cols-1 ${isPreview ? '' : 'lg:grid-cols-2'} gap-8 lg:gap-24`}>
          {/* --- COLUMNA IZQUIERDA: IMAGEN --- */}
          <div className="relative">
            <motion.div
              initial={isPreview ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative aspect-[4/5] w-full bg-gradient-to-b from-white/5 to-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden flex items-center justify-center group shadow-2xl"
            >
              {/* Glow Central */}
              <div
                className="absolute inset-0 opacity-20 blur-[80px]"
                style={{ backgroundColor: product.color || "#333" }}
              />

              {mainImage ? (
                <img
                  src={mainImage}
                  alt={product.name}
                  className="relative z-10 w-[85%] h-[85%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="text-white/20 uppercase tracking-widest font-bold text-sm z-10 text-center px-4">
                  Sin Imagen<br />
                  <span className="text-[10px] font-normal">Sube una URL válida</span>
                </div>
              )}

              {/* Badge Stock Mejorado */}
              <div className="absolute top-4 left-4 z-20">
                <div className={`backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest border rounded flex items-center gap-2 shadow-lg ${hasStock ? 'bg-black/60 border-white/10' : 'bg-red-900/60 border-red-500/30'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${hasStock ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'}`}></div>
                  {hasStock ? 'Stock Disponible' : 'Agotado'}
                </div>
              </div>
            </motion.div>

            {/* Miniaturas (Simuladas en el preview si solo hay una imagen) */}
            <motion.div
              initial={isPreview ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide"
            >
              {[mainImage, mainImage, mainImage].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`w-16 h-16 md:w-20 md:h-20 bg-[#0a0a0a] border rounded-md flex-shrink-0 p-2 transition-all ${
                    mainImage === img && idx === 0
                      ? "border-trexx-red opacity-100 ring-1 ring-trexx-red/50"
                      : "border-white/10 opacity-50 hover:opacity-100 hover:border-white/30"
                  }`}
                >
                  {img ? (
                    <img
                      src={img}
                      className="w-full h-full object-contain"
                      alt={`Vista ${idx}`}
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5" />
                  )}
                </button>
              ))}
            </motion.div>
          </div>

          {/* --- COLUMNA DERECHA: INFO Y ACCIONES --- */}
          <motion.div
            className="flex flex-col h-full pt-2 md:pt-0"
            variants={containerVariants}
            initial={isPreview ? "visible" : "hidden"}
            animate="visible"
          >
            {/* Categoría */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 mb-2"
            >
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-bold text-trexx-red uppercase tracking-widest">
                {product.category || 'Categoría'} {displayGender}
              </span>
              {displayPrice > 300000 && (
                <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-bold text-yellow-500 uppercase tracking-widest flex items-center gap-1">
                  <Zap size={10} fill="currentColor" /> Premium
                </span>
              )}
            </motion.div>

            {/* Título */}
            <motion.h1
              variants={itemVariants}
              className={`font-black italic text-white tracking-tighter uppercase leading-[0.9] mb-6 ${isPreview ? 'text-4xl' : 'text-4xl md:text-6xl'}`}
            >
              {product.name || 'Sin Título'}
            </motion.h1>

            {/* Panel de Precio "Tarjeta de Lujo" */}
            <motion.div
              variants={itemVariants}
              className="bg-white/5 border border-white/10 rounded-lg p-5 mb-8 backdrop-blur-sm"
            >
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="text-xs text-white/40 uppercase tracking-widest block mb-1">
                    Precio Final
                  </span>
                  <span className="text-4xl font-mono text-white font-bold tracking-tighter">
                    ${displayPrice.toLocaleString("es-AR")}
                  </span>
                  {product.transferPrice && product.transferPrice < displayPrice && (
                    <div className="mt-1 text-xs text-green-400 font-bold uppercase tracking-wider">
                      Transf: ${product.transferPrice.toLocaleString("es-AR")}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold bg-trexx-red/20 text-trexx-red border border-trexx-red/30 px-2 py-1 rounded uppercase tracking-wider mb-1 inline-block">
                    Hasta {displayInstallments} Cuotas
                  </span>
                  <p className="text-xs text-white/60">
                    {displayInstallments} pagos de{" "}
                    <span className="text-white font-bold">
                      ${(displayPrice / displayInstallments).toFixed(0).toLocaleString("es-AR")}
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-white/70 text-sm md:text-base leading-relaxed mb-8 border-l-2 border-trexx-red/50 pl-4"
            >
              {description}
            </motion.p>

            {/* SELECTOR DE TALLE */}
            {isApparel && (
              <motion.div variants={itemVariants} className="mb-8">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1 h-1 bg-white rounded-full"></span>
                    Seleccionar Talle
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      disabled={isPreview}
                      className={`h-12 min-w-[50px] px-4 flex items-center justify-center rounded border text-sm font-bold transition-all duration-300 ${
                        selectedSize === size
                          ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
                          : "bg-black/40 text-white/50 border-white/10 hover:border-white hover:text-white"
                      } ${isPreview ? 'cursor-not-allowed opacity-70' : ''}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* --- ACCIONES DE COMPRA --- */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4 mb-10 bg-white/5 p-4 rounded-xl border border-white/10 relative"
            >
              {isPreview && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-20 flex items-center justify-center rounded-xl">
                  <span className="bg-black/80 px-3 py-1 rounded text-white/50 text-[10px] font-bold tracking-widest uppercase border border-white/10">
                    Acciones Deshabilitadas en Preview
                  </span>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                <div className="flex items-center justify-between border border-white/20 h-14 w-full sm:w-40 bg-black rounded-lg px-2">
                  <button
                    onClick={() => handleQuantity("minus")}
                    className="w-10 h-full flex items-center justify-center text-white/50 hover:text-white transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-white font-mono font-bold text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantity("plus")}
                    className="w-10 h-full flex items-center justify-center text-white/50 hover:text-white transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <motion.button
                  onClick={handleAddToCart}
                  whileHover={isPreview ? {} : { scale: 1.02 }}
                  whileTap={isPreview ? {} : { scale: 0.95 }}
                  className="flex-1 h-14 flex items-center justify-center gap-3 text-white font-black italic uppercase tracking-widest rounded-lg shadow-[0_0_30px_rgba(220,38,38,0.4)] overflow-hidden relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-trexx-red to-red-900 transition-all group-hover:brightness-110"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                  <span className="relative z-10 flex items-center gap-3">
                    <ShoppingBag size={20} className="mb-1" />
                    {hasStock ? 'Añadir al Carrito' : 'Sin Stock'}
                  </span>
                </motion.button>
              </div>
            </motion.div>

            {/* ESPECIFICACIONES & GARANTÍA */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="border border-white/10 rounded-lg p-6 bg-gradient-to-br from-white/5 to-transparent">
                <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
                  <Star size={14} className="text-trexx-red" /> Highlights
                </h4>
                <ul className="grid grid-cols-1 gap-3">
                  {features.map((feature, i) => (
                    <li
                      key={i}
                      className="text-white/70 text-sm flex items-start gap-3 group"
                    >
                      <div className="mt-1.5 min-w-[6px] h-[6px] border border-trexx-red rounded-full group-hover:bg-trexx-red transition-colors"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-4 text-[10px] text-white/40 uppercase tracking-wider font-bold pt-2 justify-center md:justify-start">
                <div className="flex items-center gap-2 px-3 py-2 border border-white/5 rounded-full hover:border-white/20 transition-colors cursor-help">
                  <ShieldCheck size={14} /> Garantía Oficial
                </div>
                <div className="flex items-center gap-2 px-3 py-2 border border-white/5 rounded-full hover:border-white/20 transition-colors cursor-help">
                  <RotateCcw size={14} /> Devolución Gratis
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
