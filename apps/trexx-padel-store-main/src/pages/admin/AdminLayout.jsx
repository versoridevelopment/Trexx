import { Outlet, Link, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/admin", current: location.pathname === "/admin" },
    { name: "Productos", href: "/admin/productos", current: location.pathname.includes("/admin/productos") },
    { name: "Pedidos", href: "/admin/pedidos", current: location.pathname.includes("/admin/pedidos") },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex pt-20">
      {/* Sidebar */}
      <div className="w-64 bg-[#0a0a0a] border-r border-white/10 flex flex-col fixed h-full z-10">
        <div className="p-6">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter">
            TREXX <span className="text-trexx-red">ADMIN</span>
          </h2>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`block px-4 py-3 rounded-lg text-sm font-medium tracking-wide uppercase transition-colors ${
                item.current
                  ? "bg-trexx-red text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link
            to="/"
            className="block px-4 py-2 text-sm text-white/50 hover:text-white transition-colors uppercase tracking-widest text-center"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
