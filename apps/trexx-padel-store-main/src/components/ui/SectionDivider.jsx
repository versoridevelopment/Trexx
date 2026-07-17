import { motion } from "framer-motion";

const SectionDivider = ({
  text1 = "Argentine DNA",
  text2 = "Professional Grade",
  text3 = "Break The Limits",
  reverse = false, // Si es true, la cinta se mueve a la derecha
}) => {
  return (
    <div className="w-full bg-[#050505] border-y border-white/5 py-4 overflow-hidden relative flex items-center z-20">
      {/* Sombra interna para suavizar los bordes */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] pointer-events-none"></div>

      <motion.div
        className="flex whitespace-nowrap gap-16"
        // Lógica: Si es reverse va de -50% a 0%, si no va de 0% a -50%
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30,
        }}
      >
        {/* Repetimos contenido */}
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center gap-16 opacity-20">
            <span className="text-sm md:text-base font-black italic tracking-[0.3em] uppercase text-white">
              {text1}
            </span>
            <div className="w-1.5 h-1.5 bg-trexx-red rounded-full shadow-[0_0_10px_#dc2626]"></div>

            <span className="text-sm md:text-base font-black italic tracking-[0.3em] uppercase text-white">
              {text2}
            </span>
            <div className="w-1.5 h-1.5 bg-trexx-red rounded-full shadow-[0_0_10px_#dc2626]"></div>

            <span className="text-sm md:text-base font-black italic tracking-[0.3em] uppercase text-white">
              {text3}
            </span>
            <div className="w-1.5 h-1.5 bg-trexx-red rounded-full shadow-[0_0_10px_#dc2626]"></div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SectionDivider;
