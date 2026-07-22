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
    <div className="min-h-screen bg-[#F5F5F7] text-gray-900 flex flex-col md:flex-row overflow-hidden">
      <AdminSidebar userEmail={user.email} />

      <main className="md:ml-64 flex-1 h-screen overflow-y-auto p-4 md:p-8 pt-24 md:pt-8">
        {children}
      </main>
    </div>
  )
}
