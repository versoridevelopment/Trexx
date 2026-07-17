import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { useAdminProductos } from "../context/AdminProductosContext";
import ProductDetailView from "../components/shop/ProductDetailView";

const ProductDetail = () => {
  const { id } = useParams();
  const { productos: PRODUCTS_DB } = useAdminProductos();

  // 1. BUSCAR PRODUCTO
  const product = useMemo(() => {
    return PRODUCTS_DB.find((p) => p.id === parseInt(id));
  }, [id, PRODUCTS_DB]);

  // --- MANEJO DE ERRORES ---
  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <AlertCircle size={48} className="text-trexx-red mb-4 relative z-10" />
        <h2 className="text-2xl font-bold uppercase tracking-widest relative z-10">
          Producto no encontrado
        </h2>
        <Link
          to="/shop"
          className="mt-6 px-6 py-3 border border-white/20 hover:bg-white hover:text-black transition-colors uppercase text-xs font-bold tracking-widest relative z-10"
        >
          Volver a la Tienda
        </Link>
      </div>
    );
  }

  return <ProductDetailView product={product} />;
};

export default ProductDetail;
