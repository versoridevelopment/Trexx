import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm'

export const metadata = {
  title: 'Recuperar Clave | Trexx Padel',
  description: 'Recuperá tu contraseña',
}

export default function ForgotPasswordPage() {
  return (
    <div className="w-full">
      <ForgotPasswordForm />
    </div>
  )
}
