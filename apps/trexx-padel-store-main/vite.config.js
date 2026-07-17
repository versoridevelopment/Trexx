import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 1. Minificación agresiva
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Borra todos los console.log en producción
        drop_debugger: true,
      },
    },
    // 2. Dividir librerías grandes en archivos separados (Chunks)
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Separa Framer Motion (es pesado)
          if (id.includes("framer-motion")) {
            return "framer-motion";
          }
          // Separa React y DOM
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom") ||
            id.includes("react-router-dom")
          ) {
            return "react-vendor";
          }
          // Separa Iconos
          if (id.includes("lucide-react")) {
            return "icons";
          }
        },
      },
    },
  },
});
