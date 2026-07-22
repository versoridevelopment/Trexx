<p align="center">
  <a href="https://trexxpadel.vercel.app" target="_blank">
    <img src="https://trexxpadel.vercel.app/logo.png" width="240" alt="Trexx Padel Logo" />
  </a>
</p>

<p align="center">Plataforma Profesional de E-commerce para el mercado de Pádel argentino.</p>

<p align="center">
  <a href="https://nestjs.com/" target="_blank"><img src="https://img.shields.io/badge/Backend-NestJS%2011%20%2F%20Fastify-E0234E.svg" alt="Backend" /></a>
  <a href="https://nextjs.org/" target="_blank"><img src="https://img.shields.io/badge/Frontend-Next.js%2016-000000.svg" alt="Frontend" /></a>
  <a href="https://supabase.com/" target="_blank"><img src="https://img.shields.io/badge/Database-Supabase%20PostgreSQL-3ECF8E.svg" alt="Database" /></a>
  <a href="https://turbo.build/" target="_blank"><img src="https://img.shields.io/badge/Monorepo-Turborepo%20%2F%20pnpm-EF4444.svg" alt="Monorepo" /></a>
  <a href="https://vercel.com/" target="_blank"><img src="https://img.shields.io/badge/Hosting-Vercel%20%26%20Fly.io-8A2BE2.svg" alt="Hosting" /></a>
</p>

**Trexx Padel** es una plataforma moderna y escalable de comercio electrónico optimizada para la venta y distribución de equipamiento deportivo de pádel. Implementada a través de un monorepo robusto, integra tecnologías líderes en rendimiento, tipado estricto extremo y despliegue automático en la nube.

---

## 🏗️ Arquitectura y Flujo del Monorepo

El proyecto está organizado en un **Monorepo** orquestado por **Turborepo** y gestionado eficientemente mediante workspaces de **pnpm**:

- **`apps/web` (Frontend):** Aplicación Next.js 16 con App Router, Server Components para optimización de SEO/rendimiento y diseño responsivo premium. Se despliega automáticamente en **Vercel** (nodo en São Paulo para latencia mínima).
- **`apps/api` (Backend):** Servidor NestJS 11 con motor de alto rendimiento **Fastify** que valida esquemas a alta velocidad. Se aloja en **Fly.io** (São Paulo).
- **`packages/types`:** Tipos TypeScript y validaciones de esquema **Zod** compartidas entre el Backend y el Frontend (fuente única de verdad).
- **`packages/api-client`:** Cliente de consumo HTTP tipado autogenerado a partir de OpenAPI/Swagger.

---

## 📦 Stack Tecnológico

| Herramienta | Rol en la Plataforma |
|---|---|
| **Next.js 16** | Frontend interactivo y Server-Side Rendering (SSR). |
| **NestJS 11 + Fastify** | Backend modular, estructurado e inyección de dependencias sólida. |
| **Prisma ORM** | Modelado de datos y consultas tipadas sobre PostgreSQL. |
| **Supabase (Auth & PG)** | Base de datos PostgreSQL alojada en Brasil con Autenticación gestionada. |
| **Turborepo & pnpm** | Orquestación, caché y velocidad de compilación en el monorepo. |
| **Zod** | Esquemas de validación unificados en la capa de datos. |

---

## ⚙️ Configuración y Puesta en Marcha (Local)

### 📋 Prerrequisitos
- **Node.js** v22+
- **pnpm** v10+

### 🛠️ Guía Paso a Paso

#### 1. Clonar e Instalar
```bash
git clone https://github.com/versoridevelopment/Trexx.git
cd Trexx
pnpm install
```

#### 2. Variables de Entorno (`.env`)

Crea los archivos de entorno locales:

- **Frontend (`apps/web/.env`):**
  ```env
  NEXT_PUBLIC_SUPABASE_URL=https://tu-supabase.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
  NEXT_PUBLIC_APP_URL=http://localhost:3000
  NEXT_PUBLIC_API_URL=http://localhost:3001
  ```

- **Backend (`apps/api/.env`):**
  ```env
  PORT=3001
  NODE_ENV=development
  SUPABASE_URL=https://tu-supabase.supabase.co
  SUPABASE_ANON_KEY=tu-anon-key
  SUPABASE_JWT_SECRET=tu-jwt-secret
  DATABASE_URL="postgresql://postgres.tu-db:password@aws-1-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
  DIRECT_URL="postgresql://postgres.tu-db:password@aws-1-sa-east-1.pooler.supabase.com:5432/postgres"
  ```

#### 3. Compilación Inicial y Base de Datos
```bash
# Compilar tipos compartidos
pnpm --filter @repo/types build

# Generar cliente de Prisma
pnpm --filter @repo/api exec prisma generate

# Sincronizar esquema de base de datos con Supabase
pnpm --filter @repo/api exec prisma db push
```

#### 4. Levantar en Desarrollo
```bash
pnpm dev
```
- **Web:** [http://localhost:3000](http://localhost:3000)
- **API UI (Swagger Docs):** [http://localhost:3001/docs](http://localhost:3001/docs)

---

## 🚀 Pipeline de Despliegue (CI/CD)

El monorepo está diseñado para automatizar los despliegues en cada actualización en la rama principal (`main`):

### 1. Frontend en Vercel
Vercel compila el monorepo y levanta la aplicación web en [https://trexxpadel.vercel.app](https://trexxpadel.vercel.app). Las variables de entorno se declaran en el dashboard del proyecto.

### 2. Backend en Fly.io (GitHub Actions)
Configurado mediante [.github/workflows/fly-deploy.yml](.github/workflows/fly-deploy.yml):
- Al realizar un `git push origin main`, se analiza si hubo cambios en `apps/api` o `packages/**`.
- Si existen cambios, se ejecuta el workflow de GitHub, compilando la imagen utilizando el [Dockerfile](Dockerfile) multi-stage optimizado (`pnpm deploy`) y levantando la API de producción en São Paulo (`https://trexx-api.fly.dev`).

*(Requiere configurar el secret `FLY_API_TOKEN` en GitHub).*
