import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Hero from '@/components/features/home/Hero'
import { ReactNode } from 'react'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: ReactNode } & Record<string, unknown>) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: { children: ReactNode } & Record<string, unknown>) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: { children: ReactNode } & Record<string, unknown>) => <p {...props}>{children}</p>,
    button: ({ children, ...props }: { children: ReactNode } & Record<string, unknown>) => <button {...props}>{children}</button>,
    span: ({ children, ...props }: { children: ReactNode } & Record<string, unknown>) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
  useScroll: () => ({ scrollYProgress: 0 }),
  useTransform: () => 0,
}))

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

describe('Hero', () => {
  it('renders the hero section with main content', () => {
    render(<Hero />)
    
    // Check for main heading
    expect(screen.getByText('Launch Your Tech Career')).toBeInTheDocument()
    expect(screen.getByText('With Real Experience')).toBeInTheDocument()
    
    // Check for subtitle
    expect(screen.getByText(/Get hands-on experience while learning from industry experts/i)).toBeInTheDocument()
    
    // Check for CTA buttons
    expect(screen.getByText('Apply Now')).toBeInTheDocument()
    expect(screen.getByText('Explore Internships')).toBeInTheDocument()
  })

  it('renders all stats cards with correct content', () => {
    render(<Hero />)
    
    // Check for all stats
    expect(screen.getByText('95%')).toBeInTheDocument()
    expect(screen.getByText('Employment Rate')).toBeInTheDocument()
    expect(screen.getByText('$75K')).toBeInTheDocument()
    expect(screen.getByText('Avg Starting Salary')).toBeInTheDocument()
    expect(screen.getByText('1000+')).toBeInTheDocument()
    expect(screen.getByText('Graduates')).toBeInTheDocument()
    expect(screen.getByText('50+')).toBeInTheDocument()
    expect(screen.getByText('Partner Companies')).toBeInTheDocument()
  })

  it('renders background elements', () => {
    render(<Hero />)
    
    // Check for background elements
    expect(screen.getByTestId('background-grid')).toBeInTheDocument()
    expect(screen.getByTestId('background-gradient')).toBeInTheDocument()
  })
}) 