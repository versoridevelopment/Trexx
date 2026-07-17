import { useState, useMemo, useEffect, useRef, memo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  X,
  ChevronDown,
  Check,
  ArrowUpDown,
  SlidersHorizontal,
  Search,
} from "lucide-react";

import { useAdminProductos } from "../context/AdminProductosContext";

// --- FUNCIÓN AUXILIAR ---
const getInitialFiltersFromUrl = (searchParams) => {
  const urlCategory = searchParams.get("category");
  let newCategory = [];
  let newGender = [];

  if (urlCategory && urlCategory !== "all") {
    if (urlCategory === "ropaHombre") {
      newCategory = ["ropa"];
      newGender = ["hombre"];
    } else if (urlCategory === "ropaMujer") {
      newCategory = ["ropa"];
      newGender = ["mujer"];
    } else {
      newCategory = [urlCategory];
    }
  }

  return {
    category: newCategory,
    gender: newGender,
    priceRange: [0, 500000],
    color: [],
    type: [],
  };
};

const Shop = () => {
  const { productos: PRODUCTS_DB } = useAdminProductos();
  const [searchParams] = useSearchParams();
  const topRef = useRef(null);

  const currentCategoryParam = searchParams.get("category");
  const [prevCategoryParam, setPrevCategoryParam] =
    useState(currentCategoryParam);

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("relevant");
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState(() =>
    getInitialFiltersFromUrl(searchParams),
  );

  if (currentCategoryParam !== prevCategoryParam) {
    setPrevCategoryParam(currentCategoryParam);
    setFilters(getInitialFiltersFromUrl(searchParams));
    setSearchQuery("");
  }

  const processedProducts = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();

    let result = PRODUCTS_DB.filter((product) => {
      // 1. Búsqueda
      if (searchQuery && !product.name.toLowerCase().includes(lowerQuery)) {
        return false;
      }

      // 2. Categoría
      if (
        filters.category.length > 0 &&
        !filters.category.includes(product.category)
      ) {
        return false;
      }

      // 3. Género
      if (filters.gender.length > 0) {
        const isUnisex = product.gender === "unisex";
        const matchesGender = filters.gender.includes(product.gender);
        const matchesUnisex =
          isUnisex &&
          (filters.gender.includes("hombre") ||
            filters.gender.includes("mujer"));

        if (!matchesGender && !matchesUnisex && product.gender) return false;
      }

      // 4. Precio
      if (product.price > filters.priceRange[1]) return false;

      // 5. Color
      if (filters.color.length > 0 && !filters.color.includes(product.color)) {
        return false;
      }

      // 6. Tipo
      if (
        filters.type.length > 0 &&
        product.type &&
        !filters.type.includes(product.type)
      ) {
        return false;
      }

      return true;
    });

    if (sortOption === "price_asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price_desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [filters, sortOption, searchQuery]);

  const toggleFilter = (type, value) => {
    setFilters((prev) => {
      const current = prev[type];
      const isSelected = current.includes(value);
      return isSelected
        ? { ...prev, [type]: current.filter((item) => item !== value) }
        : { ...prev, [type]: [...current, value] };
    });
  };

  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-20" ref={topRef}>
      {/* HEADER */}
      <div className="max-w-[1400px] mx-auto px-6 mb-8 border-b border-white/10 pb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 text-left">
          <div className="w-full lg:w-auto">
            <h1 className="text-4xl md:text-6xl font-black italic text-white tracking-tighter uppercase">
              Catálogo <span className="text-trexx-red">2026</span>
            </h1>
            <p className="text-white/40 text-sm mt-2 font-mono">
              {processedProducts.length} RESULTADOS ENCONTRADOS
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-80 group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-trexx-red transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Buscar producto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#111] text-white border border-white/20 pl-12 pr-4 py-3 focus:outline-none focus:border-trexx-red font-bold text-xs uppercase tracking-wider placeholder:text-white/30 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="relative w-full md:w-64">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full bg-[#111] text-white border border-white/20 px-4 py-3 appearance-none cursor-pointer focus:outline-none focus:border-trexx-red font-bold text-xs uppercase tracking-wider"
              >
                <option value="relevant">Más Relevantes</option>
                <option value="price_asc">Menor Precio</option>
                <option value="price_desc">Mayor Precio</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                <ArrowUpDown size={14} />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="md:hidden flex items-center justify-center gap-2 bg-white text-black px-4 py-3 font-bold uppercase text-xs tracking-widest mt-6 w-full hover:bg-gray-200 transition-colors"
        >
          <SlidersHorizontal size={16} /> Filtrar Productos
        </button>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="max-w-[1400px] mx-auto px-6 flex gap-12 relative">
        <aside className="hidden md:block w-64 flex-shrink-0 sticky top-32 h-[calc(100vh-150px)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          <FilterContent
            filters={filters}
            toggleFilter={toggleFilter}
            setFilters={setFilters}
          />
        </aside>

        <div className="flex-1">
          <AnimatePresence mode="popLayout">
            {processedProducts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12"
              >
                {processedProducts.map((product) => (
                  <ProductCard key={product.id} item={product} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-white/30 border border-dashed border-white/10 rounded-lg"
              >
                <Search size={48} className="mb-4 opacity-50" />
                <p className="text-xl font-bold uppercase">
                  {searchQuery
                    ? `No hay resultados para "${searchQuery}"`
                    : "No hay productos"}
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      category: [],
                      gender: [],
                      priceRange: [0, 500000],
                      color: [],
                      type: [],
                    });
                    setSearchQuery("");
                  }}
                  className="mt-4 text-trexx-red hover:underline text-sm font-bold uppercase"
                >
                  Limpiar Todo
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-[#111] z-[60] p-6 flex flex-col border-l border-white/10 md:hidden"
            >
              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <h2 className="text-xl font-black italic text-white uppercase flex items-center gap-2">
                  <SlidersHorizontal size={20} className="text-trexx-red" />{" "}
                  Filtros
                </h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="text-white/50 hover:text-white p-1"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                <FilterContent
                  filters={filters}
                  toggleFilter={toggleFilter}
                  setFilters={setFilters}
                />
              </div>

              <div className="pt-6 mt-4 border-t border-white/10">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-trexx-red text-white font-bold uppercase py-4 tracking-widest hover:bg-red-700 transition-colors"
                >
                  Ver {processedProducts.length} Resultados
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- SUBCOMPONENTES ---

const FilterContent = ({ filters, toggleFilter, setFilters }) => (
  <>
    <FilterGroup title="Género" defaultOpen={true}>
      <Checkbox
        label="Hombre"
        checked={filters.gender.includes("hombre")}
        onChange={() => toggleFilter("gender", "hombre")}
      />
      <Checkbox
        label="Mujer"
        checked={filters.gender.includes("mujer")}
        onChange={() => toggleFilter("gender", "mujer")}
      />
      <Checkbox
        label="Unisex"
        checked={filters.gender.includes("unisex")}
        onChange={() => toggleFilter("gender", "unisex")}
      />
    </FilterGroup>

    <FilterGroup title="Categoría" defaultOpen={true}>
      <Checkbox
        label="Palas"
        checked={filters.category.includes("palas")}
        onChange={() => toggleFilter("category", "palas")}
      />
      <Checkbox
        label="Indumentaria"
        checked={filters.category.includes("ropa")}
        onChange={() => toggleFilter("category", "ropa")}
      />
      <Checkbox
        label="Zapatillas"
        checked={filters.category.includes("zapatillas")}
        onChange={() => toggleFilter("category", "zapatillas")}
      />
      <Checkbox
        label="Accesorios"
        checked={filters.category.includes("accesorios")}
        onChange={() => toggleFilter("category", "accesorios")}
      />
    </FilterGroup>

    <FilterGroup title="Tipo de Juego (Palas)" defaultOpen={false}>
      <Checkbox
        label="Potencia"
        checked={filters.type.includes("potencia")}
        onChange={() => toggleFilter("type", "potencia")}
      />
      <Checkbox
        label="Control"
        checked={filters.type.includes("control")}
        onChange={() => toggleFilter("type", "control")}
      />
      <Checkbox
        label="Híbrido"
        checked={filters.type.includes("hibrida")}
        onChange={() => toggleFilter("type", "hibrida")}
      />
    </FilterGroup>

    <FilterGroup title="Precio Máximo" defaultOpen={true}>
      <input
        type="range"
        min="0"
        max="500000"
        step="10000"
        value={filters.priceRange[1]}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            priceRange: [0, parseInt(e.target.value)],
          }))
        }
        className="w-full accent-trexx-red h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs text-white/50 mt-2 font-mono">
        <span>$0</span>
        <span>${filters.priceRange[1].toLocaleString()}</span>
      </div>
    </FilterGroup>

    <FilterGroup title="Color" defaultOpen={true}>
      <div className="flex flex-wrap gap-3">
        {["cyan", "red", "gold", "green", "white", "black", "blue", "pink"].map(
          (color) => (
            <ColorSwatch
              key={color}
              color={color}
              selected={filters.color.includes(color)}
              onClick={() => toggleFilter("color", color)}
            />
          ),
        )}
      </div>
    </FilterGroup>
  </>
);

