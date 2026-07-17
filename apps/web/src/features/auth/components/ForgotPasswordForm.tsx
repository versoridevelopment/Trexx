'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)
    
    // Simular el envío, acá idealmente llamas a un auth action de Supabase (resetPasswordForEmail)
    setTimeout(() => {
      setSuccess(true)
      setLoading(false)
    }, 1000)
  }

  if (success) {
    return (
      <div className="w-full text-center space-y-6">
        <div className="w-16 h-1 bg-trexx-volt mx-auto mb-8" />
        <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white">
          REVISÁ TU CORREO
        </h2>
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
          Te enviamos las instrucciones para recuperar tu clave. Si no lo ves, chequeá la carpeta de spam.
        </p>
        <div className="pt-8">
          <Link href="/login">
            <Button className="h-14 px-8 bg-trexx-volt text-black hover:bg-trexx-red hover:text-white text-[12px] font-black italic tracking-[0.2em] uppercase rounded-sm transition-colors">
              VOLVER AL LOGIN
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
          ¿PERDISTE TU CLAVE?
        </h1>
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
          Ingresá tu email y te ayudamos a recuperarla.
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
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">
              Correo Electrónico
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="TUNOMBRE@EMAIL.COM"
              className="h-12 bg-black border-border rounded-sm text-[11px] font-bold tracking-[0.1em] text-white focus:border-trexx-volt focus:ring-1 focus:ring-trexx-volt transition-all placeholder:text-muted-foreground/50"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-14 bg-trexx-volt text-black hover:bg-trexx-red hover:text-white hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] text-[12px] font-black italic tracking-[0.2em] uppercase transition-all duration-300 rounded-sm"
          disabled={loading}
        >
          {loading ? 'ENVIANDO...' : 'RECUPERAR CLAVE'}
        </Button>
      </form>

      <div className="mt-8 pt-4 flex flex-col items-center gap-4 border-t border-border">
        <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-muted-foreground">
          ¿TE ACORDASTE?{' '}
          <Link href="/login" className="text-white hover:text-trexx-volt transition-colors">
            VOLVER AL LOGIN
          </Link>
        </p>
      </div>
    </div>
  )
}
