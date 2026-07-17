import { LoginForm } from '@/features/auth/components/LoginForm'
import { LoginToast } from '@/features/auth/components/LoginToast'
import { Suspense } from 'react'

export const metadata = {
  title: 'Iniciar sesión | Trexx Padel',
  description: 'Ingresá a tu cuenta',
}

export default function LoginPage() {
  return (
    <div className="w-full">
      <Suspense fallback={null}>
        <LoginToast />
      </Suspense>
      <LoginForm />
    </div>
  )
}
