'use client';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'red' | 'blue' | 'gray' | 'white';
  className?: string;
}

export default function Spinner({ 
  size = 'md', 
  color = 'red',
  className = '' 
}: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    red: 'border-red-500',
    blue: 'border-blue-500',
    gray: 'border-gray-500',
    white: 'border-white'
  };

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        ${colorClasses[color]}
        border-2 border-t-transparent rounded-full animate-spin
        ${className}
      `}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}