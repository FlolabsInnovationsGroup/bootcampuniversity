import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Content Library | Admin Dashboard',
  description: 'Manage your learning content and materials',
}

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 