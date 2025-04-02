import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'User Management | Admin Dashboard',
  description: 'Manage platform users',
}

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 