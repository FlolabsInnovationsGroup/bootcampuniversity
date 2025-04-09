import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analytics | Admin Dashboard',
  description: 'Platform analytics and insights',
}

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 