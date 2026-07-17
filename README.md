# 🚀 Modern Monorepo — Fullstack Store

Este es un proyecto personal dedicado a la práctica y dominio de arquitecturas modernas y escalables en el ecosistema JavaScript/TypeScript. Se trata de un **Monorepo** que implementa una tienda virtual completa, integrando un frontend robusto con un backend modular.

---

## 🏗️ Arquitectura y Metodologías

El proyecto destaca por el uso de patrones de diseño avanzados:

- **Feature-Sliced Design (FSD)**: En `apps/web` se implementa esta arquitectura para garantizar la modularidad, mantenibilidad y escalabilidad del frontend.
- **Clean Architecture (Golden Standard)**: El backend (`apps/api`) sigue una arquitectura de 4 capas con inyección de dependencias total y mappers desacoplados.
- **Fastify Backend Engine**: Migración de Express a **Fastify** para lograr una arquitectura de alto rendimiento, baja latencia y validación de esquemas optimizada.
- **Type-Safe Everywhere (Zod)**: Uso de **Zod** como fuente única de verdad para esquemas y tipado compartido en todo el monorepo.

---

## 📦 Stack Tecnológico

| Herramienta | Rol |
|---|---|
| [Next.js 15+](https://nextjs.org/) | **Frontend** — React con App Router y Server Components |
| [NestJS 11 + Fastify](https://nestjs.com/) | **Backend** — API REST de alto rendimiento con motor Fastify |
| [Supabase Auth](https://supabase.com/auth) | **Autenticación** — Gestión de sesiones, login y registro |
| [Passport & JWT](http://www.passportjs.org/) | **Seguridad** — Validación de JWT de Supabase en el backend |
| [Swagger / OpenAPI](https://swagger.io/) | **Documentación** — Especificación y UI interactiva de la API |
| [Prisma ORM](https://www.prisma.io/) | **Base de Datos** — Gestión de esquemas (`auth` y `public`) y consultas |
| [Turborepo](https://turbo.build/) | **Orquestador** — Gestión inteligente de tareas y cache |
| [pnpm](https://pnpm.io/) | **Package Manager** — Gestión eficiente de dependencias con workspaces |
| [Zod](https://zod.dev/) | **Validation** — Fuente única de verdad para esquemas y tipado compartido |
| [nestjs-zod](https://github.com/risu74/nestjs-zod) | **Integration** — Validación automática y Swagger a partir de Zod |
| [openapi-typescript](https://openapi-ts.pages.dev/) | **Type Safety** — Generación de tipos TS a partir de OpenAPI |


---

## 🗂️ Estructura del Monorepo

```
my-monorepo/
├── apps/
│   ├── web/          # Frontend Next.js (Architecture-driven / FSD)
│   └── api/          # Backend NestJS (Modular Architecture)
├── packages/
│   ├── types/        # Tipos de TypeScript compartidos (@repo/types)
│   └── api-client/   # Cliente HTTP autogenerado con tipos (@repo/api-client)
├── turbo.json        # Configuración de pipelines
└── pnpm-workspace.yaml
```

---

## ⚙️ Primeros Pasos (Levantar desde Cero)

### 📋 Prerrequisitos
- [Node.js](https://nodejs.org/) v20+ (Recomendado v24+ o v25+)
- [pnpm](https://pnpm.io/) v9+ o superior
- Un proyecto creado en [Supabase](https://supabase.com/) listo.

---

### 🛠️ Guía de Configuración Paso a Paso

Sigue estos pasos en orden para levantar todo el entorno de desarrollo de forma local:

#### 1. Clonar el repositorio e instalar dependencias
```bash
git clone https://github.com/IvanRomeroMaurin/Trabajo-Campo-Ing-II.git
cd Trabajo-Campo-Ing-II
pnpm install
```

#### 2. Configurar las variables de entorno (`.env`)
Debes crear los archivos de variables de entorno para que el frontend y el backend puedan comunicarse con Supabase.

##### A. Configurar el Frontend
Crea el archivo [apps/web/.env](file:///home/ivan-romero-maurin/projects/versori/test-eccomers-turborepo/apps/web/.env):
```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-de-supabase
NEXT_PUBLIC_APP_URL=http://localhost:3000
API_URL=http://localhost:3001
```

##### B. Configurar el Backend
Crea el archivo [apps/api/.env](file:///home/ivan-romero-maurin/projects/versori/test-eccomers-turborepo/apps/api/.env):
```env
PORT=3001
NODE_ENV=development

SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-anon-key-de-supabase
SUPABASE_JWT_SECRET=tu-jwt-secret-de-supabase

# NOTA: Consigue estas cadenas de conexión URI en la sección Settings > Database de tu panel de Supabase
# DATABASE_URL: Usa el puerto del concentrador de conexiones (generalmente 6543)
DATABASE_URL="postgresql://postgres.tu-proyecto:tu-contrasena@aws-1-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
# DIRECT_URL: Se conecta de forma directa (puerto 5432) para las migraciones y schema push de Prisma
DIRECT_URL="postgresql://postgres.tu-proyecto:tu-contrasena@aws-1-sa-east-1.pooler.supabase.com:5432/postgres"
```

#### 3. Compilar los paquetes internos compartidos
Compila los paquetes compartidos del monorepo (como `@repo/types`) para evitar errores de módulos faltantes durante el inicio:
```bash
pnpm --filter @repo/types build
```

#### 4. Sincronizar el esquema con tu Base de Datos de Supabase
Empuja el esquema de base de datos relacional definido en Prisma a tu nueva instancia de Supabase:
```bash
pnpm --filter @repo/api exec prisma db push
```

#### 5. Generar el cliente de Prisma
Genera los tipos y el cliente de Prisma adaptados a tu backend:
```bash
pnpm --filter @repo/api exec prisma generate
```

#### 6. Levantar los servidores en desarrollo
Ahora puedes iniciar tanto la web como el servidor NestJS en paralelo:
```bash
pnpm dev
```

| Aplicación | Dirección Local |
|---|---|
| **Frontend (Next.js)** | [http://localhost:3000](http://localhost:3000) |
| **Backend (NestJS)** | [http://localhost:3001/api](http://localhost:3001/api) |
| **Documentación (Swagger)** | [http://localhost:3001/docs](http://localhost:3001/docs) |

---

## 🛠️ Scripts Clave

- `pnpm dev`: Inicia el modo desarrollo (Web + API).
- `pnpm build`: Compila todo el monorepo.
- `pnpm generate:api`: Sincroniza los tipos del `api-client` con el backend.
- `pnpm db:generate`: Regenera el cliente de Prisma.

---

## 📄 Notas de Implementación

Este proyecto se utiliza como laboratorio para implementar:
- **Auth Flow**: Registro con confirmación de email y redirección segura.
- **Database Synchronization**: Sincronización automática de perfiles mediante triggers de PostgreSQL.
- **Type-Safe Everywhere**: Migración progresiva de interfaces manuales a esquemas de **Zod** para validación en tiempo de ejecución coordinada entre API y Frontend.
- **High-Performance Engine**: Sustitución de Express por **Fastify** en el backend para maximizar el throughput y reducir la latencia del sistema.
- **Modern UI**: Frontend basado en Server Components para máximo rendimiento y SEO.
- **ESM Standard**: Implementación adaptada a los estándares modernos de Node.js (v24+) y resolución de módulos estricta.
