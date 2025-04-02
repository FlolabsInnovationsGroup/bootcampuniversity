import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { SearchProvider } from '@/contexts/search-context'
import { AdminLayoutClient } from '@/components/admin/AdminLayoutClient'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'admin') {
    redirect('/login')
  }

  return (
    <SearchProvider>
      <AdminLayoutClient user={session.user}>
        {children}
      </AdminLayoutClient>
    </SearchProvider>
  )
} 