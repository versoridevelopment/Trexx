# Documentación de la API — módulos NestJS

Este documento describe **todos los métodos/endpoints de la API** expuestos por cada módulo del backend, además de la documentación en formato JSDoc que se agregó directamente en cada `*.controller.ts` dentro del zip.

Convenciones:
- **Auth**: guard(s) aplicado(s). `Público` = sin guard. `Supabase` = `SupabaseAuthGuard` (requiere JWT válido de Supabase en el header `Authorization: Bearer <token>`). `Admin` = además de Supabase, requiere `RolesGuard` + `@Roles('admin')`.
- Los IDs se validan con `Number()`, `BigInt()` o `ParseIntPipe` según el módulo (ver detalle en cada tabla).
- La mayoría de los módulos implementa **soft delete** (`remove` no borra físicamente) y expone un endpoint `restore` para revertirlo.

---

## 1. `auth` (módulo transversal, sin controller propio)

No expone endpoints REST propios. Provee la infraestructura de autenticación/autorización usada por el resto de los módulos:

| Archivo | Descripción |
|---|---|
| `supabase.strategy.ts` | Estrategia Passport que valida el JWT emitido por Supabase Auth. |
| `supabase-auth.guard.ts` | Guard (`SupabaseAuthGuard`) que exige un JWT válido; adjunta el usuario decodificado al `request`. |
| `guards/roles.guard.ts` | Guard (`RolesGuard`) que verifica que el usuario autenticado tenga alguno de los roles requeridos por `@Roles(...)`. |
| `decorators/current-user.decorator.ts` | Decorador `@CurrentUser()` para inyectar el usuario autenticado en los controllers. |
| `decorators/roles.decorator.ts` | Decorador `@Roles('admin', ...)` para declarar qué roles puede acceder a un endpoint. |

---

## 2. `cities` — `/cities`

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | `/cities` | Supabase | Crea una ciudad. |
| GET | `/cities` | Público | Lista todas las ciudades. |
| GET | `/cities/:id` | Supabase | Obtiene una ciudad por ID. |
| PATCH | `/cities/:id` | Supabase | Actualiza parcialmente una ciudad. |
| DELETE | `/cities/:id` | Supabase | Elimina (soft delete) una ciudad. |

---

## 3. `addresses` — `/addresses`

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | `/addresses/me` | Supabase | Direcciones del usuario autenticado (usa `@CurrentUser()`; si el service no implementa `findMe`, devuelve `[]`). |
| POST | `/addresses` | Supabase | Crea una dirección. |
| GET | `/addresses` | Público | Lista todas las direcciones. |
| GET | `/addresses/:id` | Supabase | Obtiene una dirección por ID. |
| PATCH | `/addresses/:id` | Supabase | Actualiza parcialmente una dirección. |
| DELETE | `/addresses/:id` | Supabase | Elimina (soft delete) una dirección. |

---

## 4. `attribute-types` — `/attribute-types`

Tipos de atributo (ej. "Color", "Talle") usados para construir variantes de producto.

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | `/attribute-types` | Público | Lista todos los tipos de atributo. |
| GET | `/attribute-types/:id` | Público | Obtiene un tipo de atributo por ID. |
| POST | `/attribute-types` | Admin | Crea un tipo de atributo (201). |
| PATCH | `/attribute-types/:id` | Admin | Actualiza parcialmente un tipo de atributo (200). |
| DELETE | `/attribute-types/:id` | Admin | Elimina (soft delete) un tipo de atributo (200). |
| PATCH | `/attribute-types/:id/restore` | Admin | Restaura un tipo de atributo eliminado. |

---

## 5. `order-items` — `/order_items`

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | `/order_items` | Supabase | Crea un ítem (línea de producto) de orden. |
| GET | `/order_items` | Supabase | Lista todos los ítems de orden. |
| GET | `/order_items/:id` | Supabase | Obtiene un ítem de orden por ID. |
| PATCH | `/order_items/:id` | Supabase | Actualiza parcialmente un ítem de orden. |
| DELETE | `/order_items/:id` | Supabase | Elimina un ítem de orden. |

---

## 6. `order-shippings` — `/order_shippings`

Datos de envío (dirección, ciudad, código postal, etc.) asociados a una orden.

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | `/order_shippings` | Supabase | Crea un registro de envío de orden. |
| GET | `/order_shippings` | Supabase | Lista todos los envíos de orden. |
| GET | `/order_shippings/:id` | Supabase | Obtiene un envío de orden por ID. |
| PATCH | `/order_shippings/:id` | Supabase | Actualiza parcialmente un envío de orden. |
| DELETE | `/order_shippings/:id` | Supabase | Elimina un envío de orden. |

---

