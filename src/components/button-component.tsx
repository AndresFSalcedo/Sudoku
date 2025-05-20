// Imports.
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'primary' | 'danger';
    fullWidth?: boolean;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'default',
    fullWidth = false,
    children,
    className,
    ...rest
}) => {
    const baseClasses = 'px-3 py-1 text-sm rounded transition font-medium focus:outline-none';

    const variants: Record<string, string> = {
        default: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
    };

  return (
    <button className={[baseClasses, variants[variant], fullWidth ? 'w-full' : '', className ?? ''].join(' ')} {...rest}>
      {children}
    </button>
  );
};

export default Button;