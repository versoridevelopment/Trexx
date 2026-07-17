import { motion } from "framer-motion";

const RacketStats = ({ stats, color = "#ccff00" }) => {
  // Configuración geométrica
  const size = 300;
  const center = size / 2;
  const radius = 90; // Radio un poco menor para dejar espacio a las letras
  const labels = [
    "Potencia",
    "Control",
    "Punto Dulce",
    "Salida",
    "Manejabilidad",
  ];

  // Calcular puntos del polígono
  const getPoint = (value, index, total) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  };

  // Puntos para las etiquetas (un poco más afuera del radio máximo)
  const getLabelPoint = (index, total) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = radius + 35; // Distancia del centro a la etiqueta
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const dataPoints = [
    stats.power,
    stats.control,
    stats.sweetSpot,
    stats.output,
    stats.maneuverability,
  ];

  const polygonPath = dataPoints.map((val, i) => getPoint(val, i, 5)).join(" ");

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* viewBox permite que el SVG sea 100% responsivo */}
      <svg
        viewBox="0 0 300 300"
        className="w-full h-auto max-w-[350px] overflow-visible"
      >
        {/* 1. Ejes y Grilla de fondo */}
        {[20, 40, 60, 80, 100].map((level, i) => (
          <polygon
            key={i}
            points={dataPoints
              .map((_, idx) => getPoint(level, idx, 5))
              .join(" ")}
            fill="none"
            stroke="#ffffff"
            strokeOpacity={0.1}
            strokeWidth="1"
            strokeDasharray="2 2"
          />
        ))}

        {/* 2. Líneas radiales */}
        {dataPoints.map((_, i) => {
          const point = getPoint(100, i, 5);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={point.split(",")[0]}
              y2={point.split(",")[1]}
              stroke="#ffffff"
              strokeOpacity={0.1}
              strokeWidth="1"
            />
          );
        })}

        {/* 3. El Gráfico de Datos (Animado) */}
        <motion.polygon
          initial={{ opacity: 0, scale: 0, pathLength: 0 }}
          animate={{ opacity: 0.6, scale: 1, pathLength: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
          points={polygonPath}
          fill={color}
          fillOpacity={0.2}
          stroke={color}
          strokeWidth="2"
          className="drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-colors duration-500"
        />

        {/* 4. Puntos en las esquinas */}
        {dataPoints.map((val, i) => {
          const [cx, cy] = getPoint(val, i, 5).split(",");
          return (
            <motion.circle
              key={i}
              initial={{ r: 0 }}
              animate={{ r: 3 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              cx={cx}
              cy={cy}
              fill="white"
            />
          );
        })}

        {/* 5. Etiquetas SVG (Escalan con el gráfico) */}
        {labels.map((label, i) => {
          const { x, y } = getLabelPoint(i, 5);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="11"
              fontWeight="bold"
              className="uppercase tracking-widest"
              style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.8)" }}
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default RacketStats;
