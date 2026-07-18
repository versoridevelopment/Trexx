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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {attributeTypes.map((type) => {
        const values = type.attribute_values || []

        return (
          <div
            key={type.id}
            className="bg-[#09090b] border border-white/10 p-6 rounded-sm space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Sliders size={18} className="text-trexx-volt" />
                  <h2 className="text-xl font-black italic tracking-tighter uppercase text-white">
                    {type.name}
                  </h2>
                </div>

                <AttributeValueAddModal attributeTypeId={type.id} attributeTypeName={type.name} />
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
                  Valores Configurados ({values.length})
                </p>

                {values.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic">No hay valores agregados.</p>
                ) : (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {values.map((val) => (
                      <span
                        key={val.id}
                        className="bg-white/5 border border-white/10 text-white font-mono text-xs font-bold px-3 py-1.5 rounded-sm hover:border-trexx-volt/50 transition-colors"
                      >
                        {val.value}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 text-[10px] text-muted-foreground font-mono">
              ID del Tipo: #{type.id}
            </div>
          </div>
        )
      })}
    </div>
  )
}
