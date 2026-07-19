import { createClient } from '@/shared/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/features/admin/components/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/admin')
  }

  const role = user.app_metadata?.role || user.user_metadata?.role
  const isAdmin = role === 'admin'

  if (!isAdmin) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-gray-900 flex overflow-hidden">
      {/* Sidebar Fija e Inamovible */}
      <AdminSidebar userEmail={user.email} />

      {/* Área Derecha Deslizable */}
      <main className="ml-64 flex-1 h-screen overflow-y-auto p-8">
        {children}
      </main>
    </div>
  )
}
