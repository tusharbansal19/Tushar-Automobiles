'use client';

import { ComponentType, useState, useEffect } from 'react';
import Loader from './Loader';

interface WithLoaderProps {
  isLoading?: boolean;
  loadingText?: string;
  loaderSize?: 'sm' | 'md' | 'lg' | 'xl';
  loaderVariant?: 'spinner' | 'dots' | 'pulse' | 'bars';
  overlay?: boolean;
  minLoadingTime?: number;
}

export function withLoader<P extends object>(
  WrappedComponent: ComponentType<P>,
  defaultOptions: WithLoaderProps = {}
) {
  return function WithLoaderComponent(props: P & WithLoaderProps) {
    const {
      isLoading = false,
      loadingText = 'Loading...',
      loaderSize = 'md',
      loaderVariant = 'spinner',
      overlay = true,
      minLoadingTime = 0,
      ...componentProps
    } = { ...defaultOptions, ...props };

    const [showLoader, setShowLoader] = useState(isLoading);

    useEffect(() => {
      if (isLoading) {
        setShowLoader(true);
      } else if (minLoadingTime > 0) {
        const timer = setTimeout(() => {
          setShowLoader(false);
        }, minLoadingTime);
        return () => clearTimeout(timer);
      } else {
        setShowLoader(false);
      }
    }, [isLoading, minLoadingTime]);

    return (
      <div className="relative">
        <WrappedComponent {...(componentProps as P)} />
        {showLoader && (
          <Loader
            size={loaderSize}
            variant={loaderVariant}
            text={loadingText}
            overlay={overlay}
            color="red"
          />
        )}
      </div>
    );
  };
}

// Pre-configured HOCs for common use cases
export const withSpinnerLoader = <P extends object>(Component: ComponentType<P>) =>
  withLoader(Component, { loaderVariant: 'spinner', overlay: true });

export const withDotsLoader = <P extends object>(Component: ComponentType<P>) =>
  withLoader(Component, { loaderVariant: 'dots', overlay: false });

export const withPulseLoader = <P extends object>(Component: ComponentType<P>) =>
  withLoader(Component, { loaderVariant: 'pulse', overlay: true });