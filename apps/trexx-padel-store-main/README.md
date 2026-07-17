# 🎾 Trexx Padel Store

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

Tienda online moderna y de alto rendimiento especializada en artículos de pádel. Diseñada para ofrecer una experiencia de usuario premium con animaciones fluidas, carga rápida y un diseño visualmente impactante.

## ✨ Características Principales

- **Diseño Dinámico e Impactante**: Interfaz moderna con colores personalizados (`trexx-red`, `volt`) y modo oscuro por defecto para un "look and feel" inmersivo.
- **Animaciones Avanzadas**: Transiciones suaves y efectos de entrada/salida implementados con Framer Motion (`LazyMotion` para optimizar el bundle en producción).
- **Lazy Loading**: Carga diferida de componentes y de las distintas rutas para priorizar la velocidad (apoyado mediante `<Suspense>`).
- **Carrito de Compras**: Gestión de estado global de compras a través de React Context (`CartContext`) con apertura lateral rápida (tipo Drawer).
- **Diferentes Categorías**: Navegación sencilla desde la página principal hacia categorías específicas de pádel (Palas, Ropa, Zapatillas, Accesorios).
- **Insights de Rendimiento**: Analíticas integradas a través de *Vercel Speed Insights*.

## 🛠️ Tecnologías

- **Core**: React 19 + Vite + React Router DOM v7
- **Estilos y UI**: Tailwind CSS (PostCSS), Lucide React (iconografía)
- **Animaciones**: Framer Motion
- **Rendimiento**: `@vercel/speed-insights`, componentes asíncronos de React (`lazy`, `Suspense`)

## 🚀 Instalación y Ejecución Local

Para correr el proyecto en tu máquina local, sigue estos pasos:

1. **Clona el repositorio** o descarga los archivos temporales.
2. **Accede a la carpeta del proyecto**:
   ```bash
   cd trexx-padel-store
   ```
3. **Instala las dependencias**:
   ```bash
   npm install
   ```
4. **Levanta el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
5. **Abre en tu navegador**: La aplicación correrá por defecto en `http://localhost:5173`.

## 📂 Estructura del Proyecto

```text
src/
├── assets/         # Imágenes, iconos y otros recursos estáticos
├── components/     # Componentes reutilizables agrupados por contexto
│   ├── auth/       # Componentes de autenticación
│   ├── cart/       # Drawer y componentes del carrito de compras
│   ├── home/       # Secciones exclusivas de la landing page principal
│   ├── layout/     # Contenedores como Barra de navegación (Navbar) y pie (Footer)
│   ├── product/    # Tarjetas y elementos de las listas de productos
│   └── ui/         # Componentes genéricos (Preloader, Marquee animado, etc.)
├── context/        # Proveedores de estado globales (Ej: CartContext)
├── data/           # Datos estáticos de prueba y listados de items simulados
├── pages/          # Vistas principales y completas de la app (Shop, ProductDetail)
└── App.jsx         # Enrutamiento, configuración básica y Lazy Loading centralizado
```

## 📝 Scripts Disponibles

Dentro del directorio del proyecto, puedes correr:

- `npm run dev` - Inicia el entorno de desarrollo con Hot Module Replacement.
- `npm run build` - Construye y comprime los archivos estáticos listos para producción.
- `npm run preview` - Inicia un servidor local rápido para previsualizar el build de producción.
- `npm run lint` - Ejecuta ESLint sobre el proyecto para buscar errores rápidos.
