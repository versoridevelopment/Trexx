import { HeroManager } from '@/features/admin/home-config/components/HeroManager'
import { MarqueeManager } from '@/features/admin/home-config/components/MarqueeManager'
import { EquipmentManager } from '@/features/admin/home-config/components/EquipmentManager'
import { FeaturedProductsManager } from '@/features/admin/home-config/components/FeaturedProductsManager'
import { settingsService, productsService } from '@repo/api-client'

export const dynamic = 'force-dynamic'

export default async function HomeConfigPage() {
  const [heroSlides, marqueeConfig, equipmentConfig, featuredProductsConfig, allProducts] = await Promise.all([
    settingsService.getByKey('home_hero_slides'),
    settingsService.getByKey('home_marquee_config'),
    settingsService.getByKey('home_equipment_config'),
    settingsService.getByKey('home_featured_products'),
    productsService.getAll()
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Configuración Home</h1>
          <p className="text-muted-foreground text-sm">
            Administra las secciones dinámicas de la página de inicio.
          </p>
        </div>
      </div>

      <HeroManager initialSlides={heroSlides || []} />
      <MarqueeManager initialConfig={marqueeConfig || null} />
      <EquipmentManager initialConfig={equipmentConfig || null} />
      <FeaturedProductsManager initialConfig={featuredProductsConfig || null} allProducts={allProducts || []} />
    </div>
  )
}
