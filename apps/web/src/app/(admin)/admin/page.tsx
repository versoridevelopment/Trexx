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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-black uppercase text-gray-900 tracking-tight">
            Panel de Control
          </h1>
          <p className="text-xs text-gray-400 font-semibold tracking-wider uppercase mt-1">
            Gestión de Catálogo y Sistema
          </p>
        </div>

        <Link href="/admin/products/new">
          <Button className="bg-trexx-red text-white hover:bg-red-700 font-bold tracking-wider uppercase text-xs gap-2 shadow-sm">
            <Plus size={15} />
            <span>Nuevo Producto</span>
          </Button>
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div
              key={i}
              className={`p-5 rounded-xl bg-white border shadow-sm space-y-3 ${
                stat.highlight
                  ? 'border-trexx-red/20 shadow-red-100'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400">
                  {stat.label}
                </span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  stat.highlight ? 'bg-red-50 text-trexx-red' : 'bg-gray-100 text-gray-400'
                }`}>
                  <Icon size={16} />
                </div>
              </div>
              <p className="text-4xl font-black tracking-tight text-gray-900 tabular-nums">
                {stat.value}
              </p>
            </div>
          )
        })}
      </div>

      {/* Quick Actions & Recent Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Products (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-wider text-gray-900">
              Últimos Productos
            </h2>
            <Link
              href="/admin/products"
              className="text-xs text-trexx-red hover:text-red-700 font-bold tracking-wider uppercase flex items-center gap-1 transition-colors"
            >
              <span>Ver todos</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="space-y-2">
            {products.slice(0, 5).map((p: any) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                    {p.product_images?.[0]?.url || p.image ? (
                      <img
                        src={p.product_images?.[0]?.url || p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[8px] text-gray-400">
                        S/I
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{p.name}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-trexx-red">
                      {p.categories?.name || 'Sin Categoría'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-gray-900 tabular-nums">${Number(p.price).toFixed(2)}</p>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      p.is_active
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-red-50 text-trexx-red border border-red-200'
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
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-5">
          <h2 className="text-sm font-black uppercase tracking-wider text-gray-900">
            Accesos Rápidos
          </h2>

          <div className="space-y-3">
            <Link
              href="/admin/products/new"
              className="flex items-center justify-between p-4 rounded-xl bg-red-50 border border-red-100 text-trexx-red hover:bg-red-100 transition-colors"
            >
              <span className="text-xs font-bold uppercase tracking-wider">Cargar Producto Nuevo</span>
              <Plus size={15} />
            </Link>

            <Link
              href="/admin/products"
              className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <span className="text-xs font-bold uppercase tracking-wider">Administrar Inventario</span>
              <Package size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
