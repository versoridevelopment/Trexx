/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        trexx: {
          bg: "#09090b",
          card: "#18181b",
          border: "#27272a",
          red: "#dc2626",
          // NUEVO COLOR: VOLT (Lima Neón)
          volt: "#ccff00",
          text: "#fafafa",
          muted: "#a1a1aa",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      // Agregamos una animación personalizada para el "brillo"
      animation: {
        "spin-slow": "spin 8s linear infinite",
      },
    },
  },
  plugins: [],
};
