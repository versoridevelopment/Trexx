import { RegisterForm } from '@/features/auth/components/RegisterForm'

export const metadata = {
  title: 'Sumate al club | Trexx Padel',
  description: 'Creá tu cuenta',
}

export default function RegisterPage() {
  return (
    <div className="w-full">
      <RegisterForm />
    </div>
  )
}
