<div align="center">

<img src="https://trexxpadel.vercel.app/trexx/logo.png" width="340" alt="Trexx Logo" />

# Trexx

**Plataforma de E-commerce especializada para el mercado de Pádel.**

[![Backend: NestJS 11](https://img.shields.io/badge/Backend-NestJS%2011%20%2F%20Fastify-E0234E?logo=nestjs)](https://nestjs.com/)
[![Frontend: Next.js 16](https://img.shields.io/badge/Frontend-Next.js%2016-000000?logo=next.js)](https://nextjs.org/)
[![Database: Supabase](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com/)
[![Monorepo: Turborepo](https://img.shields.io/badge/Monorepo-Turborepo-EF4444?logo=turborepo)](https://turbo.build/)
[![CI/CD: Vercel & Fly.io](https://img.shields.io/badge/CI%2FCD-Vercel%20%26%20Fly.io-8A2BE2?logo=vercel)](https://fly.io/)

Trexx es una plataforma moderna y escalable que permite a los amantes y comerciantes de pádel gestionar y realizar compras de equipamiento deportivo de manera rápida y segura.

[Explorar Características](#características-principales) • [Ver Arquitectura](#arquitectura-del-monorepo) • [Empezar a Desarrollar](#getting-started)

</div>

---

## Características Principales

- **Catálogo Especializado:** Gestión avanzada de productos de pádel (palas, indumentaria, calzado y accesorios), variantes de talles/colores y stock en tiempo real.
- **Rendimiento Excepcional:** Frontends construidos con **Next.js 16** (App Router y SSR), garantizando velocidades de carga ultrarrápidas y un SEO óptimo.
- **Backend Optimizado:** API REST potente en **NestJS 11** y **Fastify**, facilitando la mantenibilidad, validación rápida de esquemas con Zod y escalabilidad del negocio.
- **Autenticación e Integración:** Autenticación fluida con Supabase Auth que incluye flujos de confirmación de email y redirecciones automáticas a producción.
- **Monorepo Modular:** Gestión eficiente del código fuente usando **Turborepo** y **pnpm workspaces**, compartiendo tipos y utilidades en todo el proyecto.

---

## Stack Tecnológico

| Área | Tecnologías |
| :--- | :--- |
| **Backend API** | NestJS 11, Fastify, Prisma ORM, PostgreSQL |
| **Frontend** | Next.js 16, TypeScript, React, Tailwind CSS |
| **Herramientas** | Turborepo, pnpm (v10+), ESLint, Prettier |
| **Infraestructura** | Fly.io, Vercel, Supabase Auth |

---

## Arquitectura del Monorepo

El proyecto está estructurado para separar responsabilidades en distintas aplicaciones y compartir la lógica y el diseño a través de paquetes.

```text
trexx/
├── apps/
│   ├── web/          # Storefront: Tienda pública orientada al cliente final (Next.js)
│   └── api/          # Backend Centralizado: NestJS API que orquesta el negocio
├── packages/
│   ├── types/        # Modelos, interfaces y esquemas de validación unificados (Zod)
│   └── api-client/   # Cliente HTTP autogenerado con tipos a partir de OpenAPI
└── turbo.json        # Configuración de los flujos de Turborepo
```

---

## Getting Started

Sigue estos pasos para levantar el entorno de desarrollo local.

### 1. Prerrequisitos

Asegúrate de tener instalado:
- Node.js (v22+)
- pnpm (v10+)

### 2. Instalación de Dependencias

Clona el repositorio e instala todas las dependencias del monorepo desde la raíz:

```bash
git clone https://github.com/versoridevelopment/Trexx.git
cd Trexx
pnpm install
```

### 3. Configuración de Variables de Entorno

**Para el Frontend (Next.js):**
Crea un archivo `.env` en la carpeta `apps/web` e incluye las siguientes variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-supabase.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-supabase
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Para el Backend (NestJS):**
Crea un archivo `.env` en la carpeta `apps/api` e incluye las siguientes variables:

```env
PORT=3001
NODE_ENV=development
SUPABASE_URL=https://tu-supabase.supabase.co
SUPABASE_ANON_KEY=tu-anon-key-supabase
SUPABASE_JWT_SECRET=tu-jwt-secret-supabase
DATABASE_URL="postgresql://postgres.tu-db:password@aws-1-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres.tu-db:password@aws-1-sa-east-1.pooler.supabase.com:5432/postgres"
```

### 4. Compilación y Cliente de Base de Datos

Ejecuta los siguientes comandos desde la raíz para compilar tipos compartidos y configurar Prisma:

```bash
# Compilar tipos compartidos
pnpm --filter @repo/types build

# Generar cliente de Prisma
pnpm --filter @repo/api exec prisma generate
```

### 5. Ejecutar el Proyecto

Puedes levantar todo el ecosistema de forma concurrente:

```bash
pnpm run dev
```
- **Web:** [http://localhost:3000](http://localhost:3000)
- **API UI (Swagger):** [http://localhost:3001/docs](http://localhost:3001/docs)

---

## Comandos Disponibles

Desde la raíz del proyecto, Turborepo te permite orquestar todas las aplicaciones:

- `pnpm run dev` — Levanta los entornos de desarrollo de forma concurrente.
- `pnpm run build` — Genera los builds de producción, optimizando las aplicaciones mediante la caché de Turbo.
- `pnpm run lint` — Analiza el código de todos los workspaces utilizando ESLint.
