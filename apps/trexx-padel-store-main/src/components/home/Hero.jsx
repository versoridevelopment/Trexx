import { useEffect, useCallback, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Zap,
  Shield,
  Wind,
  Crown,
} from "lucide-react";

// --- DATOS ---
const SLIDES = [
  {
    id: 102, // ID real de la TREXX DRAGON
    brand: "TREXX",
    model: "DRAGON",
    tagline: "POTENCIA DE FUEGO",
    description:
      "Desata el caos en la pista. Balance alto y carbono 18K para rematadores que no negocian la fuerza.",
    specs: [
      { icon: <Zap size={16} />, label: "Potencia" },
      { icon: <Shield size={16} />, label: "18K" },
      { icon: <Wind size={16} />, label: "Alto" },
    ],
    type: "video",
    src: "/videos/dragon-presentation.mp4",
    color: "#dc2626",
  },
  {
    id: 103, // ID real de la GOLD PRO
    brand: "TREXX",
    model: "GOLD PRO MAX",
    tagline: "EL TOQUE MIDAS",
    description:
      "Lujo y rendimiento absoluto. Edición limitada con carbono 24K y núcleo híbrido para un tacto inigualables.",
    specs: [
      { icon: <Crown size={16} />, label: "Híbrido" },
      { icon: <Shield size={16} />, label: "24K Gold" },
      { icon: <Wind size={16} />, label: "Medio-Alto" },
    ],
    type: "video",
    src: "/videos/gold-presentation.mp4",
    color: "#D4AF37",
  },
];

