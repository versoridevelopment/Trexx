import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Crosshair,
  ShieldCheck,
  Layers,
  Info,
} from "lucide-react";

// DATOS DEL PRODUCTO
const LAUNCH_PRODUCT = {
  id: 109,
  name: "SPREAD PRO",
  year: "2026",
  price: 365900,
  tagline: "DOMINA CADA ÁNGULO",
  specs: {
    balance: "Medio - Alto",
    type: "Lágrima",
    surface: "Rugosa Texturizada",
    core: "Pro Eva Soft",
    material: "Carbono Aluminizado 18K",
    profile: "Ataque / Control",
  },
  images: {
    main: "/images/NewRelease/spread-pro-studio.png",
    texture: "/images/NewRelease/spread-pro-texture.jpeg",
    bag: "/images/NewRelease/spread-pro-bag.jpeg",
  },
};

// --- VARIANTES DE ANIMACIÓN ---
const fadeInUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: customDelay },
  }),
};

const staggerContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.5,
    },
  },
};

// --- GENERADOR DE PARTÍCULAS OPTIMIZADO ---
const Particle = () => {
  const [values] = useState(() => ({
    x: Math.random() * 100,
    delay: Math.random() * 20,
    duration: Math.random() * 10 + 15,
    size: Math.random() * 4 + 1,
  }));

  return (
    <motion.div
      className="absolute rounded-full bg-white/20 mix-blend-screen pointer-events-none"
      style={{
        left: `${values.x}%`,
        bottom: "-10%",
        width: values.size,
        height: values.size,
        willChange: "transform, opacity",
      }}
      animate={{
        y: ["0vh", "-100vh"],
        opacity: [0, 0.4, 0],
      }}
      transition={{
        duration: values.duration,
        repeat: Infinity,
        delay: values.delay,
        ease: "linear",
      }}
    />
  );
};

