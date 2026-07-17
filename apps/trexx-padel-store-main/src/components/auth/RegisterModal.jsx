import { motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 p-8 shadow-2xl overflow-hidden"
      >
        {/* Decoración Roja (Invertida para variedad sutil) */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-trexx-red via-red-500 to-trexx-red"></div>
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-trexx-red/20 blur-3xl rounded-full"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-black italic text-white tracking-tighter mb-2">
            UNITE AL <span className="text-trexx-red">EQUIPO</span>
          </h2>
          <p className="text-xs text-white/60 tracking-widest uppercase">
            Crea tu Trexx ID
          </p>
        </div>

        <form className="space-y-4 relative z-10">
          <div>
            <label className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1 block">
              Nombre Completo
            </label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-trexx-red transition-colors"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1 block">
              Email
            </label>
            <input
              type="email"
              className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-trexx-red transition-colors"
              placeholder="usuario@trexx.com"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1 block">
                Contraseña
              </label>
              <input
                type="password"
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-trexx-red transition-colors"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1 block">
                Confirmar
              </label>
              <input
                type="password"
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-trexx-red transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button className="w-full bg-white text-black hover:bg-gray-200 font-bold py-3 uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 mt-6">
            Crear Cuenta <ArrowRight size={14} />
          </button>
        </form>

        <div className="mt-6 text-center relative z-10">
          <p className="text-[10px] text-white/60">
            ¿Ya tienes cuenta?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-trexx-red font-bold hover:underline uppercase tracking-wider"
            >
              Ingresar
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterModal;
