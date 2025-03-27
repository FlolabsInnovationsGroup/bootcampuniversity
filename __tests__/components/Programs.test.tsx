import React, { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Programs from '../../components/features/home/Programs'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileHover, whileTap, whileInView, animate, initial, exit, transition, ...props }: { children: ReactNode } & any) => 
      <div {...props}>{children}</div>,
    h2: ({ children, whileHover, whileTap, whileInView, animate, initial, exit, transition, ...props }: { children: ReactNode } & any) => 
      <h2 {...props}>{children}</h2>,
    h3: ({ children, whileHover, whileTap, whileInView, animate, initial, exit, transition, ...props }: { children: ReactNode } & any) => 
      <h3 {...props}>{children}</h3>,
    p: ({ children, whileHover, whileTap, whileInView, animate, initial, exit, transition, ...props }: { children: ReactNode } & any) => 
      <p {...props}>{children}</p>,
    li: ({ children, whileHover, whileTap, whileInView, animate, initial, exit, transition, ...props }: { children: ReactNode } & any) => 
      <li {...props}>{children}</li>,
  },
  useScroll: () => ({ 
    scrollYProgress: { get: () => 0, onChange: () => {} } 
  }),
  useTransform: () => ({ 
    get: () => 0, 
    onChange: () => {} 
  })
}))

// Mock next/link
jest.mock('next/link', () => 
  function Link({ children, ...props }: { children: ReactNode } & Record<string, unknown>) {
    return <a {...props}>{children}</a>
  }
)

describe('Programs Component', () => {
  it('renders program titles', () => {
    render(<Programs />)
    
    expect(screen.getByText('Foundation Builder')).toBeInTheDocument()
    expect(screen.getByText('Skill Accelerator')).toBeInTheDocument()
    expect(screen.getByText('Professional Developer')).toBeInTheDocument()
  })

  it('renders program descriptions', () => {
    render(<Programs />)
    
    expect(screen.getByText('Master the fundamentals of web development and start your journey in tech.')).toBeInTheDocument()
    expect(screen.getByText('Advance your skills with modern full-stack development practices.')).toBeInTheDocument()
    expect(screen.getByText('Gain enterprise-level development experience and launch your career.')).toBeInTheDocument()
  })

  it('shows program duration and format', () => {
    render(<Programs />)
    
    expect(screen.getByText('3 months')).toBeInTheDocument()
    expect(screen.getAllByText('6 months')).toHaveLength(2) // Use getAllByText since it appears multiple times
    expect(screen.getByText('$500/month')).toBeInTheDocument()
    expect(screen.getByText('$750/month')).toBeInTheDocument()
    expect(screen.getByText('$1000/month')).toBeInTheDocument()
  })
}) 