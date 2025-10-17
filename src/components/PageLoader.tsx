'use client';

import { useState, useEffect } from 'react';

interface PageLoaderProps {
    onLoadingComplete?: () => void;
    duration?: number;
    message?: string;
}

export default function PageLoader({
    onLoadingComplete,
    duration = 3000,
    message = "Loading your automotive experience..."
}: PageLoaderProps) {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState(message);
    const [logoError, setLogoError] = useState(false);
    const [logoLoaded, setLogoLoaded] = useState(false);

    // Animated loading messages
    useEffect(() => {
        const messages = [
            "Starting engines...",
            "Loading components...",
            "Preparing interface...",
            "Almost ready...",
            message
        ];

        let messageIndex = 0;
        const messageInterval = setInterval(() => {
            if (messageIndex < messages.length - 1) {
                setLoadingText(messages[messageIndex]);
                messageIndex++;
            }
        }, duration / messages.length);

        return () => clearInterval(messageInterval);
    }, [duration, message]);

    // Logo preload effect
    useEffect(() => {
        const preloadLogo = () => {
            const img = new Image();
            img.onload = () => {
                console.log('Logo preloaded successfully');
                setLogoLoaded(true);
            };
            img.onerror = () => {
                console.log('Logo preload failed, trying fallback');
                const fallbackImg = new Image();
                fallbackImg.onload = () => {
                    console.log('Fallback logo preloaded successfully');
                    setLogoLoaded(true);
                };
                fallbackImg.onerror = () => {
                    console.log('All logo preloads failed');
                    setLogoError(true);
                };
                fallbackImg.src = '/logo.png';
            };
            img.src = '/images/logo.png';
        };

        preloadLogo();
    }, []);

    // Progress animation
    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + (100 / (duration / 50));
            });
        }, 50);

        return () => clearInterval(progressInterval);
    }, [duration]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            if (onLoadingComplete) {
                onLoadingComplete();
            }
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onLoadingComplete]);

    if (!loading) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden">
            {/* Floating background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 15 }, (_, i) => {
                    // Use deterministic values based on index to avoid hydration mismatch
                    const positions = [
                        { left: 10, top: 20, size: 6, delay: 0.5, duration: 4.5 },
                        { left: 85, top: 15, size: 8, delay: 1.2, duration: 5.2 },
                        { left: 25, top: 80, size: 5, delay: 0.8, duration: 4.8 },
                        { left: 70, top: 75, size: 7, delay: 1.8, duration: 5.5 },
                        { left: 45, top: 10, size: 6, delay: 0.3, duration: 4.3 },
                        { left: 15, top: 60, size: 9, delay: 2.1, duration: 5.8 },
                        { left: 90, top: 45, size: 5, delay: 1.5, duration: 4.9 },
                        { left: 35, top: 35, size: 7, delay: 0.9, duration: 5.1 },
                        { left: 60, top: 90, size: 6, delay: 1.7, duration: 4.7 },
                        { left: 5, top: 40, size: 8, delay: 0.6, duration: 5.3 },
                        { left: 80, top: 25, size: 5, delay: 2.0, duration: 4.6 },
                        { left: 50, top: 70, size: 7, delay: 1.1, duration: 5.0 },
                        { left: 20, top: 5, size: 6, delay: 1.4, duration: 4.4 },
                        { left: 75, top: 85, size: 8, delay: 0.7, duration: 5.4 },
                        { left: 40, top: 55, size: 6, delay: 1.9, duration: 4.8 }
                    ];
                    const particle = positions[i] || positions[0];
                    
                    return (
                        <div
                            key={i}
                            className="absolute bg-red-400 rounded-full opacity-10 animate-float-particle"
                            style={{
                                left: `${particle.left}%`,
                                top: `${particle.top}%`,
                                width: `${particle.size}px`,
                                height: `${particle.size}px`,
                                animationDelay: `${particle.delay}s`,
                                animationDuration: `${particle.duration}s`,
                            }}
                        />
                    );
                })}
            </div>

            {/* Main content container */}
            <div className="relative flex flex-col items-center">
                {/* Central logo with animations */}
                <div className="relative mb-12 flex items-center justify-center">
                    {/* Outer pulsing rings - centered */}
                    <div className="absolute w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center">
                        <div className="w-full h-full border-2 border-red-200 rounded-full animate-ping-slow opacity-30"></div>
                    </div>
                    <div className="absolute w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 flex items-center justify-center">
                        <div className="w-full h-full border-2 border-red-300 rounded-full animate-ping-medium opacity-40"></div>
                    </div>

                    {/* Rotating gradient ring - centered */}
                    <div className="absolute w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 animate-spin-slow flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-gradient-to-r from-red-500 via-red-600 to-red-500 opacity-20 animate-gradient-pulse"></div>
                    </div>

                    {/* Inner spinning rings - centered */}
                    <div className="absolute w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 border-3 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 border-2 border-red-300 border-b-transparent rounded-full animate-spin-reverse"></div>

                    {/* Orbiting particles - centered around the main circle */}
                    <div className="absolute w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 animate-orbit-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full absolute -top-1.5 left-1/2 transform -translate-x-1/2 shadow-lg animate-particle-glow"></div>
                    </div>
                    <div className="absolute w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 animate-orbit-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full absolute top-1/2 -right-1 transform -translate-y-1/2 shadow-md animate-particle-glow"></div>
                    </div>
                    <div className="absolute w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 animate-orbit-3">
                        <div className="w-3 h-3 bg-red-600 rounded-full absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 shadow-lg animate-particle-glow"></div>
                    </div>
                    <div className="absolute w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 animate-orbit-4">
                        <div className="w-2 h-2 bg-red-300 rounded-full absolute top-1/2 -left-1 transform -translate-y-1/2 shadow-md animate-particle-glow"></div>
                    </div>

                    {/* Energy spokes - centered */}
                    <div className="absolute w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 animate-spoke-rotate">
                        <div className="absolute top-0 left-1/2 w-1 h-12 bg-gradient-to-b from-red-500 to-transparent transform -translate-x-1/2 rounded-full"></div>
                        <div className="absolute bottom-0 left-1/2 w-1 h-12 bg-gradient-to-t from-red-500 to-transparent transform -translate-x-1/2 rounded-full"></div>
                        <div className="absolute left-0 top-1/2 h-1 w-12 bg-gradient-to-r from-red-500 to-transparent transform -translate-y-1/2 rounded-full"></div>
                        <div className="absolute right-0 top-1/2 h-1 w-12 bg-gradient-to-l from-red-500 to-transparent transform -translate-y-1/2 rounded-full"></div>
                    </div>

                    {/* Expanding energy waves - centered */}
                    <div className="absolute w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 animate-wave-1">
                        <div className="w-full h-full border border-red-400 rounded-full opacity-20"></div>
                    </div>
                    <div className="absolute w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 animate-wave-2">
                        <div className="w-full h-full border border-red-300 rounded-full opacity-15"></div>
                    </div>

                    {/* Logo container - centered */}
                    <div className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-white rounded-full shadow-2xl flex items-center justify-center animate-float-gentle border-4 border-red-100">
                        {/* Logo with multiple fallbacks */}
                        <div className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 flex items-center justify-center">
                            {!logoError ? (
                                <img
                                    src="/images/logo.png"
                                    alt="Logo"
                                    className={`w-full h-full object-contain filter  transition-opacity duration-300 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
                                    onError={(e) => {
                                        console.log('Primary logo failed, trying fallback');
                                        const target = e.currentTarget;
                                        if (target.src.includes('/images/logo.png')) {
                                            target.src = '/logo.png';
                                        } else {
                                            console.log('All logo sources failed');
                                            setLogoError(true);
                                        }
                                    }}
                                    onLoad={() => {
                                        console.log('Logo loaded successfully');
                                        setLogoLoaded(true);
                                    }}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        display: 'block'
                                    }}
                                />
                            ) : (
                                /* Fallback logo design */
                                <div className="flex items-center justify-center w-full h-full">
                                    <div className="bg-red-600 text-white px-3 py-2 rounded-lg text-lg sm:text-xl md:text-2xl font-bold">
                                        TA
                                    </div>
                                </div>
                            )}

                            {/* Loading indicator for logo */}
                            {!logoLoaded && !logoError && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                        </div>
                        {/* Logo glow effect */}
                        <div className="absolute inset-0 bg-red-500 rounded-full opacity-5 animate-pulse-glow"></div>
                    </div>
                </div>

                {/* Loading text only */}
                <div className="text-center mb-8">
                    <p className="text-gray-600 text-sm sm:text-base md:text-lg animate-fade-in-out" key={loadingText}>
                        {loadingText}
                    </p>
                </div>

                {/* Progress bar */}
                <div className="w-80 sm:w-96 md:w-[28rem] mb-6">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                        <div
                            className="h-full bg-gradient-to-r from-red-500 via-red-600 to-red-500 rounded-full transition-all duration-300 ease-out relative"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute inset-0 bg-white/30 animate-shimmer-wave"></div>
                        </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 text-center font-medium">
                        {Math.round(progress)}% Complete
                    </div>
                </div>

                {/* Animated indicator dots */}
                <div className="flex space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce-sequence-1 shadow-lg"></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce-sequence-2 shadow-lg"></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce-sequence-3 shadow-lg"></div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float-particle {
                    0%, 100% { 
                        transform: translateY(0px) translateX(0px) rotate(0deg); 
                        opacity: 0.1;
                    }
                    25% { 
                        transform: translateY(-30px) translateX(15px) rotate(90deg); 
                        opacity: 0.3;
                    }
                    50% { 
                        transform: translateY(-60px) translateX(-15px) rotate(180deg); 
                        opacity: 0.5;
                    }
                    75% { 
                        transform: translateY(-30px) translateX(10px) rotate(270deg); 
                        opacity: 0.3;
                    }
                }

                @keyframes ping-slow {
                    0% { 
                        transform: scale(1); 
                        opacity: 0.3; 
                    }
                    50% { 
                        transform: scale(1.05); 
                        opacity: 0.15; 
                    }
                    100% { 
                        transform: scale(1.1); 
                        opacity: 0; 
                    }
                }

                @keyframes ping-medium {
                    0% { 
                        transform: scale(1); 
                        opacity: 0.4; 
                    }
                    50% { 
                        transform: scale(1.08); 
                        opacity: 0.2; 
                    }
                    100% { 
                        transform: scale(1.15); 
                        opacity: 0; 
                    }
                }

                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes spin-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }

                @keyframes gradient-pulse {
                    0%, 100% { opacity: 0.2; }
                    50% { opacity: 0.4; }
                }

                @keyframes float-gentle {
                    0%, 100% { 
                        transform: translateY(0px) scale(1); 
                    }
                    50% { 
                        transform: translateY(-3px) scale(1.02); 
                    }
                }

                @keyframes pulse-glow {
                    0%, 100% { 
                        opacity: 0.05; 
                        transform: scale(1);
                    }
                    50% { 
                        opacity: 0.15; 
                        transform: scale(1.05);
                    }
                }

                @keyframes particle-glow {
                    0%, 100% { 
                        opacity: 0.8; 
                        transform: scale(1);
                        box-shadow: 0 0 6px rgba(239, 68, 68, 0.6);
                    }
                    50% { 
                        opacity: 1; 
                        transform: scale(1.3);
                        box-shadow: 0 0 12px rgba(239, 68, 68, 0.9);
                    }
                }

                @keyframes orbit-1 {
                    from { transform: rotate(0deg) translateX(80px) rotate(0deg); }
                    to { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
                }

                @keyframes orbit-2 {
                    from { transform: rotate(90deg) translateX(80px) rotate(-90deg); }
                    to { transform: rotate(450deg) translateX(80px) rotate(-450deg); }
                }

                @keyframes orbit-3 {
                    from { transform: rotate(180deg) translateX(80px) rotate(-180deg); }
                    to { transform: rotate(540deg) translateX(80px) rotate(-540deg); }
                }

                @keyframes orbit-4 {
                    from { transform: rotate(270deg) translateX(80px) rotate(-270deg); }
                    to { transform: rotate(630deg) translateX(80px) rotate(-630deg); }
                }

                @keyframes spoke-rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes wave-1 {
                    0% { 
                        transform: scale(1); 
                        opacity: 0.2; 
                    }
                    50% { 
                        transform: scale(1.2); 
                        opacity: 0.1; 
                    }
                    100% { 
                        transform: scale(1.4); 
                        opacity: 0; 
                    }
                }

                @keyframes wave-2 {
                    0% { 
                        transform: scale(1); 
                        opacity: 0.15; 
                    }
                    50% { 
                        transform: scale(1.3); 
                        opacity: 0.08; 
                    }
                    100% { 
                        transform: scale(1.6); 
                        opacity: 0; 
                    }
                }

                @keyframes slide-up {
                    from { 
                        transform: translateY(30px); 
                        opacity: 0; 
                    }
                    to { 
                        transform: translateY(0); 
                        opacity: 1; 
                    }
                }

                @keyframes fade-in-out {
                    0% { opacity: 0; transform: translateY(10px); }
                    20%, 80% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(-10px); }
                }

                @keyframes shimmer-wave {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }

                @keyframes bounce-sequence-1 {
                    0%, 60%, 100% { transform: translateY(0); }
                    30% { transform: translateY(-12px); }
                }

                @keyframes bounce-sequence-2 {
                    0%, 60%, 100% { transform: translateY(0); }
                    30% { transform: translateY(-12px); }
                }

                @keyframes bounce-sequence-3 {
                    0%, 60%, 100% { transform: translateY(0); }
                    30% { transform: translateY(-12px); }
                }

                .animate-float-particle {
                    animation: float-particle 5s ease-in-out infinite;
                }

                .animate-ping-slow {
                    animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
                }

                .animate-ping-medium {
                    animation: ping-medium 2.5s cubic-bezier(0, 0, 0.2, 1) infinite 0.5s;
                }

                .animate-spin-slow {
                    animation: spin-slow 4s linear infinite;
                }

                .animate-spin-reverse {
                    animation: spin-reverse 3s linear infinite;
                }

                .animate-gradient-pulse {
                    animation: gradient-pulse 2s ease-in-out infinite;
                }

                .animate-float-gentle {
                    animation: float-gentle 4s ease-in-out infinite;
                }

                .animate-pulse-glow {
                    animation: pulse-glow 3s ease-in-out infinite;
                }

                .animate-particle-glow {
                    animation: particle-glow 1.8s ease-in-out infinite;
                }

                .animate-orbit-1 {
                    animation: orbit-1 4s linear infinite;
                }

                .animate-orbit-2 {
                    animation: orbit-2 4s linear infinite;
                }

                .animate-orbit-3 {
                    animation: orbit-3 4s linear infinite;
                }

                .animate-orbit-4 {
                    animation: orbit-4 4s linear infinite;
                }

                .animate-spoke-rotate {
                    animation: spoke-rotate 5s linear infinite;
                }

                .animate-wave-1 {
                    animation: wave-1 3s ease-out infinite;
                }

                .animate-wave-2 {
                    animation: wave-2 3s ease-out infinite 1s;
                }

                .animate-slide-up {
                    animation: slide-up 0.8s ease-out;
                }

                .animate-fade-in-out {
                    animation: fade-in-out 2.5s ease-in-out infinite;
                }

                .animate-shimmer-wave {
                    animation: shimmer-wave 2s ease-in-out infinite;
                }

                .animate-bounce-sequence-1 {
                    animation: bounce-sequence-1 1.6s ease-in-out infinite;
                }

                .animate-bounce-sequence-2 {
                    animation: bounce-sequence-2 1.6s ease-in-out infinite 0.3s;
                }

                .animate-bounce-sequence-3 {
                    animation: bounce-sequence-3 1.6s ease-in-out infinite 0.6s;
                }
            `}</style>
        </div>
    );
}