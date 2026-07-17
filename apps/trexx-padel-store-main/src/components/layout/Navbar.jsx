import { Link, useLocation, useSearchParams } from "react-router-dom";
import { ShoppingBag, Menu, X, User, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";

// --- IMPORTANTE: CORRECCIÓN DEL ERROR 'useCart is not defined' ---
import { useCart } from "../../context/CartContext";

// IMPORTAMOS LOS MODALES
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";
import ForgotPasswordModal from "../auth/ForgotPasswordModal";

// ESTRUCTURA DEL MENÚ
const MENU_ITEMS = [
  { label: "TODO", path: "/shop?category=all" },
  { label: "PALAS", path: "/shop?category=palas" },
  {
    label: "INDUMENTARIA",
    path: "/shop?category=ropa",
    submenu: [
      { label: "HOMBRE", path: "/shop?category=ropaHombre" },
      { label: "MUJER", path: "/shop?category=ropaMujer" },
    ],
  },
  { label: "ZAPATILLAS", path: "/shop?category=zapatillas" },
  { label: "ACCESORIOS", path: "/shop?category=accesorios" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [authModal, setAuthModal] = useState(null);

  // Hooks del Carrito (Ahora sí importados)
  const { cartCount, toggleCart } = useCart();

  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category");
  const location = useLocation();

  const { scrollY } = useScroll();

  // useEffect condicional para cerrar menú al navegar
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) setIsHidden(true);
    else setIsHidden(false);

    if (latest > 50) setIsScrolled(true);
    else setIsScrolled(false);
  });

  const navVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: "-100%", opacity: 0 },
  };

  const isActive = (path) => {
    if (location.pathname !== "/shop") return false;
    const pathCategory = new URLSearchParams(path.split("?")[1]).get(
      "category",
    );
    if (
      pathCategory === "ropa" &&
      (currentCategory === "ropaHombre" || currentCategory === "ropaMujer")
    )
      return true;
    return currentCategory === pathCategory;
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed w-full z-50 top-0 start-0 transition-all duration-500 ${
          isScrolled
            ? "bg-[#050505]/90 backdrop-blur-md border-b border-white/10 py-3"
            : "bg-transparent py-6"
        }`}
        onMouseLeave={() => setHoveredMenu(null)}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-6 relative">
          {/* --- LOGO (IMAGEN) --- */}
          <Link to="/" className="group flex items-center z-50 mr-8">
            <motion.img
              src="/images/logo.png"
              alt="TREXX PADEL"
              className="h-8 md:h-10 w-auto object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </Link>

          {/* MENÚ DE NAVEGACIÓN (DESKTOP) */}
          <div className="flex-1 flex justify-center pl-0 md:pl-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hidden md:flex items-center gap-8 font-bold text-xs tracking-[0.15em]"
            >
              {MENU_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative group h-full py-2"
                  onMouseEnter={() => setHoveredMenu(item.label)}
                >
                  <Link
                    to={item.path}
                    className={`relative flex items-center gap-1 transition-colors ${
                      isActive(item.path)
                        ? "text-trexx-red"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {item.submenu && (
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-300 ${hoveredMenu === item.label ? "rotate-180 text-trexx-red" : ""}`}
                      />
                    )}
                    {isActive(item.path) && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 w-full h-[2px] bg-trexx-red"
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.submenu && hoveredMenu === item.label && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 10,
                          clipPath: "inset(0% 0% 100% 0%)",
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          clipPath: "inset(0% 0% -20% 0%)",
                        }}
                        exit={{
                          opacity: 0,
                          y: 5,
                          clipPath: "inset(0% 0% 100% 0%)",
                        }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-4 w-48 bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden"
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-trexx-red"></div>
                        <div className="flex flex-col py-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.label}
                              to={subItem.path}
                              className={`px-6 py-3 transition-all text-[10px] tracking-[0.2em] font-bold block ${
                                isActive(subItem.path)
                                  ? "text-white bg-white/10"
                                  : "text-gray-400 hover:text-white hover:bg-white/5"
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ICONOS (DERECHA) */}
          <div className="flex items-center gap-5 text-white z-50 pl-4">
            {/* Login Trigger */}
            <motion.button
              onClick={() => setAuthModal("login")}
              whileHover={{ scale: 1.1 }}
              className="hover:text-trexx-red transition-colors hidden sm:block"
            >
              <User size={20} strokeWidth={2} />
            </motion.button>

            {/* BOTÓN CARRITO */}
            <button
              onClick={toggleCart}
              className="relative hover:text-trexx-red transition-colors group"
            >
              <ShoppingBag size={20} strokeWidth={2} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-trexx-red text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full shadow-lg"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* TOGGLE MENÚ MÓVIL */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white hover:text-trexx-red transition-colors ml-2"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* MENÚ MÓVIL (OVERLAY) */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed inset-0 top-[70px] z-40 bg-[#050505]/95 backdrop-blur-xl border-t border-white/10 p-8 md:hidden flex flex-col gap-8 h-[calc(100vh-70px)] overflow-y-auto"
              >
                {MENU_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="w-full flex flex-col border-b border-white/5 pb-4 last:border-0"
                  >
                    <Link
                      to={item.path}
                      onClick={() => !item.submenu && setIsOpen(false)}
                      className={`text-3xl font-black italic tracking-tighter transition-colors uppercase ${isActive(item.path) ? "text-trexx-red" : "text-white hover:text-trexx-red"}`}
                    >
                      {item.label}
                    </Link>
                    {item.submenu && (
                      <div className="flex flex-col gap-3 mt-3 pl-4 border-l border-white/20">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.path}
                            onClick={() => setIsOpen(false)}
                            className={`text-sm tracking-widest uppercase font-bold ${isActive(sub.path) ? "text-white" : "text-gray-400"}`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Botón Login Móvil */}
                <div className="mt-auto pb-8 w-full">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setAuthModal("login");
                    }}
                    className="w-full py-4 border border-white/20 text-white font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-3"
                  >
                    <User size={18} /> Iniciar Sesión
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* --- GESTIÓN DE MODALES --- */}
      <AnimatePresence>
        {authModal === "login" && (
          <LoginModal
            isOpen={true}
            onClose={() => setAuthModal(null)}
            onSwitchToRegister={() => setAuthModal("register")}
            onSwitchToForgot={() => setAuthModal("forgot-password")}
          />
        )}
        {authModal === "register" && (
          <RegisterModal
            isOpen={true}
            onClose={() => setAuthModal(null)}
            onSwitchToLogin={() => setAuthModal("login")}
          />
        )}
        {authModal === "forgot-password" && (
          <ForgotPasswordModal
            isOpen={true}
            onClose={() => setAuthModal(null)}
            onSwitchToLogin={() => setAuthModal("login")}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
