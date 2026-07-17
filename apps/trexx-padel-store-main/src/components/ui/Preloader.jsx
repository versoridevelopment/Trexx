import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Preloader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center"
      exit={{ opacity: 0 }} // Se desvanece cuando App.jsx cambia el estado
      transition={{ duration: 0.8 }}
    >
      <div className="relative">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-trexx-red rounded-full blur-[40px]"
        />
        <img
          src="/images/logo.png"
          className="w-32 md:w-40 object-contain relative z-10"
          alt="Logo"
        />
      </div>

      {/* Animación de carga infinita mientras espera los recursos */}
      <div className="mt-8 flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
            className="w-1.5 h-1.5 bg-trexx-red rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Preloader;
