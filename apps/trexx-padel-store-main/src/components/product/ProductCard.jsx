import { ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import Badge from "../ui/Badge";

const ProductCard = ({ product }) => {
  const { id, name, price, category, image, isNew, stock } = product;

  return (
    <div className="group relative w-full bg-trexx-card border border-white/5 overflow-hidden transition-all duration-500 hover:border-trexx-red/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)]">
      {/* IMAGEN + OVERLAY */}
      <div className="relative aspect-[3/4] overflow-hidden bg-trexx-bg">
        {/* Badges Flotantes */}
        <div className="absolute top-3 left-3 z-20 flex gap-2">
          {isNew && <Badge variant="accent">Nuevo</Badge>}
          {stock < 5 && <Badge variant="sale">Últimas Unidades</Badge>}
        </div>

        {/* Imagen con Zoom al Hover */}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />

        {/* Overlay Oscuro al Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

        {/* Botones de Acción (Aparecen desde abajo) */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75 z-20 px-4">
          <button className="flex-1 bg-white text-black font-bold py-3 text-xs uppercase tracking-widest hover:bg-trexx-red hover:text-white transition-colors flex items-center justify-center gap-2">
            <ShoppingCart size={16} />
            Agregar
          </button>

          <Link
            to={`/producto/${id}`}
            className="p-3 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition-colors border border-white/20"
          >
            <Eye size={18} />
          </Link>
        </div>
      </div>

      {/* INFO DEL PRODUCTO */}
      <div className="p-5">
        <p className="text-xs text-trexx-muted uppercase tracking-widest mb-1">
          {category}
        </p>
        <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-trexx-red transition-colors">
          {name}
        </h3>
        <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-2">
          <span className="text-xl font-mono text-white">
            ${price.toLocaleString()}
          </span>
          <span className="text-[10px] text-green-400 font-mono tracking-widest">
            EN STOCK
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
