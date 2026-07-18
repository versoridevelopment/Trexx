"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  PackageSearch,
  Tags,
  ListTree,
  ShoppingCart,
  CreditCard,
  Users,
  MessageSquareQuote,
  Settings,
  ChevronDown,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
  isActive?: boolean;
}

function NavItem({ icon, label, href, children, isActive }: NavItemProps) {
  const { isExpanded, isHovered, openSubmenu, toggleSubmenu } = useSidebar();
  const isOpen = openSubmenu === label;
  const isSidebarOpen = isExpanded || isHovered;

  if (children) {
    return (
      <div className="flex flex-col gap-1 px-4 mb-1">
        <button
          onClick={() => toggleSubmenu(label)}
          className={cn(
            "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium transition-colors duration-300 ease-in-out",
            "hover:bg-zinc-800 hover:text-white",
            isOpen ? "bg-zinc-800 text-white" : "text-zinc-400"
          )}
        >
          {icon}
          {isSidebarOpen && (
            <>
              <span className="flex-1 text-left text-sm">{label}</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
            </>
          )}
        </button>
        {isSidebarOpen && (
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <ul className="mt-2 flex flex-col gap-1 pl-9">
              {children.map((child, idx) => (
                <li key={idx}>
                  <Link
                    href={child.href}
                    className={cn(
                      "group relative flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-zinc-400 duration-300 ease-in-out hover:text-white",
                      isActive && "text-white"
                    )}
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="px-4 mb-1">
      <Link
        href={href!}
        className={cn(
          "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium transition-colors duration-300 ease-in-out",
          "hover:bg-zinc-800 hover:text-white",
          isActive ? "bg-zinc-800 text-white" : "text-zinc-400"
        )}
      >
        {icon}
        {isSidebarOpen && <span className="text-sm">{label}</span>}
      </Link>
    </div>
  );
}

export function AdminSidebar() {
  const { isExpanded, isHovered, isMobileOpen, setIsHovered, toggleMobileSidebar } = useSidebar();
  const pathname = usePathname();

  return (
    <aside
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => !isExpanded && setIsHovered(false)}
      className={cn(
        "fixed left-0 top-0 z-50 flex h-screen flex-col overflow-y-hidden bg-[#1c2434] text-zinc-300 transition-all duration-300 ease-linear",
        (isExpanded || isHovered) ? "w-[290px]" : "w-[90px]",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5 lg:py-6">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="shrink-0 flex items-center justify-center">
            <Image src="/trexx/logo.png" alt="Trexx Logo" width={120} height={32} className={cn("object-contain transition-all duration-300", (isExpanded || isHovered) ? "w-[120px]" : "w-10 h-10 object-left overflow-hidden")} />
          </div>
        </Link>
        <button onClick={toggleMobileSidebar} className="block lg:hidden text-zinc-400 hover:text-white">
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-2 lg:mt-9 lg:px-4">
          <div>
            {(isExpanded || isHovered) && (
              <h3 className="mb-4 ml-4 text-xs font-semibold uppercase text-zinc-500">
                Principal
              </h3>
            )}
            <NavItem 
              icon={<LayoutDashboard className="h-5 w-5 shrink-0" />} 
              label="Inicio" 
              href="/admin" 
              isActive={pathname === "/admin"} 
            />
          </div>

          <div className="mt-6">
            {(isExpanded || isHovered) && (
              <h3 className="mb-4 ml-4 text-xs font-semibold uppercase text-zinc-500">
                Catálogo
              </h3>
            )}
            <NavItem 
              icon={<PackageSearch className="h-5 w-5 shrink-0" />} 
              label="Productos" 
              href="/admin/products"
              isActive={pathname.startsWith("/admin/products")} 
            />
            <NavItem 
              icon={<ListTree className="h-5 w-5 shrink-0" />} 
              label="Categorías" 
              href="/admin/categories"
              isActive={pathname.startsWith("/admin/categories")} 
            />
            <NavItem 
              icon={<Tags className="h-5 w-5 shrink-0" />} 
              label="Atributos" 
              href="/admin/attributes"
              isActive={pathname.startsWith("/admin/attributes")} 
            />
          </div>

          <div className="mt-6">
            {(isExpanded || isHovered) && (
              <h3 className="mb-4 ml-4 text-xs font-semibold uppercase text-zinc-500">
                Ventas
              </h3>
            )}
            <NavItem 
              icon={<ShoppingCart className="h-5 w-5 shrink-0" />} 
              label="Pedidos" 
              href="/admin/orders"
              isActive={pathname.startsWith("/admin/orders")} 
            />
            <NavItem 
              icon={<CreditCard className="h-5 w-5 shrink-0" />} 
              label="Pagos" 
              href="/admin/payments"
              isActive={pathname.startsWith("/admin/payments")} 
            />
          </div>

          <div className="mt-6">
            {(isExpanded || isHovered) && (
              <h3 className="mb-4 ml-4 text-xs font-semibold uppercase text-zinc-500">
                Usuarios
              </h3>
            )}
            <NavItem 
              icon={<Users className="h-5 w-5 shrink-0" />} 
              label="Clientes" 
              href="/admin/customers"
              isActive={pathname.startsWith("/admin/customers")} 
            />
            <NavItem 
              icon={<MessageSquareQuote className="h-5 w-5 shrink-0" />} 
              label="Reseñas" 
              href="/admin/reviews"
              isActive={pathname.startsWith("/admin/reviews")} 
            />
          </div>

          <div className="mt-6">
            {(isExpanded || isHovered) && (
              <h3 className="mb-4 ml-4 text-xs font-semibold uppercase text-zinc-500">
                Sistema
              </h3>
            )}
            <NavItem 
              icon={<Settings className="h-5 w-5 shrink-0" />} 
              label="Ajustes Generales" 
              href="/admin/settings"
              isActive={pathname.startsWith("/admin/settings")} 
            />
          </div>
        </nav>
      </div>
    </aside>
  );
}
