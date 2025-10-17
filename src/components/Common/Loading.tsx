'use client';

import { useState, useEffect } from 'react';

interface LoadingProps {
  onLoadingComplete?: () => void;
  duration?: number;
  showProgress?: boolean;
  message?: string;
}

export default function Loading({
  onLoadingComplete,
  duration = 2000,
  showProgress = true,
  message = "Loading your automotive experience..."
}: LoadingProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let completionTimeout: NodeJS.Timeout;

    if (showProgress) {
      // Smooth progress animation
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + (100 / (duration / 50)); // Update every 50ms
        });
      }, 50);
    }

    // Complete loading after duration
    completionTimeout = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsVisible(false);
        if (onLoadingComplete) {
          onLoadingComplete();
        }
      }, 300); // Small delay for smooth transition
    }, duration);

    return () => {
      if (progressInterval) clearInterval(progressInterval);
      if (completionTimeout) clearTimeout(completionTimeout);
    };
  }, [duration, showProgress, onLoadingComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0  flex items-center justify-center bg-white z-[100]  ">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ef4444' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Main Content */}
      <div className="relative text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="relative inline-block">
            <img
              src="/images/logo.png"
              alt="Tushar Automobiles"
              className="w-32 h-auto md:w-40 object-contain"
              onError={(e) => {
                e.currentTarget.src = '/logo.png';
              }}
            />

            {/* Rotating ring around logo */}
            <div className="absolute inset-0 -m-4">
              <div className="w-full h-full border-2 border-red-200 rounded-full animate-spin-slow opacity-30"></div>
            </div>
            <div className="absolute inset-0 -m-6">
              <div className="w-full h-full border border-red-300 rounded-full animate-spin-reverse opacity-20"></div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            Tushar Automobiles
          </h2>
          <p className="text-sm text-gray-600 animate-pulse">
            {message}
          </p>
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <div className="w-64 md:w-80 mx-auto mb-4">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {Math.round(progress)}%
            </div>
          </div>
        )}

        {/* Animated Dots */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 4s linear infinite;
        }
      `}</style>
    </div>
  );
}