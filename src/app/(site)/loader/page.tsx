'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate page loading - you can adjust this timing or connect to actual page load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  if (!loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Welcome to Tushar Automobiles
          </h1>
          <p className="text-xl text-gray-600">Your trusted automotive partner</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-red-600 rounded-full opacity-15 animate-float shadow-lg shadow-red-500/20"
            style={{
              width: `${Math.random() * 8 + 3}px`,
              height: `${Math.random() * 8 + 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 8 + 8}s`,
            }}
          />
        ))}
      </div>

      {/* Rotating gear animation in background */}
      <div className="absolute animate-spin-slow opacity-5">
        <svg width="500" height="500" viewBox="0 0 500 500" className="text-red-500">
          <circle cx="250" cy="250" r="180" fill="none" stroke="currentColor" strokeWidth="3" />
          {[...Array(16)].map((_, i) => (
            <rect
              key={i}
              x="245"
              y="40"
              width="10"
              height="50"
              fill="currentColor"
              transform={`rotate(${i * 22.5} 250 250)`}
            />
          ))}
        </svg>
      </div>

      {/* Main loader container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Continuous pulsing circles around logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-72 h-72 md:w-96 md:h-96 rounded-full border-4 border-red-500 animate-ping-continuous opacity-30 shadow-lg shadow-red-500/20" />
          <div className="absolute w-80 h-80 md:w-[28rem] md:h-[28rem] rounded-full border-3 border-red-600 animate-pulse-continuous opacity-25 shadow-xl shadow-red-600/15" />
          <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-red-700 animate-ping-slow opacity-35 shadow-2xl shadow-red-700/10" />
        </div>

        {/* Continuous orbiting elements */}
        <div className="absolute w-96 h-96 md:w-[30rem] md:h-[30rem]">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-3 h-3 md:w-4 md:h-4 bg-red-600 rounded-full animate-orbit-continuous shadow-xl shadow-red-600/60 border border-red-400"
              style={{
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>

        {/* Spinning ring around logo */}
        <div className="absolute w-80 h-80 md:w-96 md:h-96 animate-spin-medium">
          <div className="absolute top-0 left-1/2 w-3 h-3 bg-red-700 rounded-full -translate-x-1/2 shadow-lg shadow-red-700/50" />
          <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-red-700 rounded-full -translate-x-1/2 shadow-lg shadow-red-700/50" />
          <div className="absolute left-0 top-1/2 w-3 h-3 bg-red-700 rounded-full -translate-y-1/2 shadow-lg shadow-red-700/50" />
          <div className="absolute right-0 top-1/2 w-3 h-3 bg-red-700 rounded-full -translate-y-1/2 shadow-lg shadow-red-700/50" />
        </div>

        {/* Logo container with smooth scale animation - Perfectly Centered */}
        <div className="relative animate-scale-pulse-smooth flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-red-500/30 backdrop-blur-sm flex items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="Tushar Automobiles"
              width={288}
              height={200}
              className="w-56 h-auto md:w-72 transition-all duration-300 block mx-auto"
            />
          </div>
        </div>

        {/* Loading text with continuous animation */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4 animate-pulse-text">
            Loading
            <span className="animate-dots">...</span>
          </h2>

          {/* Continuous animated progress bar */}
          <div className="w-72 md:w-96 h-4 bg-red-200 rounded-full overflow-hidden shadow-inner border border-red-300">
            <div className="h-full bg-gradient-to-r from-red-500 via-red-700 to-red-500 animate-progress-continuous rounded-full relative shadow-lg">
              <div className="absolute inset-0 bg-white/50 animate-shimmer-continuous" />
            </div>
          </div>

          <p className="text-red-500 font-medium mt-4 text-sm md:text-base animate-fade">
            Please wait while we prepare your experience
          </p>
        </div>

        {/* Animated wrench and gear icons */}
        <div className="absolute -left-16 md:-left-24 top-1/2 animate-bounce-continuous">
          <svg className="w-14 h-14 md:w-16 md:h-16 text-red-500 opacity-40" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="absolute -right-16 md:-right-24 top-1/2 animate-bounce-continuous" style={{ animationDelay: '1s' }}>
          <svg className="w-14 h-14 md:w-16 md:h-16 text-red-500 opacity-40 animate-spin-medium" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Corner decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border-l-4 border-t-4 border-red-400 opacity-30 animate-fade" />
        <div className="absolute top-10 right-10 w-20 h-20 border-r-4 border-t-4 border-red-400 opacity-30 animate-fade" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-10 left-10 w-20 h-20 border-l-4 border-b-4 border-red-400 opacity-30 animate-fade" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-10 right-10 w-20 h-20 border-r-4 border-b-4 border-red-400 opacity-30 animate-fade" style={{ animationDelay: '1.5s' }} />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px); 
            filter: blur(0px);
          }
          25% { 
            transform: translateY(-12px) translateX(8px); 
            filter: blur(0.5px);
          }
          50% { 
            transform: translateY(-25px) translateX(-8px); 
            filter: blur(0px);
          }
          75% { 
            transform: translateY(-12px) translateX(4px); 
            filter: blur(0.5px);
          }
        }
        @keyframes orbit-continuous {
          0% { 
            transform: rotate(0deg) translateX(180px) rotate(0deg); 
            opacity: 0; 
            scale: 0.8;
          }
          15% { 
            opacity: 1; 
            scale: 1;
          }
          85% { 
            opacity: 1; 
            scale: 1;
          }
          100% { 
            transform: rotate(360deg) translateX(180px) rotate(-360deg); 
            opacity: 0; 
            scale: 0.8;
          }
        }
        @keyframes scale-pulse-smooth {
          0%, 100% { 
            transform: scale(1) rotate(0deg); 
            filter: drop-shadow(0 10px 25px rgba(220, 38, 38, 0.25)) brightness(1);
          }
          50% { 
            transform: scale(1.05) rotate(0.5deg); 
            filter: drop-shadow(0 15px 35px rgba(220, 38, 38, 0.4)) brightness(1.1);
          }
        }
        @keyframes shimmer-smooth {
          0% { 
            transform: translateX(-100%) skewX(-15deg); 
            opacity: 0;
          }
          50% { 
            opacity: 1;
          }
          100% { 
            transform: translateX(200%) skewX(-15deg); 
            opacity: 0;
          }
        }
        @keyframes progress-smooth {
          0% { 
            transform: translateX(-100%); 
            width: 0%;
          }
          50% { 
            width: 100%;
          }
          100% { 
            transform: translateX(100%); 
            width: 0%;
          }
        }
        @keyframes ping-smooth {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.4; 
            filter: blur(0px) drop-shadow(0 0 10px rgba(220, 38, 38, 0.3));
          }
          50% { 
            transform: scale(1.08); 
            opacity: 0.2; 
            filter: blur(1px) drop-shadow(0 0 20px rgba(220, 38, 38, 0.5));
          }
        }
        @keyframes ping-slow-smooth {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.35; 
            filter: blur(0px);
          }
          50% { 
            transform: scale(1.12); 
            opacity: 0.18; 
            filter: blur(1.5px);
          }
        }
        @keyframes pulse-smooth {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.2; 
            filter: blur(0px);
          }
          50% { 
            transform: scale(1.04); 
            opacity: 0.1; 
            filter: blur(0.5px);
          }
        }
        @keyframes pulse-text-smooth {
          0%, 100% { 
            opacity: 1; 
            transform: translateY(0px);
          }
          50% { 
            opacity: 0.7; 
            transform: translateY(-2px);
          }
        }
        @keyframes fade-smooth {
          0%, 100% { 
            opacity: 0.5; 
            transform: scale(1);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.02);
          }
        }
        @keyframes bounce-smooth {
          0%, 100% { 
            transform: translateY(0) rotate(0deg); 
            filter: drop-shadow(0 4px 8px rgba(220, 38, 38, 0.3)) hue-rotate(0deg);
          }
          50% { 
            transform: translateY(-15px) rotate(2deg); 
            filter: drop-shadow(0 8px 16px rgba(220, 38, 38, 0.5)) hue-rotate(10deg);
          }
        }
        @keyframes spin-smooth {
          from { 
            transform: rotate(0deg); 
            filter: hue-rotate(0deg);
          }
          to { 
            transform: rotate(360deg); 
            filter: hue-rotate(360deg);
          }
        }
        
        .animate-float {
          animation: float 12s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }
        .animate-orbit-continuous {
          animation: orbit-continuous 8s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }
        .animate-scale-pulse-smooth {
          animation: scale-pulse-smooth 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }
        .animate-spin-slow {
          animation: spin-smooth 30s linear infinite;
        }
        .animate-spin-medium {
          animation: spin-smooth 12s linear infinite;
        }
        .animate-bounce-continuous {
          animation: bounce-smooth 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }
        .animate-shimmer-continuous {
          animation: shimmer-smooth 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }
        .animate-progress-continuous {
          animation: progress-smooth 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }
        .animate-ping-continuous {
          animation: ping-smooth 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }
        .animate-ping-slow {
          animation: ping-slow-smooth 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }
        .animate-pulse-continuous {
          animation: pulse-smooth 4.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }
        .animate-pulse-text {
          animation: pulse-text-smooth 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }
        .animate-fade {
          animation: fade-smooth 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }
      `}</style>
    </div>
  );
}