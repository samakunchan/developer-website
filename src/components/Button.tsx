import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant = 'primary', fullWidth, className = '', ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={`btn btn--${variant} ${fullWidth ? 'btn--full' : ''} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';