// RECIBIMOS onImageLoad DESDE APP.JSX
const NewReleaseHero = ({ onImageLoad }) => {
  return (
    <section className="relative min-h-screen w-full bg-[#050505] overflow-hidden pt-32 pb-20 lg:pt-40 flex flex-col justify-center">
      {/* --- FONDO AMBIENTAL --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-90"></div>

        <motion.div
          style={{ willChange: "transform, opacity" }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[500px] bg-red-900/30 blur-[120px] rounded-full mix-blend-screen"
        />

        <motion.div
          style={{ willChange: "transform, opacity" }}
          initial={{ scale: 0.8, opacity: 0.2 }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-trexx-red/20 blur-[150px] rounded-full mix-blend-screen"
        />

        {[...Array(25)].map((_, i) => (
          <Particle key={i} />
        ))}
      </div>

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 1. COLUMNA IZQUIERDA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div
              variants={fadeInUpVariant}
              custom={0.1}
              className="inline-flex items-center gap-2 px-3 py-1 border border-trexx-red/50 bg-trexx-red/10 rounded-full mb-6 relative overflow-hidden"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-trexx-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-trexx-red"></span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-trexx-red uppercase relative z-10">
                New Release {LAUNCH_PRODUCT.year}
              </span>
            </motion.div>

            <motion.div variants={fadeInUpVariant} custom={0.2}>
              <h1 className="text-5xl md:text-7xl font-black italic text-white tracking-tighter uppercase leading-[0.9] mb-4 overflow-hidden relative pr-4">
                <motion.span
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "circOut", delay: 0.2 }}
                  className="block"
                >
                  {LAUNCH_PRODUCT.name}
                </motion.span>
              </h1>
              <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-[0.9] mb-4 overflow-hidden relative pr-4">
                <motion.span
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "circOut", delay: 0.3 }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-trexx-red to-red-800"
                >
                  PRO EDITION
                </motion.span>
              </h1>
            </motion.div>

            <motion.p
              variants={fadeInUpVariant}
              custom={0.4}
              className="text-white/60 text-sm md:text-base max-w-md mb-8 font-light"
            >
              Diseñada para la élite. La combinación perfecta entre la
              agresividad del carbono 18K y el control del núcleo Pro Eva Soft.
            </motion.p>

            <motion.div
              variants={fadeInUpVariant}
              custom={0.5}
              className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto"
            >
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-3xl font-mono font-bold text-white tracking-tight">
                  ${LAUNCH_PRODUCT.price.toLocaleString()}
                </span>
              </div>

              <Link
                to={`/shop/product/${LAUNCH_PRODUCT.id}`}
                className="w-full sm:w-auto"
              >
                <button className="group relative w-full sm:w-auto px-8 py-4 bg-white text-black font-black italic tracking-widest uppercase overflow-hidden transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(220,38,38,0.4)]">
                  <span className="relative flex items-center justify-center gap-3 z-10 transition-colors group-hover:text-trexx-red">
                    Comprar Ahora <ArrowRight size={18} />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-trexx-red/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                </button>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUpVariant}
              custom={0.6}
              className="mt-8 flex items-center gap-4 bg-white/5 p-3 rounded-lg border border-white/10 backdrop-blur-sm relative overflow-hidden"
            >
              <div className="w-10 h-10 rounded overflow-hidden bg-black z-10 relative">
                <img
                  src={LAUNCH_PRODUCT.images.bag}
                  alt="Funda"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col text-left z-10 relative">
                <span className="text-[10px] text-white/40 uppercase tracking-widest">
                  Incluye
                </span>
                <span className="text-xs font-bold text-white uppercase">
                  Funda Premium Térmica
                </span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 1, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-trexx-red/0 via-trexx-red/10 to-trexx-red/0"
              />
            </motion.div>
          </motion.div>

          {/* 2. COLUMNA CENTRAL: IMAGEN HERO FLOTANTE */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-4 order-1 lg:order-2 relative h-[500px] lg:h-[700px] flex items-center justify-center z-20"
          >
            <motion.div
              style={{ willChange: "transform" }}
              initial={{ scale: 0, opacity: 0, rotate: 0 }}
              whileInView={{ scale: 1, opacity: 0.8, rotate: 360 }}
              viewport={{ once: true }}
              transition={{
                scale: { duration: 1.5, ease: "circOut" },
                opacity: { duration: 1 },
                rotate: { duration: 60, repeat: Infinity, ease: "linear" },
              }}
              className="absolute w-[400px] h-[400px] lg:w-[550px] lg:h-[550px] border border-white/5 rounded-full"
            ></motion.div>
            <motion.div
              style={{ willChange: "transform" }}
              initial={{ scale: 0, opacity: 0, rotate: 0 }}
              whileInView={{ scale: 1, opacity: 0.6, rotate: -360 }}
              viewport={{ once: true }}
              transition={{
                scale: { duration: 1.5, ease: "circOut", delay: 0.2 },
                opacity: { duration: 1 },
                rotate: { duration: 70, repeat: Infinity, ease: "linear" },
              }}
              className="absolute w-[350px] h-[350px] lg:w-[500px] lg:h-[500px] border border-trexx-red/10 rounded-full border-dashed"
            ></motion.div>

            {/* FX: PALA FLOTANTE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 60, rotateX: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "circOut", delay: 0.2 }}
              className="relative z-20 w-auto h-[90%]"
            >
              <motion.img
                src={LAUNCH_PRODUCT.images.main}
                onLoad={onImageLoad} // <--- SEÑAL DE CARGA AQUÍ
                alt="TREXX SPREAD PRO 2026"
                className="w-full h-full object-contain drop-shadow-[0_35px_80px_rgba(220,38,38,0.5)]"
                style={{ willChange: "transform" }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 1, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>

          {/* 3. COLUMNA DERECHA: SPECS */}
          <div className="lg:col-span-3 order-3 flex flex-col gap-4 relative z-30">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="group relative h-36 w-full rounded-xl overflow-hidden border border-white/10 hover:border-trexx-red/50 transition-colors cursor-default shadow-2xl"
            >
              <div className="absolute inset-0">
                <img
                  src={LAUNCH_PRODUCT.images.texture}
                  alt="Carbon 18K"
                  className="w-full h-full object-cover opacity-50 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent"></div>
              </div>

              <div className="relative z-10 p-6 h-full flex flex-col justify-center">
                <ShieldCheck className="text-trexx-red mb-3" size={28} />
                <h3 className="text-white font-black text-xl leading-none uppercase italic tracking-tight">
                  CARBONO 18K
                </h3>
                <p className="text-white/70 text-xs mt-2 font-bold tracking-wider uppercase">
                  Aluminizado para máxima potencia.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-3"
            >
              <SpecItem
                label="Balance"
                value={LAUNCH_PRODUCT.specs.balance}
                icon={<Crosshair size={16} />}
              />
              <SpecItem
                label="Núcleo"
                value={LAUNCH_PRODUCT.specs.core}
                icon={<Layers size={16} />}
              />
              <SpecItem
                label="Superficie"
                value={LAUNCH_PRODUCT.specs.surface}
                icon={<Zap size={16} />}
              />
              <SpecItem
                label="Tipo"
                value={LAUNCH_PRODUCT.specs.type}
                icon={<Info size={16} />}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SpecItem = ({ label, value, icon }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, x: 30 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 100, damping: 15 },
      },
    }}
    className="flex items-center justify-between bg-white/[0.03] border border-white/10 p-4 rounded-lg hover:bg-white/[0.08] transition-all group"
  >
    <div className="flex items-center gap-4 relative z-10">
      <div className="text-white/40 group-hover:text-trexx-red transition-colors">
        {icon}
      </div>
      <span className="text-white/50 text-[10px] uppercase tracking-[0.2em] font-bold">
        {label}
      </span>
    </div>
    <span className="text-white text-sm font-black italic tracking-wider text-right relative z-10 uppercase">
      {value}
    </span>
  </motion.div>
);

export default NewReleaseHero;
