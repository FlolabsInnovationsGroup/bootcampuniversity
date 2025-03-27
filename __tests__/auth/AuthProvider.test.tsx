import { render, screen, waitFor } from '@testing-library/react'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { useSession } from 'next-auth/react'

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}))

describe('AuthProvider', () => {
  const mockChildren = <div>Test Content</div>

  it('renders children when session is loading', () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'loading',
    })

    render(<AuthProvider>{mockChildren}</AuthProvider>)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders children when session is authenticated', () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          name: 'Test User',
          email: 'test@example.com',
        },
      },
      status: 'authenticated',
    })

    render(<AuthProvider>{mockChildren}</AuthProvider>)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('redirects to login when session is unauthenticated', () => {
    const mockRouter = {
      push: jest.fn(),
    }
    jest.mock('next/navigation', () => ({
      useRouter: () => mockRouter,
    }))

    ;(useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    })

    render(<AuthProvider>{mockChildren}</AuthProvider>)
    expect(mockRouter.push).toHaveBeenCalledWith('/login')
  })
}) 