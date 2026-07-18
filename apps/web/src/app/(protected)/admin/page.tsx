import { Package, ShoppingCart, Users, DollarSign, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Inicio</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        
        {/* Card 1 */}
        <div className="rounded-xl border border-border bg-white dark:bg-zinc-950 px-7 py-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
            <DollarSign className="h-5 w-5 text-trexx-volt" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white text-2xl">
                $45,231.89
              </h4>
              <span className="text-sm font-medium text-zinc-500">Ingresos Totales</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-green-500">
              20.1%
              <ArrowUp className="h-4 w-4" />
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border border-border bg-white dark:bg-zinc-950 px-7 py-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
            <ShoppingCart className="h-5 w-5 text-trexx-volt" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white text-2xl">
                2,350
              </h4>
              <span className="text-sm font-medium text-zinc-500">Pedidos Totales</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-green-500">
              18.1%
              <ArrowUp className="h-4 w-4" />
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border border-border bg-white dark:bg-zinc-950 px-7 py-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
            <Package className="h-5 w-5 text-trexx-volt" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white text-2xl">
                12,234
              </h4>
              <span className="text-sm font-medium text-zinc-500">Total Productos</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-green-500">
              19.0%
              <ArrowUp className="h-4 w-4" />
            </span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="rounded-xl border border-border bg-white dark:bg-zinc-950 px-7 py-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
            <Users className="h-5 w-5 text-trexx-volt" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white text-2xl">
                573
              </h4>
              <span className="text-sm font-medium text-zinc-500">Usuarios Activos</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-red-500">
              2.5%
              <ArrowDown className="h-4 w-4" />
            </span>
          </div>
        </div>
        
      </div>
    </div>
  );
}
