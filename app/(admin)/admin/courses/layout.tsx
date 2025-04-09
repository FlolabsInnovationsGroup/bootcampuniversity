import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Course Management | Admin Dashboard',
  description: 'Manage your courses and learning paths',
}

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 