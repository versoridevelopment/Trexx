import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAdminProductos } from "../../context/AdminProductosContext";
import ProductDetailView from "../../components/shop/ProductDetailView";

const CATEGORIAS = ["palas", "zapatillas", "ropa", "accesorios"];

const ProductoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { productos, agregarProducto, editarProducto } = useAdminProductos();

  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    transferPrice: "",
    installments: "6",
    stock: "10",
    category: "palas",
    description: "",
    img: "",
    color: "",
    // Metadatos / Atributos Dinámicos
    type: "",
    gender: "",
    features: "",
  });

  useEffect(() => {
    if (isEdit) {
      const productoAEditar = productos.find((p) => p.id === parseInt(id));
      if (productoAEditar) {
        setFormData({
          name: productoAEditar.name || "",
          price: productoAEditar.price || "",
          transferPrice: productoAEditar.transferPrice || "",
          installments: productoAEditar.installments?.toString() || "6",
          stock: productoAEditar.stock?.toString() || "0",
          category: productoAEditar.category || "palas",
          description: productoAEditar.description || "",
          img: productoAEditar.img || "",
          color: productoAEditar.color || "",
          type: productoAEditar.type || "",
          gender: productoAEditar.gender || "",
          features: productoAEditar.features
            ? productoAEditar.features.join(", ")
            : "",
        });
      }
    }
  }, [id, isEdit, productos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const featuresArray = formData.features
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f !== "");

    const productoData = {
      name: formData.name,
      price: parseFloat(formData.price),
      transferPrice: formData.transferPrice ? parseFloat(formData.transferPrice) : parseFloat(formData.price),
      installments: parseInt(formData.installments, 10) || 1,
      stock: parseInt(formData.stock, 10) || 0,
      category: formData.category,
      description: formData.description,
      img: formData.img,
      color: formData.color,
      // Metadatos
      ...(formData.type && { type: formData.type }),
      ...(formData.gender && { gender: formData.gender }),
      ...(featuresArray.length > 0 && { features: featuresArray }),
    };

    if (isEdit) {
      editarProducto(parseInt(id), productoData);
    } else {
      agregarProducto(productoData);
    }

    navigate("/admin/productos");
  };

  const featuresArray = formData.features
    .split(",")
    .map((f) => f.trim())
    .filter((f) => f !== "");

  const previewProduct = {
    id: isEdit ? parseInt(id) : 9999,
    name: formData.name,
    price: parseFloat(formData.price) || 0,
    transferPrice: formData.transferPrice ? parseFloat(formData.transferPrice) : (parseFloat(formData.price) || 0),
    installments: parseInt(formData.installments, 10) || 1,
    stock: parseInt(formData.stock, 10) || 0,
    category: formData.category,
    description: formData.description,
    img: formData.img,
    color: formData.color,
    ...(formData.type && { type: formData.type }),
    ...(formData.gender && { gender: formData.gender }),
    ...(featuresArray.length > 0 && { features: featuresArray }),
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-20 px-4">
      <div className="flex items-center gap-4">
        <Link
          to="/admin/productos"
          className="text-white/50 hover:text-white transition-colors"
        >
          ← Volver
        </Link>
        <h1 className="text-3xl font-black italic tracking-tighter uppercase">
          {isEdit ? "Editar" : "Nuevo"} <span className="text-trexx-red">Producto</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        {/* LADO IZQUIERDO: FORMULARIO */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 rounded-lg space-y-8"
        >
        <div className="space-y-4">
          <h3 className="text-lg font-bold uppercase tracking-widest border-b border-white/10 pb-2">
            Información Principal
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                Nombre del Producto
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-trexx-red transition-colors"
                placeholder="Ej: TREXX RAPTOR"
              />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                Precio Base ($) - Para Cuotas
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-trexx-red transition-colors"
                placeholder="Ej: 365900"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                Precio Transferencia ($)
              </label>
              <input
                type="number"
                name="transferPrice"
                value={formData.transferPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-trexx-red transition-colors"
                placeholder="Ej: 320000"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                Cuotas (Cantidad)
              </label>
              <input
                type="number"
                name="installments"
                value={formData.installments}
                onChange={handleChange}
                min="1"
                max="12"
                className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-trexx-red transition-colors"
                placeholder="Ej: 6"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-trexx-red transition-colors"
                placeholder="Ej: 10"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                Categoría
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-trexx-red transition-colors uppercase text-sm"
              >
                {CATEGORIAS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                URL de Imagen
              </label>
              <input
                type="text"
                name="img"
                value={formData.img}
                onChange={handleChange}
                className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-trexx-red transition-colors"
                placeholder="/images/palas/raptor.png"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-trexx-red transition-colors resize-none"
              placeholder="Descripción corta del producto..."
            ></textarea>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold uppercase tracking-widest border-b border-white/10 pb-2">
            Metadatos / Atributos Específicos
          </h3>
          <p className="text-xs text-white/40 mb-4">
            Estos campos se guardarán dinámicamente según correspondan a la categoría.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                Color (Slug)
              </label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-trexx-red transition-colors"
                placeholder="Ej: cyan, red, black"
              />
            </div>

            {formData.category === "palas" && (
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                  Tipo de Juego (Solo Palas)
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-trexx-red transition-colors uppercase text-sm"
                >
                  <option value="">Seleccionar...</option>
                  <option value="potencia">Potencia</option>
                  <option value="control">Control</option>
                  <option value="hibrida">Híbrida</option>
                </select>
              </div>
            )}

            {(formData.category === "zapatillas" || formData.category === "ropa") && (
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                  Género
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-trexx-red transition-colors uppercase text-sm"
                >
                  <option value="">Seleccionar...</option>
                  <option value="hombre">Hombre</option>
                  <option value="mujer">Mujer</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
              Características (separadas por coma)
            </label>
            <input
              type="text"
              name="features"
              value={formData.features}
              onChange={handleChange}
              className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-trexx-red transition-colors"
              placeholder="Ej: Carbono 18K, Forma Diamante, Balance Alto"
            />
          </div>
        </div>

        <div className="pt-6 flex justify-end">
          <button
            type="submit"
            className="bg-trexx-red hover:bg-red-700 text-white px-8 py-3 rounded font-bold uppercase tracking-widest transition-colors"
          >
            {isEdit ? "Guardar Cambios" : "Crear Producto"}
          </button>
        </div>
      </form>

      {/* LADO DERECHO: VISTA PREVIA */}
      <div className="sticky top-24 hidden xl:block border border-white/10 rounded-xl overflow-y-auto overflow-x-hidden h-[85vh] bg-[#050505] shadow-2xl scrollbar-hide">
        <div className="bg-[#111] p-3 text-center border-b border-white/10 text-white/50 text-[10px] uppercase font-bold tracking-widest">
          Vista Previa en Tiempo Real
        </div>
        <div className="scale-[0.85] origin-top">
          <ProductDetailView product={previewProduct} isPreview={true} />
        </div>
      </div>
    </div>
  </div>
  );
};

export default ProductoForm;
