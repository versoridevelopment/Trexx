# Contexto de Migración: Trexx Padel Store -> Monorepo

Este documento contiene la información extraída del proyecto anterior de Trexx Padel (Vite + React) para que sea utilizada como referencia en la implementación dentro de este nuevo monorepo (Next.js + NestJS).

## 1. Branding y Estilos Visuales

El proyecto anterior se basa en un diseño oscuro y moderno con animaciones.

**Colores Clave (Tailwind Config):**
- **Fondo General App:** `#050505`
- **Fondo Tailwind (`trexx.bg`):** `#09090b`
- **Fondo de Tarjetas (`trexx.card`):** `#18181b`
- **Bordes (`trexx.border`):** `#27272a`
- **Acento Rojo (`trexx.red`):** `#dc2626`
- **Acento Volt (`trexx.volt`):** `#ccff00` (Lima Neón)
- **Texto Principal (`trexx.text`):** `#fafafa`
- **Texto Secundario (`trexx.muted`):** `#a1a1aa`

**Tipografía:**
- Familia: `Inter` (sans-serif)

## 2. Pantalla de Carga (Preloader)

El preloader original (construido con Framer Motion) tiene el siguiente comportamiento para replicar:
- **Fondo:** `#050505` en pantalla completa (`fixed inset-0 z-[9999]`).
- **Logo:** Una imagen del logo (`/images/logo.png`) que se encuentra sobre un "resplandor".
- **Resplandor (Glow):** Un div circular detrás del logo con color rojo (`bg-trexx-red`), desenfocado (`blur-[40px]`), que pulsa su escala y opacidad.
- **Indicador de Carga:** Tres pequeños círculos rojos debajo del logo que rebotan alternadamente (`y: [0, -10, 0]`).
- **Lógica de desmontaje:** El loader espera a que se carguen 2 recursos principales (la imagen del hero y un video) antes de desaparecer con un fade out (`opacity: 0`).

## 3. Estructura de Datos de Productos

En el proyecto anterior, los productos estaban mockeados en un arreglo de objetos. Al modelar Prisma/NestJS, considera los siguientes campos y tipos:

**Modelo Base de Producto:**
- `id`: number (en el mock eran IDs manuales, en db usar UUID o autoincremental)
- `name`: string
- `price`: number
- `transferPrice`: number (precio con descuento por transferencia)
- `installments`: number (cuotas, por defecto 6)
- `stock`: number (0 representa SIN STOCK)
- `category`: string (Valores: `"palas"`, `"accesorios"`, `"zapatillas"`, `"ropa"`)
- `color`: string (Ej: `"white"`, `"cyan"`, `"red"`, `"gold"`, `"black"`)
- `img`: string (path de la imagen)
- `description`: string
- `features`: string[] (array de strings con características)

**Campos Específicos por Categoría:**
- **Palas:** Tienen el campo `type` (`"potencia"`, `"hibrida"`, `"control"`).
- **Zapatillas/Ropa:** Tienen el campo `gender` (`"unisex"`, `"hombre"`).

## 4. Estructura de Rutas y Navegación

Las rutas del e-commerce (que ahora migrarán al App Router de Next.js `apps/web/src/app`) son:

- `/` : Landing Page (Hero de nuevo lanzamiento, Video, Carrusel infinito, Productos destacados, Formulario de contacto).
- `/shop` : Tienda completa.
- `/palas` : Filtro tienda por palas.
- `/ropa` : Filtro tienda por ropa.
- `/zapatillas` : Filtro tienda por zapatillas.
- `/accesorios` : Filtro tienda por accesorios.
- `/shop/product/:id` : Detalle del producto.
- `/historia`, `/tecnologia`, `/jugadores` : Páginas estáticas / informativas.
- `/admin/*` : Rutas de administración (Productos, Pedidos, etc. - probablemente requiera protección con Supabase Auth).

## 5. Componentes Clave de UI a Migrar

- `NewReleaseHero` y `VideoHero` (con lógica de precarga).
- `InfiniteMarquee`: Carrusel infinito horizontal.
- `SectionDivider`: Divisores de secciones con texto grande.
- `CartDrawer`: Carrito lateral desplegable.

---
**Nota para el Agente:** Usa esta referencia para recrear los componentes en el framework moderno (FSD) y adaptar la base de datos (Prisma) usando estos esquemas de datos como punto de partida.
