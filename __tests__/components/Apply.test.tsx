import React, { ReactNode } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Apply from '../../components/features/home/Apply';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: ReactNode; [key: string]: any }) => {
      const { whileHover, whileTap, whileInView, animate, initial, exit, transition, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
    button: ({ children, ...props }: { children: ReactNode; [key: string]: any }) => {
      const { whileHover, whileTap, whileInView, animate, initial, exit, transition, ...rest } = props;
      return <button {...rest}>{children}</button>;
    },
    form: ({ children, ...props }: { children: ReactNode; [key: string]: any }) => {
      const { whileHover, whileTap, whileInView, animate, initial, exit, transition, ...rest } = props;
      return <form {...rest}>{children}</form>;
    },
    section: ({ children, ...props }: { children: ReactNode; [key: string]: any }) => {
      const { whileHover, whileTap, whileInView, animate, initial, exit, transition, ...rest } = props;
      return <section {...rest}>{children}</section>;
    },
    h2: ({ children, ...props }: { children: ReactNode; [key: string]: any }) => {
      const { whileHover, whileTap, whileInView, animate, initial, exit, transition, ...rest } = props;
      return <h2 {...rest}>{children}</h2>;
    },
    h3: ({ children, ...props }: { children: ReactNode; [key: string]: any }) => {
      const { whileHover, whileTap, whileInView, animate, initial, exit, transition, ...rest } = props;
      return <h3 {...rest}>{children}</h3>;
    },
    p: ({ children, ...props }: { children: ReactNode; [key: string]: any }) => {
      const { whileHover, whileTap, whileInView, animate, initial, exit, transition, ...rest } = props;
      return <p {...rest}>{children}</p>;
    },
    input: ({ children, ...props }: { children?: ReactNode; [key: string]: any }) => {
      const { whileHover, whileTap, whileFocus, whileInView, animate, initial, exit, transition, ...rest } = props;
      return <input {...rest}>{children}</input>;
    },
    textarea: ({ children, ...props }: { children?: ReactNode; [key: string]: any }) => {
      const { whileHover, whileTap, whileFocus, whileInView, animate, initial, exit, transition, ...rest } = props;
      return <textarea {...rest}>{children}</textarea>;
    },
    label: ({ children, ...props }: { children: ReactNode; [key: string]: any }) => {
      const { whileHover, whileTap, whileInView, animate, initial, exit, transition, ...rest } = props;
      return <label {...rest}>{children}</label>;
    },
  },
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => ({ get: () => 0 }),
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => {
    return <a {...props}>{children}</a>;
  };
});

describe('Apply Form', () => {
  it('renders the initial step with program selection', () => {
    render(<Apply />);
    expect(screen.getByText('Choose Your Path')).toBeInTheDocument();
    expect(screen.getByText('🚀 Bootcamp Path')).toBeInTheDocument();
    expect(screen.getByText('💼 Internship Only')).toBeInTheDocument();
  });

  it('validates personal information step', async () => {
    render(<Apply />);
    
    // Select bootcamp path to move to next step
    const bootcampButton = screen.getByText('🚀 Bootcamp Path');
    fireEvent.click(bootcampButton);
    
    // Fill in invalid data
    const emailInput = screen.getByLabelText('Email');
    const phoneInput = screen.getByLabelText('Phone');
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(phoneInput, { target: { value: 'invalid-phone' } });
    
    // Try to proceed with invalid data
    const nextButton = screen.getByText('Next Step');
    fireEvent.click(nextButton);
    
    // Wait for validation messages
    await waitFor(() => {
      expect(screen.getByTestId('email-error')).toHaveTextContent('Please enter a valid email address');
      expect(screen.getByTestId('phone-error')).toHaveTextContent('Please enter a valid phone number');
    });
  });

  it('validates program and experience step', async () => {
    render(<Apply />);
    
    // Navigate to program selection step
    const bootcampButton = screen.getByText('🚀 Bootcamp Path');
    fireEvent.click(bootcampButton);
    
    // Fill in valid personal information
    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const emailInput = screen.getByLabelText('Email');
    const phoneInput = screen.getByLabelText('Phone');
    
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '123-456-7890' } });
    
    // Move to next step
    fireEvent.click(screen.getByText('Next Step'));
    
    // Try to proceed without selecting program or entering experience
    fireEvent.click(screen.getByText('Next Step'));
    
    // Wait for validation messages
    await waitFor(() => {
      expect(screen.getByTestId('program-error')).toHaveTextContent('Please select a program');
      expect(screen.getByTestId('experience-error')).toHaveTextContent('Please provide more details (at least 20 characters)');
    });
  });

  it('validates final details step', async () => {
    render(<Apply />);
    
    // Navigate through steps with valid data
    const bootcampButton = screen.getByText('🚀 Bootcamp Path');
    fireEvent.click(bootcampButton);
    
    // Fill personal information
    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const emailInput = screen.getByLabelText('Email');
    const phoneInput = screen.getByLabelText('Phone');
    
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '123-456-7890' } });
    
    // Move to program step
    fireEvent.click(screen.getByText('Next Step'));
    
    // Select program and fill experience
    const foundationButton = screen.getByText('Foundation Builder');
    fireEvent.click(foundationButton);
    
    const experienceInput = screen.getByLabelText('Tell us about your coding experience');
    fireEvent.change(experienceInput, { target: { value: 'I have been coding for over 5 years in various languages.' } });
    
    // Move to final step
    fireEvent.click(screen.getByText('Next Step'));
    
    // Try to submit without filling required fields
    const submitButton = screen.getByText('Submit Application');
    fireEvent.click(submitButton);
    
    // Wait for validation messages
    await waitFor(() => {
      expect(screen.getByTestId('background-error')).toHaveTextContent('Please provide more details (at least 20 characters)');
      expect(screen.getByTestId('goals-error')).toHaveTextContent('Please provide more details (at least 20 characters)');
      expect(screen.getByTestId('heardFrom-error')).toHaveTextContent('Please tell us how you heard about us');
    });
  });
}); 