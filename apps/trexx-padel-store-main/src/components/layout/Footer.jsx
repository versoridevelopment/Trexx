import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-12 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute -top-10 -right-10 text-[150px] font-black text-white/5 select-none pointer-events-none italic leading-none">
        TREXX
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* --- NIVEL SUPERIOR --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
          {/* IZQUIERDA: Marca + Redes */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* LOGO IMAGEN */}
            <Link to="/" className="inline-block">
              <img
                src="/images/logo.png"
                alt="TREXX PADEL"
                className="h-8 md:h-12 w-auto object-contain hover:brightness-125 transition-all duration-300"
              />
            </Link>

            {/* Redes Sociales */}
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="https://www.instagram.com/trexxpadel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    y: -3,
                    backgroundColor: "#dc2626",
                    color: "white",
                  }}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 transition-colors duration-300"
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* DERECHA: Navegación Institucional */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-6 md:gap-8 text-xs md:text-sm font-bold tracking-widest uppercase text-gray-500">
              {["Historia", "Tecnología", "Jugadores", "Contacto"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to={`/${item
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")}`}
                      className="hover:text-white transition-colors duration-300 relative group"
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-trexx-red group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
        </div>

        {/* --- SEPARADOR --- */}
        <div className="border-t border-white/10" />

        {/* --- NIVEL INFERIOR --- */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-gray-600 font-medium tracking-wide">
          <p>© 2026 Trexx Padel Inc.</p>

          {/* --- FIRMA VERSORI --- */}
          <motion.a
            href="https://versori.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group cursor-pointer relative"
            whileHover="hover"
          >
            <span className="uppercase tracking-widest text-[9px]">
              Powered by
            </span>

            <div className="relative px-2 py-1 bg-white/5 rounded-sm overflow-hidden group-hover:bg-white/10 transition-colors duration-300">
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)",
                }}
              />

              <span className="relative z-10 font-black flex items-center gap-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-500 group-hover:to-cyan-400 transition-all duration-300 text-white text-[10px]">
                VERSORI
                <Zap
                  size={10}
                  className="text-trexx-red group-hover:text-cyan-400 transition-colors"
                  fill="currentColor"
                />
              </span>
            </div>
          </motion.a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
