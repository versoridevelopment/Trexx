import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Send, MessageSquare } from "lucide-react";

const Contact = () => {
  return (
    <section className="relative py-32 px-6 bg-[#050505] overflow-hidden">
      {/* --- FONDO ATMOSFÉRICO OPTIMIZADO --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 1. Grid Estático (CSS puro es más rápido) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        {/* 2. Luces Ambientales (GPU Accelerated) */}
        <motion.div
          style={{ willChange: "transform, opacity" }}
          animate={{ x: [0, 50, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-trexx-red rounded-full blur-[180px] opacity-10"
        />
        <motion.div
          style={{ willChange: "transform, opacity" }}
          animate={{ x: [0, -30, 0], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#06b6d4] rounded-full blur-[150px] opacity-10"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* --- COLUMNA IZQUIERDA: TEXTO E INFO --- */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="text-trexx-red font-bold tracking-[0.3em] text-xs uppercase mb-4 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-trexx-red"></span> CONTACTO
              </span>

              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white mb-6 leading-[0.9]">
                HABLEMOS DE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">
                  TU JUEGO.
                </span>
              </h2>

              <p className="text-white/60 text-lg leading-relaxed max-w-md mb-12 border-l-2 border-white/10 pl-6">
                ¿Dudas sobre qué pala elegir? ¿Interesado en distribución
                mayorista? Nuestro equipo respira pádel 24/7.
              </p>
            </motion.div>

            {/* Tarjetas de Info */}
            <div className="space-y-6">
              <ContactInfoCard
                icon={<MapPin />}
                title="SHOWROOM & FÁBRICA"
                detail="Av. Del Libertador 8000, Núñez, CABA"
                delay={0.1}
              />
              <ContactInfoCard
                icon={<Mail />}
                title="VENTAS & SOPORTE"
                detail="hola@trexxpadel.com.ar"
                delay={0.2}
              />
              <ContactInfoCard
                icon={<Phone />}
                title="WHATSAPP DIRECTO"
                detail="+54 11 9876-5432"
                delay={0.3}
              />
            </div>
          </div>

          {/* --- COLUMNA DERECHA: FORMULARIO --- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Glow trasero */}
            <div className="absolute -inset-1 bg-gradient-to-r from-trexx-red/20 via-transparent to-blue-500/20 rounded-lg blur-xl opacity-50 pointer-events-none"></div>

            <div className="relative bg-[#0a0a0a] border border-white/10 p-8 md:p-12 rounded-sm shadow-2xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-8 tracking-wide flex items-center gap-3">
                <MessageSquare className="text-trexx-red" size={20} /> ENVIAR
                MENSAJE
              </h3>

              <form
                className="space-y-8"
                onSubmit={(e) => e.preventDefault()}
                autoComplete="off"
              >
                {/* Input: Nombre (Optimizado con CSS Peer) */}
                <div className="relative group">
                  <input
                    type="text"
                    id="user_name_trexx"
                    name="user_name_trexx"
                    placeholder=" "
                    className="block py-4 px-0 w-full text-white bg-transparent border-0 border-b border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-transparent peer transition-colors duration-300"
                    autoComplete="off"
                  />
                  <label className="absolute text-sm text-white/40 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-trexx-red font-bold tracking-widest uppercase pointer-events-none">
                    Nombre Completo
                  </label>
                  {/* Línea animada con CSS en lugar de JS */}
                  <div className="absolute bottom-0 left-0 h-[2px] bg-trexx-red w-0 transition-all duration-300 peer-focus:w-full" />
                </div>

                {/* Input: Email */}
                <div className="relative group">
                  <input
                    type="email"
                    id="user_email_trexx"
                    name="user_email_trexx"
                    placeholder=" "
                    className="block py-4 px-0 w-full text-white bg-transparent border-0 border-b border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-transparent peer transition-colors duration-300"
                    autoComplete="off"
                  />
                  <label className="absolute text-sm text-white/40 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-trexx-red font-bold tracking-widest uppercase pointer-events-none">
                    Email
                  </label>
                  <div className="absolute bottom-0 left-0 h-[2px] bg-trexx-red w-0 transition-all duration-300 peer-focus:w-full" />
                </div>

                {/* Input: Mensaje */}
                <div className="relative group">
                  <textarea
                    id="user_message"
                    rows="3"
                    placeholder=" "
                    className="block py-4 px-0 w-full text-white bg-transparent border-0 border-b border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-transparent peer transition-colors duration-300 resize-none"
                  />
                  <label className="absolute text-sm text-white/40 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-trexx-red font-bold tracking-widest uppercase pointer-events-none">
                    Mensaje
                  </label>
                  <div className="absolute bottom-0 left-0 h-[2px] bg-trexx-red w-0 transition-all duration-300 peer-focus:w-full" />
                </div>

                {/* Botón */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full bg-white text-black font-black italic tracking-widest uppercase py-5 overflow-hidden"
                >
                  <div className="absolute inset-0 w-full h-full bg-trexx-red origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                  <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors duration-300">
                    Enviar Consulta <Send size={18} />
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- SUBCOMPONENTE DE INFO ---
const ContactInfoCard = ({ icon, title, detail, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }} // OPTIMIZADO
      transition={{ duration: 0.6, delay: delay }}
      whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.03)" }}
      className="flex items-center gap-6 p-4 border border-transparent hover:border-white/10 rounded-sm transition-all cursor-default group"
    >
      <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full text-white/50 group-hover:text-trexx-red group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>
      <div>
        <h4 className="text-white font-bold tracking-widest text-xs uppercase mb-1 opacity-50">
          {title}
        </h4>
        <p className="text-white text-sm md:text-base font-medium">{detail}</p>
      </div>
    </motion.div>
  );
};

export default Contact;
