'use client';

import { ReactNode } from 'react';
import Spinner from './Spinner';

interface LoadingButtonProps {
  loading?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  loadingText?: string;
}

export default function LoadingButton({
  loading = false,
  disabled = false,
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  loadingText = 'Loading...'
}: LoadingButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
    outline: 'border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white focus:ring-red-500'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {loading && (
        <Spinner 
          size="sm" 
          color={variant === 'outline' ? 'red' : 'white'} 
          className="mr-2" 
        />
      )}
      {loading ? loadingText : children}
    </button>
  );
}