## 7. `order-statuses` — `/order_statuses`

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | `/order_statuses` | Supabase | Crea un estado de orden. |
| GET | `/order_statuses` | Público | Lista todos los estados de orden. |
| GET | `/order_statuses/:id` | Supabase | Obtiene un estado de orden por ID. |
| PATCH | `/order_statuses/:id` | Supabase | Actualiza parcialmente un estado de orden. |
| DELETE | `/order_statuses/:id` | Supabase | Elimina un estado de orden. |

---

## 8. `orders` — `/orders`

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | `/orders/checkout` | Supabase | Procesa el checkout: crea la orden para el usuario autenticado (`user.sub`) a partir de `CheckoutOrderDto`. Lanza error si no hay usuario válido. |
| POST | `/orders` | Supabase | Crea una orden directamente (uso administrativo, sin flujo de checkout). |
| GET | `/orders` | Supabase | Lista todas las órdenes. |
| GET | `/orders/:id` | Supabase | Obtiene una orden por ID (`BigInt`). Si el usuario no es admin, se filtra automáticamente por su propio `user_id`. |
| PATCH | `/orders/:id` | Admin | Actualiza parcialmente una orden. |
| DELETE | `/orders/:id` | Admin | Elimina (soft delete) una orden. |
| GET | `/orders/admin/all?includeInactive=` | Admin | Lista todas las órdenes, incluyendo inactivas si `includeInactive=true`. |
| PATCH | `/orders/:id/restore` | Admin | Restaura una orden eliminada. |

---

## 9. `payment-methods` — `/payment_methods`

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | `/payment_methods` | Supabase | Crea un método de pago. |
| GET | `/payment_methods` | Público | Lista todos los métodos de pago. |
| GET | `/payment_methods/:id` | Supabase | Obtiene un método de pago por ID. |
| PATCH | `/payment_methods/:id` | Supabase | Actualiza parcialmente un método de pago. |
| DELETE | `/payment_methods/:id` | Supabase | Elimina un método de pago. |

---

## 10. `payment-statuses` — `/payment_statuses`

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | `/payment_statuses` | Supabase | Crea un estado de pago. |
| GET | `/payment_statuses` | Público | Lista todos los estados de pago. |
| GET | `/payment_statuses/:id` | Supabase | Obtiene un estado de pago por ID. |
| PATCH | `/payment_statuses/:id` | Supabase | Actualiza parcialmente un estado de pago. |
| DELETE | `/payment_statuses/:id` | Supabase | Elimina un estado de pago. |

---

## 11. `payments` — `/payments`

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | `/payments` | Supabase | Crea un pago. |
| GET | `/payments` | Supabase | Lista todos los pagos. |
| GET | `/payments/:id` | Supabase | Obtiene un pago por ID. |
| PATCH | `/payments/:id` | Supabase | Actualiza parcialmente un pago (ej. cambio de estado). |
| DELETE | `/payments/:id` | Supabase | Elimina un pago. |

---

## 12. `postal-codes` — `/postal_codes`

Único módulo donde **ningún** endpoint requiere autenticación.

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | `/postal_codes` | Público | Crea un código postal. |
| GET | `/postal_codes` | Público | Lista todos los códigos postales. |
| GET | `/postal_codes/:id` | Público | Obtiene un código postal por ID. |
| PATCH | `/postal_codes/:id` | Público | Actualiza parcialmente un código postal. |
| DELETE | `/postal_codes/:id` | Público | Elimina un código postal. |

---

## 13. `product-variants` — `/product-variants`

Variantes de un producto (combinaciones de atributos, ej. color/talle), cada una con su propio stock/SKU.

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | `/product-variants` | Público | Lista todas las variantes. |
| GET | `/product-variants/:id` | Público | Obtiene una variante por ID. |
| POST | `/product-variants` | Admin | Crea una variante (201). |
| PATCH | `/product-variants/:id` | Admin | Actualiza parcialmente una variante (200). |
| DELETE | `/product-variants/:id` | Admin | Elimina (soft delete) una variante (200). |
| PATCH | `/product-variants/:id/restore` | Admin | Restaura una variante eliminada. |

---

## 14. `products` — `/products`

El módulo más complejo: administra el catálogo, sube imágenes (`multipart/form-data`, parseadas manualmente vía `parseMultipartRequest` porque usa Fastify) y gestiona colores/variantes.

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | `/products?category=` | Público | Lista productos activos, filtrables por slug de categoría. |
| GET | `/products/:id` | Público | Obtiene un producto por ID. |
| GET | `/products/slug/:slug` | Público | Obtiene un producto por slug. |
| POST | `/products` | Admin | Crea un producto. Body `multipart/form-data`: `name`, `price`, `category_id`, `images` (requeridos); `description`, `parent_id`, `color_id`, `slug`, `variants` (opcionales, `variants` es JSON serializado). |
| PATCH | `/products/:id` | Admin | Actualiza parcialmente un producto (mismos campos que create, todos opcionales; `images` reemplaza las existentes). |
| DELETE | `/products/:id` | Admin | Elimina (soft delete) un producto. |
| GET | `/products/admin/colors` | Admin | Lista todos los colores disponibles (uso administrativo). |
| GET | `/products/admin/all?includeInactive=` | Admin | Lista todos los productos, incluyendo inactivos si corresponde. |
| GET | `/products/admin/:id` | Admin | Obtiene un producto por ID con visibilidad administrativa (incluye inactivos). |
| PATCH | `/products/:id/restore` | Admin | Restaura un producto eliminado. |

