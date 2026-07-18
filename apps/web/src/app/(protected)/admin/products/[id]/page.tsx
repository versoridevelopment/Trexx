"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/shared/lib/supabase/client";
import { productsService } from "@repo/api-client/src/services/products.service";
import { categoriesService } from "@repo/api-client/src/services/categories.service";
import { use } from "react";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const supabase = createClient();
  
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "0",
    is_active: "true",
    category_id: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;
        if (!token) throw new Error("No estás autenticado. Por favor, inicia sesión como administrador.");

        const [cats, product] = await Promise.all([
          categoriesService.getAll(),
          productsService.getByIdAdmin(Number(id), token)
        ]);
        
        setCategories(cats);
        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price ? String(product.price) : "",
          stock: "0",
          is_active: product.is_active ? "true" : "false",
          category_id: product.category_id ? String(product.category_id) : "",
        });
      } catch (error: any) {
        console.error("Error loading data", error);
        setFetchError(error.message);
      } finally {
        setInitialLoading(false);
      }
    }
    loadData();
  }, [id, supabase.auth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      if (!token) throw new Error("No estás autenticado");

      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("is_active", formData.is_active);
      if (formData.category_id) {
        data.append("category_id", formData.category_id);
      }
      if (imageFile) {
        data.append("images", imageFile);
      }

      await productsService.update(Number(id), data, token);
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error("Error updating product", error);
      alert("Hubo un error actualizando el producto.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-trexx-volt w-8 h-8" /></div>;
  }

  if (fetchError) {
    return (
      <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7" asChild>
            <Link href="/admin/products">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Volver</span>
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Error
          </h1>
        </div>
        <Card className="border-red-500/50 bg-red-500/10">
          <CardContent className="py-10 text-center text-red-500 font-medium">
            Ocurrió un error obteniendo el producto: {fetchError}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/admin/products">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Volver</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Editar Producto #{id}
        </h1>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/products">Descartar Cambios</Link>
          </Button>
          <Button size="sm" onClick={handleSubmit} disabled={loading} className="bg-trexx-volt text-black hover:bg-white">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Guardar Cambios"}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max gap-4 lg:col-span-2 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Detalles del Producto</CardTitle>
              <CardDescription>Nombre y descripción del producto.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" value={formData.name} onChange={handleChange} placeholder="Ej. Remera Técnica Elite" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Descripción</Label>
                  <textarea id="description" value={formData.description} onChange={handleChange} className="min-h-32 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm" placeholder="Describe tu producto..." />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Precio e Inventario</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="grid gap-3">
                  <Label htmlFor="price">Precio</Label>
                  <Input id="price" type="number" step="0.01" value={formData.price} onChange={handleChange} placeholder="99.99" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="stock">Inventario Inicial</Label>
                  <Input id="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="100" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid auto-rows-max gap-4 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Estado del Producto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="is_active">Estado</Label>
                  <select id="is_active" value={formData.is_active} onChange={handleChange} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm">
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Categoría</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="category_id">Categoría</Label>
                  <select id="category_id" value={formData.category_id} onChange={handleChange} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm">
                    <option value="">Selecciona una categoría</option>
                    {categories.map((cat: any) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Imágenes (Reemplazar)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Input type="file" accept="image/*" onChange={handleImageChange} className="cursor-pointer" />
                {imageFile && <span className="text-xs text-trexx-volt font-bold mt-2">Nueva imagen: {imageFile.name}</span>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 md:hidden">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/products">Descartar Cambios</Link>
        </Button>
        <Button size="sm" onClick={handleSubmit} disabled={loading} className="bg-trexx-volt text-black">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Guardar Cambios"}
        </Button>
      </div>
    </div>
  );
}
