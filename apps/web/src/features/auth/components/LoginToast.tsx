'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'
import { useSearchParams } from 'next/navigation'

export function LoginToast() {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const redirectTo = searchParams.get('redirectTo')
    if (redirectTo === '/checkout') {
      toast.error('Debes iniciar sesión para finalizar tu compra', {
        duration: 4000,
        id: 'auth-toast',
      })
    }
  }, [searchParams])

  return null
}
