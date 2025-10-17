# Next.js Loader System Usage Guide

## Overview
This loader system provides flexible, reusable loading components for your Next.js application with multiple patterns and use cases.

## Components Created

### 1. Basic Loader Component (`src/components/Common/Loader.tsx`)
A flexible loader with multiple variants, sizes, and colors.

### 2. Loading Context (`src/context/LoadingContext.tsx`)
Global state management for loading states across your app.

### 3. Async Operation Hook (`src/hooks/useAsyncOperation.ts`)
Custom hook for handling async operations with built-in loading states.

### 4. Higher-Order Component (`src/components/Common/WithLoader.tsx`)
HOC for wrapping components with loading functionality.

## Usage Examples

### 1. Basic Loader Usage

```tsx
import Loader from '@/components/Common/Loader';

// Simple spinner
<Loader />

// With custom props
<Loader 
  size="lg" 
  variant="dots" 
  color="blue" 
  text="Loading data..." 
/>

// Full screen loader
<Loader fullScreen text="Please wait..." />

// Overlay loader
<Loader overlay text="Processing..." />
```

### 2. Pre-built Loader Components

```tsx
import { ButtonLoader, PageLoader, SectionLoader, OverlayLoader } from '@/components/Common/Loader';

// In a button
<button disabled={loading}>
  {loading && <ButtonLoader />}
  {loading ? 'Loading...' : 'Submit'}
</button>

// Full page loader
{isPageLoading && <PageLoader text="Loading page..." />}

// Section loader
<SectionLoader text="Fetching products..." />

// Overlay loader
<div className="relative">
  <YourContent />
  {loading && <OverlayLoader text="Saving..." />}
</div>
```

### 3. Using Loading Context

```tsx
import { useLoading } from '@/context/LoadingContext';

function MyComponent() {
  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleSubmit = async () => {
    startLoading('Submitting form...');
    try {
      await submitForm();
    } finally {
      stopLoading();
    }
  };

  return (
    <div>
      <button onClick={handleSubmit} disabled={isLoading}>
        Submit
      </button>
      {isLoading && <Loader overlay />}
    </div>
  );
}
```

### 4. Using Async Operation Hook

```tsx
import { useAsyncOperation } from '@/hooks/useAsyncOperation';

function DataComponent() {
  const { isLoading, data, error, execute } = useAsyncOperation({
    onSuccess: (data) => console.log('Data loaded:', data),
    onError: (error) => console.error('Failed to load:', error)
  });

  const loadData = () => {
    execute(async () => {
      const response = await fetch('/api/data');
      return response.json();
    });
  };

  if (isLoading) return <SectionLoader text="Loading data..." />;
  if (error) return <div>Error: {error.message}</div>;
  if (data) return <div>Data: {JSON.stringify(data)}</div>;

  return <button onClick={loadData}>Load Data</button>;
}
```

### 5. Using Higher-Order Component

```tsx
import { withLoader } from '@/components/Common/WithLoader';

const MyCard = ({ title, content }) => (
  <div className="card">
    <h3>{title}</h3>
    <p>{content}</p>
  </div>
);

const CardWithLoader = withLoader(MyCard);

// Usage
<CardWithLoader 
  title="My Title"
  content="My Content"
  isLoading={loading}
  loadingText="Loading card..."
/>
```

### 6. API Integration Example

```tsx
import { useState, useEffect } from 'react';
import { SectionLoader } from '@/components/Common/Loader';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <SectionLoader text="Loading products..." />;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### 7. Form Submission with Loading

```tsx
import { useState } from 'react';
import { ButtonLoader } from '@/components/Common/Loader';

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      alert('Message sent successfully!');
    } catch (error) {
      alert('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button 
        type="submit" 
        disabled={loading}
        className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded"
      >
        {loading && <ButtonLoader />}
        <span>{loading ? 'Sending...' : 'Send Message'}</span>
      </button>
    </form>
  );
}
```

## Loader Variants

- **spinner**: Classic spinning circle
- **dots**: Three bouncing dots
- **pulse**: Pulsing circle
- **bars**: Animated bars

## Sizes
- **sm**: Small (16px)
- **md**: Medium (32px) - default
- **lg**: Large (48px)
- **xl**: Extra Large (64px)

## Colors
- **red**: Red theme (default)
- **blue**: Blue theme
- **green**: Green theme
- **gray**: Gray theme
- **white**: White theme

## Best Practices

1. **Use appropriate sizes**: Small for buttons, medium for sections, large for full-page
2. **Provide meaningful text**: Always include descriptive loading text
3. **Handle errors**: Always handle loading states with error handling
4. **Minimum loading time**: Consider using `minLoadingTime` for better UX
5. **Accessibility**: Loaders include proper ARIA attributes
6. **Performance**: Use overlay loaders sparingly to avoid blocking UI

## Integration with Your App

The loader system is now integrated into your layout with the `LoadingProvider`. You can use any of these patterns throughout your application for consistent loading states.