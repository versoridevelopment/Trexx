'use client'

import { useState } from 'react'
import Link from 'next/link'
import { register } from '../actions/register'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff } from 'lucide-react'

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const phone = formData.get('phone') as string

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    const name = `${firstName} ${lastName}`.trim()

    try {
      const res = await register({ email, password, name, phone })
      if (res?.error) {
        setError(res.error)
      } else if (res?.success) {
        setSuccess(true)
      }
    } catch (err) {
      setError('Ocurrió un error inesperado')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="w-full text-center space-y-6">
        <div className="w-16 h-1 bg-trexx-volt mx-auto mb-8" />
        <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white">
          ¡YA CASI ESTÁS ADENTRO!
        </h2>
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
          Te enviamos un enlace de confirmación a tu email para activar la cuenta.
        </p>
        <div className="pt-8">
          <Link href="/login">
            <Button className="h-14 px-8 bg-trexx-volt text-black hover:bg-trexx-red hover:text-white text-[12px] font-black italic tracking-[0.2em] uppercase rounded-sm transition-colors">
              VOLVER A INICIAR SESIÓN
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="space-y-2 mb-10">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white">
          SUMATE AL CLUB
        </h1>
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
          Completá tus datos para registrarte
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="border border-trexx-red/50 bg-trexx-red/10 px-4 py-3 rounded-sm">
            <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-trexx-red">
              {error}
            </p>
          </div>
        )}
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">
                Nombre
              </Label>
              <Input id="firstName" name="firstName" type="text" required placeholder="JUAN" className="h-12 bg-black border-border rounded-sm text-[11px] font-bold tracking-[0.1em] text-white focus:border-trexx-volt focus:ring-1 focus:ring-trexx-volt transition-all placeholder:text-muted-foreground/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">
                Apellido
              </Label>
              <Input id="lastName" name="lastName" type="text" required placeholder="PEREZ" className="h-12 bg-black border-border rounded-sm text-[11px] font-bold tracking-[0.1em] text-white focus:border-trexx-volt focus:ring-1 focus:ring-trexx-volt transition-all placeholder:text-muted-foreground/50" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">
              Teléfono
            </Label>
            <Input id="phone" name="phone" type="tel" required placeholder="+54 9 11 1234 5678" className="h-12 bg-black border-border rounded-sm text-[11px] font-bold tracking-[0.1em] text-white focus:border-trexx-volt focus:ring-1 focus:ring-trexx-volt transition-all placeholder:text-muted-foreground/50" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">
              Correo Electrónico
            </Label>
            <Input id="email" name="email" type="email" required placeholder="TUNOMBRE@EMAIL.COM" className="h-12 bg-black border-border rounded-sm text-[11px] font-bold tracking-[0.1em] text-white focus:border-trexx-volt focus:ring-1 focus:ring-trexx-volt transition-all placeholder:text-muted-foreground/50" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">
              Contraseña
            </Label>
            <div className="relative">
              <Input id="password" name="password" type={showPassword ? "text" : "password"} required placeholder="••••••••" className="h-12 bg-black border-border rounded-sm text-[11px] font-bold tracking-[0.1em] text-white focus:border-trexx-volt focus:ring-1 focus:ring-trexx-volt transition-all placeholder:text-muted-foreground/50 pr-10" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-trexx-volt transition-colors">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">
              Confirmar Contraseña
            </Label>
            <div className="relative">
              <Input id="confirmPassword" name="confirmPassword" type={showPassword ? "text" : "password"} required placeholder="••••••••" className="h-12 bg-black border-border rounded-sm text-[11px] font-bold tracking-[0.1em] text-white focus:border-trexx-volt focus:ring-1 focus:ring-trexx-volt transition-all placeholder:text-muted-foreground/50 pr-10" />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-14 bg-trexx-volt text-black hover:bg-trexx-red hover:text-white hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] text-[12px] font-black italic tracking-[0.2em] uppercase transition-all duration-300 rounded-sm"
          disabled={loading}
        >
          {loading ? 'CREANDO CUENTA...' : 'CREAR CUENTA'}
        </Button>
      </form>

      <div className="mt-8 pt-4 flex flex-col items-center gap-4 border-t border-border">
        <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-muted-foreground">
          ¿YA TENÉS CUENTA?{' '}
          <Link href="/login" className="text-white hover:text-trexx-volt transition-colors">
            INICIAR SESIÓN
          </Link>
        </p>
      </div>
    </div>
  )
}