---

## 15. `provinces` — `/provinces`

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | `/provinces` | Supabase | Crea una provincia. |
| GET | `/provinces` | Público | Lista todas las provincias. |
| GET | `/provinces/:id` | Supabase | Obtiene una provincia por ID. |
| PATCH | `/provinces/:id` | Supabase | Actualiza parcialmente una provincia. |
| DELETE | `/provinces/:id` | Supabase | Elimina una provincia. |

---

## 16. `reviews` — `/reviews`

Reseñas (rating + comentario) de productos.

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | `/reviews/product/:productId` | Público | Lista las reseñas de un producto. |
| POST | `/reviews` | Supabase | Crea una reseña para el usuario autenticado (`user.sub` como autor). |
| DELETE | `/reviews/:id` | Supabase | Elimina una reseña propia; si el usuario es admin, puede eliminar cualquiera (se pasa `isAdmin` al service). |
| GET | `/reviews/admin/all?includeInactive=` | Admin | Lista todas las reseñas, incluyendo inactivas. |
| PATCH | `/reviews/:id/restore` | Admin | Restaura una reseña eliminada. |

---

## 17. `users` — `/users`

Todo el controller exige JWT de Supabase a nivel de clase.

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | `/users/me` | Supabase | Perfil del usuario autenticado. |
| PATCH | `/users/me` | Supabase | Actualiza el perfil del usuario autenticado. |
| GET | `/users/admin/all?includeInactive=` | Admin | Lista todos los usuarios, incluyendo inactivos. |
| DELETE | `/users/:id` | Admin | Elimina (soft delete) un usuario. |
| PATCH | `/users/:id/restore` | Admin | Restaura un usuario eliminado. |

---

## 18. `categories` — `/categories`

Implementado con **Clean Architecture / hexagonal**: el controller no llama a un service, sino que delega cada operación a un *Use Case* específico (`get-all`, `get-one`, `create`, `update`, `remove`, `restore`).

| Método | Ruta | Auth | Use Case invocado | Descripción |
|---|---|---|---|---|
| GET | `/categories` | Público | `GetAllCategoriesUseCase` | Lista todas las categorías activas. |
| GET | `/categories/:slug` | Público | `GetOneCategoryUseCase` | Obtiene una categoría por slug. |
| POST | `/categories` | Admin | `CreateCategoryUseCase` | Crea una categoría (201). |
| PATCH | `/categories/:id` | Admin | `UpdateCategoryUseCase` | Actualiza parcialmente una categoría (200). |
| DELETE | `/categories/:id` | Admin | `RemoveCategoryUseCase` | Elimina (soft delete) una categoría (200). |
| GET | `/categories/admin/all?includeInactive=` | Admin | `GetAllCategoriesUseCase` | Lista categorías incluyendo inactivas. |
| PATCH | `/categories/:id/restore` | Admin | `RestoreCategoryUseCase` | Restaura una categoría eliminada. |

---

## 19. `storage` (módulo interno, sin controller propio)

No expone endpoints REST. `StorageService.uploadFile(fileBuffer, fileName, mimeType, folder?, bucketName?)` sube un archivo al bucket de Supabase Storage (por defecto carpeta `products`, bucket `store-assets`), generando un nombre único, y es consumido internamente por `ProductsService` al crear/actualizar productos con imágenes.

---

## Resumen general

- **19 módulos** en total: 17 con controller REST propio (`cities`, `addresses`, `attribute-types`, `order-items`, `order-shippings`, `order-statuses`, `orders`, `payment-methods`, `payment-statuses`, `payments`, `postal-codes`, `product-variants`, `products`, `provinces`, `reviews`, `users`, `categories`) y 2 módulos de infraestructura sin endpoints propios (`auth`, `storage`).
- Patrón dominante: CRUD estándar (`create`, `findAll`, `findOne`, `update`, `remove`) + soft delete con `restore`.
- Módulos con listado administrativo extendido (`admin/all` con `includeInactive`): `orders`, `products`, `reviews`, `users`, `categories`.
- Único módulo con subida de archivos: `products` (multipart/form-data + Supabase Storage vía `storage`).
- Único módulo implementado con Clean Architecture (Use Cases separados): `categories`.
