import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Ajustes de la Tienda</h1>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Banner Principal</CardTitle>
            <CardDescription>
              Actualiza el banner promocional principal mostrado en la página de inicio.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="hero-title">Título</Label>
                <Input 
                  id="hero-title" 
                  placeholder="Ej., Oferta de Verano" 
                  defaultValue="Next Generation Gaming"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hero-subtitle">Subtítulo</Label>
                <Input 
                  id="hero-subtitle" 
                  placeholder="Ej., Hasta 50% de descuento" 
                  defaultValue="Experience unparalleled performance with our new lineup."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hero-image">URL de Imagen de Fondo</Label>
                <Input 
                  id="hero-image" 
                  placeholder="https://ejemplo.com/imagen.jpg" 
                  defaultValue="/images/hero-bg.jpg"
                />
                <p className="text-sm text-muted-foreground">
                  Proporciona una imagen de alta resolución para el fondo del banner.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="hero-cta-text">Texto del Botón CTA</Label>
                  <Input 
                    id="hero-cta-text" 
                    placeholder="Ej., Comprar Ahora" 
                    defaultValue="Explore Collection"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="hero-cta-link">Enlace del Botón CTA</Label>
                  <Input 
                    id="hero-cta-link" 
                    placeholder="Ej., /categorias/oferta" 
                    defaultValue="/products"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button>Guardar cambios</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
