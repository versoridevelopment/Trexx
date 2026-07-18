import Link from "next/link";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { createClient } from "@/shared/lib/supabase/server";
import { productsService } from "@repo/api-client/src/services/products.service";

export default async function ProductsPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token || '';

  let products: any[] = [];
  let fetchError = null;

  if (token) {
    try {
      products = await productsService.getAllAdmin(token);
    } catch (error: any) {
      fetchError = error.message;
      console.error("Failed to fetch products:", error.message);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Productos</h1>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="h-8 gap-1 bg-trexx-volt text-black hover:bg-white">
            <Link href="/admin/products/new">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Añadir Producto
              </span>
            </Link>
          </Button>
        </div>
      </div>

      {!token ? (
        <Card className="border-red-500/50 bg-red-500/10">
          <CardContent className="py-10 text-center text-red-500 font-medium">
            No estás autenticado. Por favor, inicia sesión como administrador para ver los productos.
          </CardContent>
        </Card>
      ) : fetchError ? (
        <Card className="border-red-500/50 bg-red-500/10">
          <CardContent className="py-10 text-center text-red-500 font-medium">
            Ocurrió un error obteniendo los productos: {fetchError}
          </CardContent>
        </Card>
      ) : (
        <Card className="border-zinc-200 dark:border-zinc-800">
          <CardHeader>
            <CardTitle>Lista de Productos</CardTitle>
            <CardDescription>
              Gestiona los productos de tu tienda, precios y disponibilidad.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <div className="py-10 text-center text-zinc-500">
                No hay productos registrados. Haz clic en "Añadir Producto" para comenzar.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-200 dark:border-zinc-800">
                    <TableHead className="w-[100px]">Imagen</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead className="hidden md:table-cell">Creado el</TableHead>
                    <TableHead>
                      <span className="sr-only">Acciones</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id} className="border-zinc-200 dark:border-zinc-800">
                      <TableCell>
                        <div className="h-10 w-10 rounded-md bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center overflow-hidden">
                          {product.product_images?.[0] ? (
                            <img src={product.product_images[0].url} alt={product.name} className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-xs text-muted-foreground">Img</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.name}
                        <div className="text-xs text-muted-foreground hidden sm:block">
                          {product.categories?.[0]?.category?.name || "Sin categoría"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.is_active ? "default" : "secondary"}>
                          {product.is_active ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell>${Number(product.price).toFixed(2)}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {new Date(product.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Abrir menú</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/products/${product.id}`}>Editar</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">Eliminar</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
