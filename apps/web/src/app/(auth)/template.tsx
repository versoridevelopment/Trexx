export default function AuthTemplate({ children }: { children: React.ReactNode }) {
  // En Next.js App Router, los archivos template.tsx se vuelven a montar 
  // (re-mount) en cada navegación entre rutas hermanas. 
  // Esto es perfecto para disparar animaciones CSS de entrada (como .animate-enter)
  return (
    <div className="animate-enter w-full">
      {children}
    </div>
  )
}
