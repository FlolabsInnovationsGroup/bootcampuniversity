import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import CallToAction from '@/components/features/home/CallToAction'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
  useScroll: () => ({
    scrollYProgress: 0,
  }),
  useTransform: () => 1,
}))

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: any) => {
    return <a href={href}>{children}</a>
  }
})

describe('CallToAction Component', () => {
  it('renders the main heading', () => {
    render(<CallToAction />)
    
    expect(screen.getByRole('heading', { 
      name: /Start Your Tech Career Without Risk/i 
    })).toBeInTheDocument()
  })

  it('displays the application button', () => {
    render(<CallToAction />)
    
    const applyButton = screen.getByRole('link', { 
      name: /Apply Now/i 
    })
    expect(applyButton).toBeInTheDocument()
    expect(applyButton).toHaveAttribute('href', '/apply')
  })

  it('shows program highlights', () => {
    render(<CallToAction />)
    
    expect(screen.getByRole('heading', { name: /Program Highlights/i })).toBeInTheDocument()
    expect(screen.getByText(/Learn from industry experts/i)).toBeInTheDocument()
    expect(screen.getByText(/Build real-world projects/i)).toBeInTheDocument()
  })
}) 