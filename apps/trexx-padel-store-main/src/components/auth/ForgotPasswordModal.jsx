import { motion } from "framer-motion";
import { X, ArrowRight, ChevronLeft } from "lucide-react";

const ForgotPasswordModal = ({ isOpen, onClose, onSwitchToLogin }) => {
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
        {/* Decoración Roja Superior */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-trexx-red via-red-500 to-trexx-red"></div>

        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black italic text-white tracking-tighter mb-2">
            RECUPERAR <span className="text-trexx-red">ACCESO</span>
          </h2>
          <p className="text-xs text-white/60 tracking-widest uppercase px-4">
            Ingresa tu email y te enviaremos un enlace para restablecer tu
            contraseña.
          </p>
        </div>

        {/* Formulario */}
        <form
          className="space-y-6 relative z-10"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1 block">
              Email Registrado
            </label>
            <input
              type="email"
              className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-trexx-red transition-colors placeholder:text-white/20"
              placeholder="usuario@trexx.com"
            />
          </div>

          <button className="w-full bg-white text-black hover:bg-gray-200 font-bold py-3 uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 group">
            Enviar Enlace{" "}
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </form>

        {/* Footer: Volver al Login */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center relative z-10">
          <button
            onClick={onSwitchToLogin}
            className="flex items-center justify-center gap-2 text-[10px] text-white/60 hover:text-white transition-colors uppercase tracking-widest mx-auto"
          >
            <ChevronLeft size={12} /> Volver a Iniciar Sesión
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordModal;
