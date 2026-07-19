import { AttributeValueAddModal } from './AttributeValueAddModal'
import { Sliders } from 'lucide-react'

interface AttributeValue {
  id: number
  value: string
  is_active?: boolean
}

interface AttributeType {
  id: number
  name: string
  slug?: string | null
  attribute_values?: AttributeValue[]
}

interface AttributeTypeListProps {
  attributeTypes: AttributeType[]
}

export function AttributeTypeList({ attributeTypes }: AttributeTypeListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {attributeTypes.map((type) => {
        const values = type.attribute_values || []

        return (
          <div
            key={type.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-trexx-red">
                    <Sliders size={16} />
                  </div>
                  <h2 className="text-base font-black uppercase tracking-wider text-gray-900">
                    {type.name}
                  </h2>
                </div>

                <AttributeValueAddModal attributeTypeId={type.id} attributeTypeName={type.name} />
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400">
                  Valores Configurados ({values.length})
                </p>

                {values.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">No hay valores agregados.</p>
                ) : (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {values.map((val) => (
                      <span
                        key={val.id}
                        className="bg-gray-50 border border-gray-200 text-gray-700 font-mono text-xs font-bold px-3 py-1.5 rounded-lg hover:border-trexx-red/30 hover:text-trexx-red hover:bg-red-50 transition-colors cursor-default"
                      >
                        {val.value}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 text-[10px] text-gray-400 font-mono">
              ID del Tipo: #{type.id}
            </div>
          </div>
        )
      })}
    </div>
  )
}
