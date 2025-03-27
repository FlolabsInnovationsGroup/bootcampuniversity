import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import FAQ from '@/components/features/home/FAQ'
import { ReactNode } from 'react'

// Mock lucide-react
jest.mock('lucide-react', () => ({
  ChevronDown: () => <div data-testid="chevron-down" />,
  Search: () => <div data-testid="search-icon" />,
  HelpCircle: () => <div data-testid="help-circle" />,
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: ReactNode } & Record<string, unknown>) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: { children: ReactNode } & Record<string, unknown>) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: { children: ReactNode } & Record<string, unknown>) => <p {...props}>{children}</p>,
    button: ({ children, ...props }: { children: ReactNode } & Record<string, unknown>) => <button {...props}>{children}</button>,
    span: ({ children, ...props }: { children: ReactNode } & Record<string, unknown>) => <span {...props}>{children}</span>,
    input: ({ children, ...props }: { children?: ReactNode } & Record<string, unknown>) => <input {...props}>{children}</input>,
    section: ({ children, ...props }: { children: ReactNode } & Record<string, unknown>) => <section {...props}>{children}</section>,
  },
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
  useScroll: () => ({ scrollYProgress: 0 }),
  useTransform: () => 0,
}))

describe('FAQ Component', () => {
  it('renders FAQ questions', () => {
    render(<FAQ />)
    
    expect(screen.getByText(/How does the earn-while-you-learn model work/i)).toBeInTheDocument()
    expect(screen.getByText(/What are the program prerequisites/i)).toBeInTheDocument()
    expect(screen.getByText(/How long does it take to complete each tier/i)).toBeInTheDocument()
  })

  it('shows answer when question is clicked', () => {
    render(<FAQ />)
    
    const question = screen.getByText(/How does the earn-while-you-learn model work/i)
    fireEvent.click(question)
    
    expect(screen.getByText(/You earn income by working on real client projects while you learn/i)).toBeInTheDocument()
  })

  it('filters questions by search term', () => {
    render(<FAQ />)
    
    const searchInput = screen.getByPlaceholderText(/search questions/i)
    fireEvent.change(searchInput, { target: { value: 'prerequisites' } })
    
    expect(screen.getByText(/What are the program prerequisites/i)).toBeInTheDocument()
    expect(screen.queryByText(/How does the earn-while-you-learn model work/i)).not.toBeInTheDocument()
  })
}) 