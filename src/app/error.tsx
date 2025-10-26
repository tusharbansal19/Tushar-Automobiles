'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-2 flex items-center justify-center">
      <div className="max-w-[500px] w-full mx-auto px-4 text-center">
        <div className="bg-white rounded-xl shadow-1 p-8">
          <h2 className="text-2xl font-bold text-red mb-4">Something went wrong!</h2>
          <p className="text-gray-600 mb-6">
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={() => reset()}
            className="bg-red text-white px-6 py-3 rounded-md hover:bg-red/90 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}