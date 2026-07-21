import React from 'react'

export function ProductDescription({ description }: { description: string }) {
  if (!description) return null

  // Dividir el texto en bloques por cada salto de línea
  const lines = description
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  const elements: React.ReactNode[] = []
  let currentList: string[] = []

  const flushList = (key: number) => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${key}`} className="space-y-2 my-2 ml-2">
          {currentList.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="text-trexx-volt mt-[6px] text-[8px]">●</span>
              <span className="text-sm text-muted-foreground leading-relaxed font-medium">
                {item}
              </span>
            </li>
          ))}
        </ul>
      )
      currentList = []
    }
  }

  lines.forEach((line, i) => {
    // Detectar si es un bullet point (- o * o • seguido de espacio)
    const isBullet = /^[-*•]\s+/.test(line)

    if (isBullet) {
      const text = line.replace(/^[-*•]\s+/, '')
      currentList.push(text)
    } else {
      flushList(i) // Si veníamos juntando items de lista, los volcamos
      elements.push(
        <p key={`p-${i}`} className="text-sm text-muted-foreground leading-relaxed font-medium">
          {line}
        </p>
      )
    }
  })

  // Volcar cualquier lista remanente al final
  flushList(lines.length)

  return <div className="space-y-4">{elements}</div>
}
