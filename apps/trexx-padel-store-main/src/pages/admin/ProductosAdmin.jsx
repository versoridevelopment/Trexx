import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminProductos } from "../../context/AdminProductosContext";
import { Search, Filter } from "lucide-react";

const ProductosAdmin = () => {
  const { productos, cargando, eliminarProducto } = useAdminProductos();

  if (cargando) {
    return <div className="text-white">Cargando productos...</div>;
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      eliminarProducto(id);
    }
  };

  const filteredProducts = productos.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toString().includes(searchTerm);
    const matchesCategory = categoryFilter ? p.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black italic tracking-tighter uppercase">
          Gestión de <span className="text-trexx-red">Productos</span>
        </h1>
        <Link
          to="/admin/productos/nuevo"
          className="bg-trexx-red hover:bg-red-700 text-white px-6 py-2 rounded font-bold uppercase tracking-widest transition-colors text-sm"
        >
          + Nuevo Producto
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Buscar por nombre o ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-trexx-red transition-colors"
          />
        </div>
        <div className="relative min-w-[200px]">
          <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-trexx-red transition-colors appearance-none uppercase"
          >
            <option value="">Todas las Categorías</option>
            <option value="palas">Palas</option>
            <option value="zapatillas">Zapatillas</option>
            <option value="ropa">Ropa</option>
            <option value="accesorios">Accesorios</option>
          </select>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/80">
            <thead className="text-xs text-white/50 uppercase bg-[#111] border-b border-white/10">
              <tr>
                <th scope="col" className="px-6 py-4">ID / Nombre</th>
                <th scope="col" className="px-6 py-4">Categoría</th>
                <th scope="col" className="px-6 py-4">Stock</th>
                <th scope="col" className="px-6 py-4">Precio (Cuotas / Transf.)</th>
                <th scope="col" className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((producto) => (
                <tr
                  key={producto.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                    {producto.img && (
                      <div className="w-10 h-10 bg-white/5 rounded flex items-center justify-center p-1">
                        <img src={producto.img} alt={producto.name} className="max-h-full object-contain" />
                      </div>
                    )}
                    <div>
                      <div className="font-bold">{producto.name}</div>
                      <div className="text-xs text-white/40 font-mono">ID: {producto.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 uppercase tracking-widest text-xs">
                    {producto.category}
                  </td>
                  <td className="px-6 py-4 font-mono text-white/80">
                    {producto.stock > 0 ? producto.stock : <span className="text-trexx-red">AGOTADO</span>}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">
                    <div className="text-white">C: ${producto.price?.toLocaleString("es-AR")}</div>
                    <div className="text-trexx-red">T: ${producto.transferPrice?.toLocaleString("es-AR")}</div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link
                      to={`/admin/productos/editar/${producto.id}`}
                      className="text-white/60 hover:text-white uppercase text-xs tracking-widest transition-colors"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(producto.id)}
                      className="text-trexx-red hover:text-red-400 uppercase text-xs tracking-widest transition-colors"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-white/50">
                    No hay productos cargados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductosAdmin;
