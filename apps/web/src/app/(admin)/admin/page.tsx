import { productsService, categoriesService } from '@repo/api-client'
import Link from 'next/link'
import { Package, Plus, ShoppingBag, Layers, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function AdminDashboardPage() {
  const [productsRes, categoriesRes] = await Promise.allSettled([
    productsService.getAll(),
    categoriesService.getAll(),
  ])

  const products = productsRes.status === 'fulfilled' ? productsRes.value : []
  const categories = categoriesRes.status === 'fulfilled' ? categoriesRes.value : []
  
  const activeProductsCount = products.filter((p: any) => p.is_active).length

  const stats = [
    { label: 'Total Productos', value: products.length, icon: Package, highlight: false },
    { label: 'Productos Activos', value: activeProductsCount, icon: Package, highlight: true },
    { label: 'Categorías', value: categories.length, icon: Layers, highlight: false },
    { label: 'Pedidos Totales', value: '0', icon: ShoppingBag, highlight: false },
  ]

  return (
    <div className="space-y-10 animate-enter">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white">
            Panel de Control
          </h1>
          <p className="text-xs text-trexx-volt font-bold tracking-[0.2em] uppercase mt-1">
            Gestión de Catálogo y Sistema
          </p>
        </div>

        <Link href="/admin/products/new">
          <Button className="bg-trexx-volt text-black hover:bg-trexx-volt/90 font-bold tracking-wider uppercase text-xs gap-2 shadow-[0_0_20px_rgba(204,255,0,0.3)]">
            <Plus size={16} />
            <span>Nuevo Producto</span>
          </Button>
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div
              key={i}
              className={`p-6 rounded-sm bg-[#09090b] border ${
                stat.highlight ? 'border-trexx-volt/40 shadow-[0_0_15px_rgba(204,255,0,0.1)]' : 'border-white/10'
              } space-y-4`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
                  {stat.label}
                </span>
                <Icon size={18} className={stat.highlight ? 'text-trexx-volt' : 'text-white/40'} />
              </div>
              <p className="text-4xl font-black italic tracking-tighter text-white tabular-nums">
                {stat.value}
              </p>
            </div>
          )
        })}
      </div>

      {/* Quick Actions & Recent Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Products (8 cols) */}
        <div className="lg:col-span-8 bg-[#09090b] border border-white/10 p-6 rounded-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black italic tracking-tighter uppercase text-white">
              Últimos Productos
            </h2>
            <Link
              href="/admin/products"
              className="text-xs text-trexx-volt hover:underline font-bold tracking-wider uppercase flex items-center gap-1"
            >
              <span>Ver todos</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {products.slice(0, 5).map((p: any) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 rounded-sm bg-white/5 border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-12 bg-black rounded-sm overflow-hidden flex-shrink-0 border border-white/10">
                    {p.product_images?.[0]?.url || p.image ? (
                      <img
                        src={p.product_images?.[0]?.url || p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[8px] text-muted-foreground">
                        S/I
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white tracking-wide">{p.name}</p>
                    <p className="text-[10px] text-trexx-volt font-bold uppercase tracking-widest">
                      {p.categories?.name || 'Sin Categoría'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-white tabular-nums">${Number(p.price).toFixed(2)}</p>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                      p.is_active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                    }`}
                  >
                    {p.is_active ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shortcuts (4 cols) */}
        <div className="lg:col-span-4 bg-[#09090b] border border-white/10 p-6 rounded-sm space-y-6">
          <h2 className="text-xl font-black italic tracking-tighter uppercase text-white">
            Accesos Rápidos
          </h2>

          <div className="space-y-3">
            <Link
              href="/admin/products/new"
              className="flex items-center justify-between p-4 rounded-sm bg-trexx-volt/10 border border-trexx-volt/30 text-trexx-volt hover:bg-trexx-volt/20 transition-colors"
            >
              <span className="text-xs font-bold uppercase tracking-wider">Cargar Producto Nuevo</span>
              <Plus size={16} />
            </Link>

            <Link
              href="/admin/products"
              className="flex items-center justify-between p-4 rounded-sm bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              <span className="text-xs font-bold uppercase tracking-wider">Administrar Inventario</span>
              <Package size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
