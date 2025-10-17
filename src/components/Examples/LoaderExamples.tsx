'use client';

import { useState } from 'react';
import Loader, { ButtonLoader, SectionLoader, OverlayLoader } from '../Common/Loader';
import { useAsyncOperation } from '../../hooks/useAsyncOperation';
import { withLoader } from '../Common/WithLoader';

// Example component with HOC
const ExampleCard = ({ title, content }: { title: string; content: string }) => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{content}</p>
  </div>
);

const CardWithLoader = withLoader(ExampleCard);

export default function LoaderExamples() {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [cardLoading, setCardLoading] = useState(false);
  const [overlayLoading, setOverlayLoading] = useState(false);

  // Example with async operation hook
  const { isLoading: asyncLoading, execute, data, error } = useAsyncOperation({
    onSuccess: (result) => console.log('Success:', result),
    onError: (err) => console.error('Error:', err)
  });

  const simulateAsyncOperation = () => {
    execute(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { message: 'Data loaded successfully!' };
    });
  };

  const handleButtonClick = async () => {
    setButtonLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setButtonLoading(false);
  };

  const handleCardLoad = async () => {
    setCardLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setCardLoading(false);
  };

  const handleOverlayLoad = async () => {
    setOverlayLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setOverlayLoading(false);
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Loader Examples</h1>

      {/* Basic Loaders */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Basic Loaders</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <p className="mb-2 text-sm font-medium">Spinner</p>
            <Loader variant="spinner" size="md" />
          </div>
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <p className="mb-2 text-sm font-medium">Dots</p>
            <Loader variant="dots" size="md" />
          </div>
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <p className="mb-2 text-sm font-medium">Pulse</p>
            <Loader variant="pulse" size="md" />
          </div>
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <p className="mb-2 text-sm font-medium">Bars</p>
            <Loader variant="bars" size="md" />
          </div>
        </div>
      </section>

      {/* Button with Loader */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Button Loading</h2>
        <button
          onClick={handleButtonClick}
          disabled={buttonLoading}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 flex items-center space-x-2"
        >
          {buttonLoading && <ButtonLoader />}
          <span>{buttonLoading ? 'Loading...' : 'Click Me'}</span>
        </button>
      </section>

      {/* Section Loader */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Section Loading</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          {asyncLoading ? (
            <SectionLoader text="Fetching data..." />
          ) : (
            <div>
              <button
                onClick={simulateAsyncOperation}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
              >
                Load Data
              </button>
              {data && (
                <div className="p-4 bg-green-100 text-green-800 rounded">
                  {data.message}
                </div>
              )}
              {error && (
                <div className="p-4 bg-red-100 text-red-800 rounded">
                  Error: {error.message}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Card with HOC Loader */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Component with HOC Loader</h2>
        <button
          onClick={handleCardLoad}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-4"
        >
          Load Card Content
        </button>
        <CardWithLoader
          title="Example Card"
          content="This card demonstrates the HOC loader pattern."
          isLoading={cardLoading}
          loadingText="Loading card content..."
        />
      </section>

      {/* Overlay Loader */}
      <section className="space-y-4 relative">
        <h2 className="text-2xl font-semibold text-gray-800">Overlay Loading</h2>
        <button
          onClick={handleOverlayLoad}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Show Overlay Loader
        </button>
        <div className="relative bg-gray-50 rounded-lg p-6 min-h-[200px]">
          <p>This content will be covered by an overlay loader.</p>
          <p>The overlay provides a semi-transparent background with the loader centered.</p>
          {overlayLoading && <OverlayLoader text="Processing..." />}
        </div>
      </section>

      {/* Different Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Different Sizes</h2>
        <div className="flex items-center space-x-8">
          <div className="text-center">
            <p className="mb-2 text-sm">Small</p>
            <Loader size="sm" />
          </div>
          <div className="text-center">
            <p className="mb-2 text-sm">Medium</p>
            <Loader size="md" />
          </div>
          <div className="text-center">
            <p className="mb-2 text-sm">Large</p>
            <Loader size="lg" />
          </div>
          <div className="text-center">
            <p className="mb-2 text-sm">Extra Large</p>
            <Loader size="xl" />
          </div>
        </div>
      </section>

      {/* Different Colors */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Different Colors</h2>
        <div className="flex items-center space-x-8">
          <Loader color="red" text="Red" />
          <Loader color="blue" text="Blue" />
          <Loader color="green" text="Green" />
          <Loader color="gray" text="Gray" />
        </div>
      </section>
    </div>
  );
}