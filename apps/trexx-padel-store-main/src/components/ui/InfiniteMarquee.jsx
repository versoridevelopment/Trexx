import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const WORDS = [
  "POWER",
  "CONTROL",
  "PRECISION",
  "SPEED",
  "TREXX PADEL",
  "PERFORMANCE",
];

const InfiniteMarquee = () => {
  return (
    <div className="relative w-full z-20 overflow-hidden border-y border-white/10 h-16 flex items-center">
      {/* --- 1. FONDO DINÁMICO (Varying Reds) --- */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "linear-gradient(90deg, #dc2626, #7f1d1d, #450a0a, #dc2626)",
          backgroundSize: "300% 100%", // Fondo extendido para permitir el movimiento
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%"], // Mueve el gradiente horizontalmente
        }}
        transition={{
          duration: 5, // <--- CAMBIO AQUÍ: Reducido de 15s a 6s para mucha más velocidad
          ease: "linear",
          repeat: Infinity,
        }}
      />

      {/* --- 2. TEXTURA DE RUIDO --- */}
      <div className="absolute inset-0 w-full h-full opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none"></div>

      {/* --- 3. CONTENIDO (Marquee Infinito) --- */}
      <div className="relative z-10 w-full overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 30, // Velocidad del desplazamiento del texto
            ease: "linear",
          }}
        >
          {/* Loop doble para efecto infinito */}
          {[...Array(2)].map((_, groupIndex) => (
            <div
              key={groupIndex}
              className="flex items-center gap-8 md:gap-16 px-4 md:px-8"
            >
              {WORDS.map((word, i) => (
                <div
                  key={`${groupIndex}-${i}`}
                  className="flex items-center gap-8 md:gap-16"
                >
                  {/* Estilo alternado: Sólido / Outline */}
                  <span
                    className={`text-2xl md:text-3xl font-black italic tracking-widest uppercase ${
                      i % 2 === 0
                        ? "text-white drop-shadow-md" // Pares: Blanco Sólido
                        : "text-transparent bg-clip-text stroke-white" // Impares: Transparente con borde
                    }`}
                    style={
                      i % 2 !== 0
                        ? { WebkitTextStroke: "1px rgba(255,255,255,0.7)" }
                        : {}
                    }
                  >
                    {word}
                  </span>

                  {/* Separador de Rayo */}
                  <Zap
                    size={16}
                    className="text-black/40 fill-black/20 rotate-12"
                    strokeWidth={3}
                  />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Vignette (Sombras laterales) */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black/50 to-transparent z-20 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black/50 to-transparent z-20 pointer-events-none"></div>
    </div>
  );
};

export default InfiniteMarquee;
