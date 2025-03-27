import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'

describe('Basic Test Setup', () => {
  it('renders without crashing', () => {
    render(<div>Test Setup</div>)
    expect(screen.getByText('Test Setup')).toBeInTheDocument()
  })
}) 