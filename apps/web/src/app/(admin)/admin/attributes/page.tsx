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
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-6 border-b border-gray-200">
        <h1 className="text-2xl font-black uppercase text-gray-900 tracking-tight">
          Atributos Globales
        </h1>
        <p className="text-xs text-gray-400 font-semibold tracking-wider uppercase mt-1">
          {attributeTypes.length} tipo{attributeTypes.length !== 1 ? 's' : ''} de atributos configurado{attributeTypes.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Attribute Type Cards */}
      <AttributeTypeList attributeTypes={attributeTypes} />
    </div>
  )
}
