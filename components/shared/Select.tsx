import * as React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', children, error, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={`
            flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm 
            ring-offset-white focus-visible:outline-none focus-visible:ring-2 
            focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed 
            disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 
            dark:focus-visible:ring-primary-500
            ${error ? 'border-red-500 dark:border-red-500' : ''}
            ${className}
          `}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select'; 