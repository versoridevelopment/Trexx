import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Factory, Plane, Award, Quote } from "lucide-react";

// --- DATOS HISTORIA ---
const HISTORY_STEPS = [
  {
    year: "1992",
    title: "El Origen",
    description:
      "En plena explosión del pádel en Argentina, Damián Diez abre su primer taller en Mar del Plata. Mientras competía en los torneos más exigentes, pasaba las noches perfeccionando moldes de madera y goma.",
  },
  {
    year: "2008",
    title: "Consagración",
    description:
      "Damián alcanza el puesto Nº2 del ranking nacional. Esa experiencia de alta competencia fue clave: Trexx dejó de ser un taller artesanal para incorporar tecnología de carbono.",
  },
  {
    year: "2026",
    title: "Legado Global",
    description:
      "Con Damián aún activo en el circuito Senior Mundial, Trexx exporta ingeniería argentina a 15 países. No somos una multinacional sin rostro; somos jugadores fabricando para jugadores.",
  },
];

// --- VARIANTES DE ANIMACIÓN ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 }, // Reducido de 40 a 30 para ser más sutil
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const AboutUs = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [30, -30]); // Reducido rango parallax

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 bg-[#050505] overflow-hidden"
    >
      {/* --- FONDO ATMOSFÉRICO (OPTIMIZADO) --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: yParallax, willChange: "transform" }} // OPTIMIZACIÓN
          animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.12, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }} // Más lento y linear
          className="absolute top-0 right-0 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-[#75AADB]/10 rounded-full blur-[100px] md:blur-[120px]"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* --- HEADER --- */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} // OPTIMIZACIÓN
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <span className="w-8 h-[2px] bg-[#75AADB]"></span>
            <span className="text-[#75AADB] font-bold tracking-[0.3em] text-xs uppercase">
              DESDE 1992
            </span>
            <span className="w-8 h-[2px] bg-[#75AADB]"></span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} // OPTIMIZACIÓN
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-3xl md:text-6xl font-black italic tracking-tighter text-white uppercase leading-tight md:leading-[0.9]"
          >
            Ingeniería con <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">
              Sangre de Campeón.
            </span>
          </motion.h2>
        </div>

        {/* --- SECCIÓN FUNDADOR --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 md:mb-32 border-b border-white/5 pb-16 md:pb-20">
          {/* COLUMNA IMAGEN */}
          <motion.div
            className="lg:col-span-5 relative group z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} // OPTIMIZACIÓN
          >
            <motion.div
              variants={imageReveal}
              className="relative h-[400px] lg:h-[500px] w-full overflow-hidden rounded-sm border border-white/10 shadow-2xl"
            >
              <img
                src="/images/AboutUs/damian-diez.png"
                alt="Damián Diez - Fundador Trexx"
                loading="lazy" // OPTIMIZACIÓN IMAGEN
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100 object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 md:opacity-80"></div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} // OPTIMIZACIÓN
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute bottom-6 left-6 md:bottom-8 md:left-8"
              >
                <h3 className="text-2xl md:text-3xl font-black italic text-white tracking-tighter uppercase leading-none mb-2">
                  Damián <span className="text-trexx-red">Diez</span>
                </h3>
                <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-sm">
                  <p className="text-white text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase">
                    Founder & Head Engineer
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Borde decorativo detrás */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }} // OPTIMIZACIÓN
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute -z-10 top-4 left-4 w-full h-full border-2 border-[#75AADB]/30 rounded-sm hidden md:block"
            ></motion.div>
          </motion.div>

          {/* COLUMNA BIO */}
          <motion.div
            className="lg:col-span-7 pl-0 lg:pl-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // OPTIMIZACIÓN
          >
            <motion.div variants={fadeInUp}>
              <Quote
                className="text-[#75AADB] mb-4 md:mb-6 opacity-80"
                size={40}
              />
            </motion.div>

            <motion.h3
              variants={fadeInUp}
              className="text-xl md:text-3xl font-bold text-white mb-6 md:mb-8 leading-relaxed"
            >
              "No fabrico nada que no usaría en una final del mundo."
            </motion.h3>

            <div className="space-y-4 md:space-y-6 text-white/70 text-base md:text-lg leading-relaxed font-light">
              <motion.p variants={fadeInUp}>
                La historia de Trexx es mi propia historia en las canchas. Fundé
                la marca en
                <strong className="text-white font-bold"> 1992</strong>, no como
                un negocio, sino como una necesidad: las palas de esa época no
                aguantaban mi ritmo de juego.
              </motion.p>
              <motion.p variants={fadeInUp}>
                Desde las batallas en el circuito AJPP hasta alcanzar las
                <strong className="text-white font-bold">
                  {" "}
                  Semifinales del Mundial Senior
                </strong>
                , cada prototipo ha sido testeado en competencia real.
              </motion.p>
            </div>

            <motion.div
              variants={fadeInUp}
              className="flex gap-8 md:gap-12 mt-8 md:mt-12 border-t border-white/10 pt-6 md:pt-8"
            >
              <div>
                <span className="block text-3xl md:text-4xl font-black text-white italic mb-1">
                  30+
                </span>
                <span className="text-[10px] md:text-xs text-[#75AADB] tracking-[0.2em] uppercase font-bold">
                  Años de Trayectoria
                </span>
              </div>
              <div>
                <span className="block text-3xl md:text-4xl font-black text-white italic mb-1">
                  Top
                </span>
                <span className="text-[10px] md:text-xs text-[#75AADB] tracking-[0.2em] uppercase font-bold">
                  Senior Player
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* --- TIMELINE --- */}
        <div className="relative border-l border-white/10 ml-2 md:ml-0 pl-8 md:pl-16 space-y-16 md:space-y-20">
          {HISTORY_STEPS.map((step, index) => (
            <TimelineItem key={step.year} step={step} index={index} />
          ))}
        </div>

        {/* --- VALORES --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-24 md:mt-32 border-t border-white/10 pt-12 md:pt-16">
          <PhilosophyCard
            icon={<Factory size={28} />}
            title="INDUSTRIA ARGENTINA"
            text="Orgullosamente fabricadas en Mar del Plata, la capital histórica del pádel nacional."
            delay={0.1}
          />
          <PhilosophyCard
            icon={<Award size={28} />}
            title="CALIDAD DE TORNEO"
            text="Cada modelo Elite Series pasa por las manos de Damián antes de aprobarse."
            delay={0.2}
          />
          <PhilosophyCard
            icon={<Plane size={28} />}
            title="EXPORTACIÓN"
            text="La garra argentina viaja al mundo. Competimos de igual a igual en Europa."
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

// --- SUBCOMPONENTES ---
const TimelineItem = ({ step, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.5 }} // OPTIMIZACIÓN
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="relative group"
  >
    <span className="absolute -left-[40px] md:-left-[72px] top-2 w-4 h-4 bg-[#050505] border-2 border-[#75AADB] rounded-full group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(117,170,219,0.3)]"></span>

    <div className="flex flex-col md:flex-row gap-2 md:gap-12 items-start">
      <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent group-hover:from-[#75AADB] group-hover:to-transparent transition-all duration-500 italic">
        {step.year}
      </span>
      <div>
        <h3 className="text-lg md:text-xl font-bold text-white mb-2 uppercase tracking-wide">
          {step.title}
        </h3>
        <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-xl">
          {step.description}
        </p>
      </div>
    </div>
  </motion.div>
);

const PhilosophyCard = ({ icon, title, text, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} // OPTIMIZACIÓN
    transition={{ duration: 0.5, delay: delay }}
    whileHover={{ y: -5 }}
    className="bg-[#0a0a0a] p-6 md:p-8 border border-white/5 hover:border-[#75AADB]/30 transition-all duration-300 group hover:shadow-2xl hover:shadow-[#75AADB]/5 rounded-sm"
  >
    <div className="text-white/40 group-hover:text-[#75AADB] transition-colors mb-4 md:mb-6 transform group-hover:scale-110 duration-300">
      {icon}
    </div>
    <h4 className="text-white font-bold tracking-widest text-base md:text-lg mb-3 md:mb-4">
      {title}
    </h4>
    <p className="text-white/40 text-xs md:text-sm leading-relaxed">{text}</p>
  </motion.div>
);

export default AboutUs;
