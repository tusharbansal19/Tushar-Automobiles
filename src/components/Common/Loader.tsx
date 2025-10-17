'use client';

import { useState, useEffect } from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars';
  color?: 'red' | 'blue' | 'green' | 'gray' | 'white';
  text?: string;
  fullScreen?: boolean;
  overlay?: boolean;
  className?: string;
}

export default function Loader({
  size = 'md',
  variant = 'spinner',
  color = 'red',
  text,
  fullScreen = false,
  overlay = false,
  className = ''
}: LoaderProps) {
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    red: 'text-red-500 border-red-500',
    blue: 'text-blue-500 border-blue-500',
    green: 'text-green-500 border-green-500',
    gray: 'text-gray-500 border-gray-500',
    white: 'text-white border-white'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  const containerClass = fullScreen 
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-white'
    : overlay 
    ? 'absolute inset-0 z-40 flex items-center justify-center bg-white/80 backdrop-blur-sm'
    : 'flex items-center justify-center';

  const renderSpinner = () => (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`}>
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );

  const renderDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${sizeClasses[size]} bg-current ${colorClasses[color]} rounded-full animate-pulse`}
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} bg-current rounded-full animate-ping`} />
  );

  const renderBars = () => (
    <div className="flex items-end space-x-1">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`w-1 bg-current ${colorClasses[color]} animate-bounce`}
          style={{ 
            height: `${12 + (i % 2) * 8}px`,
            animationDelay: `${i * 0.1}s` 
          }}
        />
      ))}
    </div>
  );

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'bars':
        return renderBars();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={`${containerClass} ${className}`}>
      <div className="flex flex-col items-center space-y-3">
        {renderLoader()}
        {text && (
          <p className={`${textSizeClasses[size]} ${colorClasses[color]} font-medium animate-pulse`}>
            {text}
          </p>
        )}
      </div>
    </div>
  );
}

// Specific loader components for common use cases
export const ButtonLoader = ({ size = 'sm' }: { size?: 'sm' | 'md' }) => (
  <Loader size={size} variant="spinner" color="white" />
);

export const PageLoader = ({ text = 'Loading...' }: { text?: string }) => (
  <Loader size="lg" variant="spinner" color="red" text={text} fullScreen />
);

export const SectionLoader = ({ text }: { text?: string }) => (
  <Loader size="md" variant="dots" color="red" text={text} className="py-8" />
);

export const OverlayLoader = ({ text }: { text?: string }) => (
  <Loader size="lg" variant="spinner" color="red" text={text} overlay />
);