import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings | Admin Dashboard',
  description: 'Platform settings and configuration',
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 