const FilterGroup = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-white/5 pb-6 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-white font-bold uppercase tracking-widest text-xs mb-4 hover:text-trexx-red transition-colors"
      >
        {title}
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-3 pl-1"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer group select-none">
    <div
      className={`w-4 h-4 border transition-all duration-200 flex items-center justify-center rounded-sm ${
        checked
          ? "bg-trexx-red border-trexx-red"
          : "border-white/30 group-hover:border-white"
      }`}
    >
      {checked && <Check size={10} className="text-white" strokeWidth={4} />}
    </div>
    <span
      className={`text-sm uppercase tracking-wide transition-colors ${
        checked
          ? "text-white font-bold"
          : "text-white/50 group-hover:text-white"
      }`}
    >
      {label}
    </span>
    <input
      type="checkbox"
      className="hidden"
      checked={checked}
      onChange={onChange}
    />
  </label>
);

const ColorSwatch = ({ color, selected, onClick }) => {
  const bgMap = {
    cyan: "bg-cyan-500",
    red: "bg-red-600",
    gold: "bg-yellow-500",
    green: "bg-green-600",
    white: "bg-white",
    black: "bg-gray-800",
    blue: "bg-blue-600",
    pink: "bg-pink-500",
  };

  return (
    <button
      onClick={onClick}
      className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
        bgMap[color] || "bg-gray-500"
      } ${
        selected
          ? "border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          : "border-transparent opacity-50 hover:opacity-100 hover:scale-110"
      }`}
    />
  );
};

// --- CORRECCIÓN: DEFINICIÓN DE COMPONENTE MEMOIZADO (SOLUCIÓN ERROR) ---
const ProductCard = memo(function ProductCard({ item }) {
  return (
    <Link
      to={`/shop/product/${item.id}`}
      className="group cursor-pointer block"
    >
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        style={{ willChange: "transform" }}
      >
        <div className="relative aspect-[3/4] bg-[#0a0a0a] rounded-sm overflow-hidden mb-4 border border-white/5 group-hover:border-white/20 transition-all duration-300">
          <img
            src={item.img}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button className="w-full bg-white text-black font-bold uppercase text-xs py-3 tracking-widest hover:bg-trexx-red hover:text-white transition-colors">
              Ver Detalles
            </button>
          </div>

          {item.price < 50000 && item.category !== "accesorios" && (
            <div className="absolute top-3 left-3 bg-trexx-red text-white text-[9px] font-black px-2 py-1 uppercase tracking-wider rounded-sm">
              Hot
            </div>
          )}
        </div>

        <div>
          <h3 className="text-white font-bold text-sm tracking-wide uppercase truncate">
            {item.name}
          </h3>
          <p className="text-gray-400 font-mono text-xs mt-1 font-bold">
            ${item.price.toLocaleString()}
          </p>
          <p className="text-[10px] text-white/30 uppercase mt-1">
            6 Cuotas sin interés
          </p>
        </div>
      </motion.div>
    </Link>
  );
});

export default Shop;
