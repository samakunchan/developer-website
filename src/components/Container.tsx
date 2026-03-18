import React from 'react';

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`container ${className}`} {...props}>
        {children}
      </div>
    );
  },
);
Container.displayName = 'Container';