const Hero = ({ current, setCurrent }) => {
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, [setCurrent]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  // Lógica de auto-avance
  useEffect(() => {
    let timer;
    const currentSlide = SLIDES[current];

    if (currentSlide.type === "image") {
      timer = setTimeout(() => {
        nextSlide();
      }, 6000);
    }
    return () => clearTimeout(timer);
  }, [current, nextSlide]);

  const handleVideoUpdate = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress || 0);
    }
  };

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-[#050505] flex items-center py-32 lg:py-48">
      {/* --- CAPA 1: TRANSICIÓN NEGRA --- */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent z-20 pointer-events-none"></div>

      {/* --- CAPA 0: FONDO --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

        {/* ORBE DE COLOR */}
        <AnimatePresence mode="wait">
          <motion.div
            key={SLIDES[current].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{ willChange: "opacity" }} // OPTIMIZACIÓN
            className="absolute inset-0 w-full h-full"
          >
            <div
              className="absolute top-1/2 -translate-y-1/2 -right-[40%] w-[800px] h-[800px] rounded-full blur-[150px] opacity-20"
              style={{ backgroundColor: SLIDES[current].color }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- CAPA 3: CONTENIDO --- */}
      <div className="max-w-7xl mx-auto px-6 w-full h-full relative z-30">
        <AnimatePresence mode="wait">
          <div
            key={SLIDES[current].id}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
          >
            {/* --- COLUMNA 1: TEXTO --- */}
            <div className="relative order-1 lg:order-2 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} // OPTIMIZACIÓN
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 mb-8"
              >
                <span className="h-[1px] w-12 bg-white/20"></span>
                <span className="text-xs font-bold tracking-[0.2em] text-white/50 uppercase">
                  Technical Specifications
                </span>
              </motion.div>

              <div className="mb-8 relative">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} // OPTIMIZACIÓN
                  transition={{ delay: 0.3 }}
                  className="text-white text-3xl md:text-4xl font-extrabold tracking-tight mb-2 uppercase"
                >
                  {SLIDES[current].brand}
                </motion.h2>

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} // OPTIMIZACIÓN
                  transition={{ delay: 0.4 }}
                  className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight text-white leading-[0.9]"
                >
                  {SLIDES[current].model}
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }} // OPTIMIZACIÓN
                transition={{ delay: 0.5 }}
                className="text-sm md:text-base font-bold tracking-widest uppercase mb-6"
                style={{ color: SLIDES[current].color }}
              >
                // {SLIDES[current].tagline}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }} // OPTIMIZACIÓN
                transition={{ delay: 0.6 }}
                className="text-white/60 text-base md:text-lg max-w-md leading-relaxed mb-10 font-sans"
              >
                {SLIDES[current].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} // OPTIMIZACIÓN
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4 mb-12"
              >
                {SLIDES[current].specs.map((spec, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center w-20 h-20 bg-white/5 border border-white/10 rounded-sm hover:bg-white/10 transition-colors"
                  >
                    <span
                      style={{ color: SLIDES[current].color }}
                      className="mb-2"
                    >
                      {spec.icon}
                    </span>
                    <span className="text-[9px] font-bold text-white uppercase tracking-wider text-center">
                      {spec.label}
                    </span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} // OPTIMIZACIÓN
                transition={{ delay: 0.8 }}
                className="flex items-center gap-8"
              >
                {/* --- BOTÓN COMPRAR LINKEADO --- */}
                <Link to={`/shop/product/${SLIDES[current].id}`}>
                  <button className="group relative px-8 py-4 bg-white text-black font-bold tracking-widest uppercase overflow-hidden hover:bg-gray-200 transition-colors">
                    <span className="relative flex items-center justify-center gap-3">
                      Comprar <ArrowRight size={18} />
                    </span>
                  </button>
                </Link>

                <div className="flex gap-4">
                  <button
                    onClick={prevSlide}
                    className="w-12 h-12 flex items-center justify-center border border-white/20 hover:border-white text-white transition-colors rounded-full"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-12 h-12 flex items-center justify-center border border-white/20 hover:border-white text-white transition-colors rounded-full"
                    style={{ borderColor: SLIDES[current].color }}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* --- COLUMNA 2: MEDIA (VIDEO) --- */}
            <div className="relative order-2 lg:order-1 flex flex-col items-center lg:items-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: -30 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }} // OPTIMIZACIÓN
                transition={{ duration: 0.8, ease: "circOut" }}
                className="relative z-10 w-full max-w-[500px] aspect-square lg:aspect-[4/5] bg-[#0a0a0a] rounded-sm overflow-hidden border border-white/5 shadow-2xl"
                style={{
                  boxShadow: `0 30px 60px -30px ${SLIDES[current].color}20`,
                  willChange: "transform, opacity", // OPTIMIZACIÓN
                }}
              >
                {SLIDES[current].type === "video" ? (
                  <video
                    ref={videoRef}
                    src={SLIDES[current].src}
                    autoPlay
                    muted
                    playsInline
                    onTimeUpdate={handleVideoUpdate}
                    onEnded={nextSlide}
                    className="w-full h-full object-cover opacity-90"
                  />
                ) : (
                  <img
                    src={SLIDES[current].src}
                    alt={SLIDES[current].model}
                    loading="lazy" // OPTIMIZACIÓN
                    className="w-full h-full object-cover opacity-90"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

                <div className="absolute top-6 left-6 text-white/10 font-mono text-xl tracking-widest select-none border border-white/10 px-2 py-1">
                  0{current + 1}
                </div>
              </motion.div>

              {/* Barra de Progreso */}
              {SLIDES[current].type === "video" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="w-full max-w-[500px] h-[2px] bg-white/5 mt-4 overflow-hidden relative z-20"
                >
                  <motion.div
                    className="h-full transition-all duration-100 ease-linear"
                    style={{
                      width: `${videoProgress}%`,
                      backgroundColor: SLIDES[current].color,
                    }}
                  />
                </motion.div>
              )}

              {/* ELEMENTO GRÁFICO */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }} // OPTIMIZACIÓN
                transition={{ delay: 0.5 }}
                className="absolute -z-10 top-6 -left-6 w-full h-full border border-white/5 rounded-sm hidden lg:block"
              />
            </div>
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
