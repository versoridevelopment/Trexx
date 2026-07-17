import { motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

const LoginModal = ({
  isOpen,
  onClose,
  onSwitchToRegister,
  onSwitchToForgot,
}) => {
  // Si no está abierto, no renderizamos nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* 1. Backdrop (Fondo oscuro borroso) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* 2. Modal Content (Tarjeta) */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 p-8 shadow-2xl overflow-hidden group"
      >
        {/* Decoración Roja Superior */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-trexx-red via-red-500 to-trexx-red"></div>

        {/* Decoración de luz de fondo (Blur) */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-trexx-red/20 blur-3xl rounded-full pointer-events-none"></div>

        {/* Botón Cerrar (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-20"
        >
          <X size={20} />
        </button>

        {/* Header del Modal */}
        <div className="text-center mb-8 relative z-10">
          <h2 className="text-3xl font-black italic text-white tracking-tighter mb-2">
            TREXX<span className="text-trexx-red">ID</span>
          </h2>
          <p className="text-xs text-white/60 tracking-widest uppercase">
            Acceso a miembros
          </p>
        </div>

        {/* Formulario */}
        <form
          className="space-y-4 relative z-10"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1 block">
              Email
            </label>
            <input
              type="email"
              className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-trexx-red transition-colors placeholder:text-white/20"
              placeholder="usuario@trexx.com"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1 block">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-trexx-red transition-colors placeholder:text-white/20"
              placeholder="••••••••"
            />
          </div>

          {/* Botón de Acción Principal */}
          <button className="w-full bg-trexx-red hover:bg-red-700 text-white font-bold py-3 uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 mt-6 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]">
            Ingresar <ArrowRight size={14} />
          </button>
        </form>

        {/* Links del Pie (Forgot Password & Register) */}
        <div className="mt-6 text-center space-y-3 relative z-10">
          {/* BOTÓN OLVIDASTE CONTRASEÑA */}
          <button
            type="button"
            onClick={onSwitchToForgot}
            className="text-[10px] text-white/40 hover:text-white transition-colors underline"
          >
            ¿Olvidaste tu contraseña?
          </button>

          <p className="text-[10px] text-white/60">
            ¿No tienes cuenta?{" "}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-trexx-red font-bold hover:underline uppercase tracking-wider ml-1"
            >
              Regístrate
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginModal;
