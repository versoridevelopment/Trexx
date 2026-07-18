import { createClient } from '@/shared/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/features/admin/components/AdminSidebar'
import { AdminHeader } from '@/features/admin/components/AdminHeader'

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
    <div className="min-h-screen bg-[#050505] text-foreground flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader userEmail={user.email} />
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
