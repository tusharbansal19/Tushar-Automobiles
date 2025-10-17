'use client';

import { useState, useCallback } from 'react';

interface UseAsyncOperationOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  loadingText?: string;
}

export function useAsyncOperation(options: UseAsyncOperationOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const execute = useCallback(async (asyncFunction: () => Promise<any>) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await asyncFunction();
      setData(result);
      
      if (options.onSuccess) {
        options.onSuccess(result);
      }
      
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      
      if (options.onError) {
        options.onError(error);
      }
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    isLoading,
    error,
    data,
    execute,
    reset
  };
}