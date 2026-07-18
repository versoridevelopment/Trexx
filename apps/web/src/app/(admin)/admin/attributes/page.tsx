import { attributeTypesService } from '@repo/api-client'
import { AttributeTypeList } from '@/features/admin/attributes/components/AttributeTypeList'

export const dynamic = 'force-dynamic'

export default async function AdminAttributesPage() {
  let attributeTypes: any[] = []
  try {
    attributeTypes = await attributeTypesService.getAll()
  } catch (error) {
    console.error('Error fetching attribute types:', error)
  }

  return (
    <div className="space-y-8 animate-enter">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white">
          Atributos Globales
        </h1>
        <p className="text-xs text-trexx-volt font-bold tracking-[0.2em] uppercase mt-1">
          Dimensiones de Variantes ({attributeTypes.length} tipos de atributos)
        </p>
      </div>

      {/* Attribute Type Cards */}
      <AttributeTypeList attributeTypes={attributeTypes} />
    </div>
  )
}
