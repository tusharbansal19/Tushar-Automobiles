# 🔄 Loading Components Guide

## 📦 **Available Loading Components**

### 1. **Loading** - Full Screen Brand Loading
Perfect for initial app loading with branding and progress.

```tsx
import { Loading } from '@/components/Common';

<Loading 
  message="Welcome to Tushar Automobiles"
  duration={2500}
  showProgress={true}
  onLoadingComplete={() => console.log('Loading complete!')}
/>
```

**Props:**
- `onLoadingComplete?: () => void` - Callback when loading finishes
- `duration?: number` - Loading duration in ms (default: 2000)
- `showProgress?: boolean` - Show progress bar (default: true)
- `message?: string` - Custom loading message

### 2. **Spinner** - Simple Loading Spinner
Lightweight spinner for inline loading states.

```tsx
import { Spinner } from '@/components/Common';

<Spinner size="md" color="red" />
```

**Props:**
- `size?: 'sm' | 'md' | 'lg' | 'xl'` - Spinner size (default: 'md')
- `color?: 'red' | 'blue' | 'gray' | 'white'` - Spinner color (default: 'red')
- `className?: string` - Additional CSS classes

### 3. **LoadingButton** - Button with Loading State
Button that shows loading state with spinner.

```tsx
import { LoadingButton } from '@/components/Common';

<LoadingButton
  loading={isSubmitting}
  onClick={handleSubmit}
  variant="primary"
  loadingText="Submitting..."
>
  Submit Order
</LoadingButton>
```

**Props:**
- `loading?: boolean` - Show loading state
- `disabled?: boolean` - Disable button
- `variant?: 'primary' | 'secondary' | 'outline'` - Button style
- `size?: 'sm' | 'md' | 'lg'` - Button size
- `loadingText?: string` - Text to show when loading

### 4. **PageLoading** - Page-Level Loading
For loading entire pages or sections.

```tsx
import { PageLoading } from '@/components/Common';

// Full screen loading
<PageLoading message="Loading products..." fullScreen={true} />

// Overlay loading
<PageLoading message="Processing..." overlay={true} />

// Inline loading
<PageLoading message="Loading..." />
```

**Props:**
- `message?: string` - Loading message (default: "Loading...")
- `fullScreen?: boolean` - Full screen loading (default: false)
- `overlay?: boolean` - Show as overlay (default: false)

## 🎯 **Usage Examples**

### **Authentication Loading**
```tsx
// In signin form
<LoadingButton
  loading={isLoggingIn}
  onClick={handleLogin}
  type="submit"
  className="w-full"
  loadingText="Signing in..."
>
  Sign In
</LoadingButton>
```

### **Page Navigation Loading**
```tsx
// In loading.tsx files
export default function Loading() {
  return <PageLoading message="Loading page..." fullScreen={true} />;
}
```

### **Data Fetching Loading**
```tsx
// While fetching data
{isLoading ? (
  <PageLoading message="Loading products..." />
) : (
  <ProductList products={products} />
)}
```

### **Form Submission Loading**
```tsx
// Form with loading overlay
{isSubmitting && (
  <PageLoading message="Processing your order..." overlay={true} />
)}
```

### **Inline Loading States**
```tsx
// Small loading indicators
<div className="flex items-center">
  <Spinner size="sm" className="mr-2" />
  <span>Loading...</span>
</div>
```

## 🎨 **Styling & Customization**

### **Custom Colors**
```tsx
// Custom spinner colors
<Spinner color="blue" />
<Spinner className="border-green-500" />
```

### **Custom Button Variants**
```tsx
// Custom button styles
<LoadingButton
  variant="outline"
  className="border-blue-500 text-blue-500 hover:bg-blue-500"
>
  Custom Button
</LoadingButton>
```

### **Custom Loading Messages**
```tsx
// Dynamic loading messages
const [loadingMessage, setLoadingMessage] = useState("Initializing...");

useEffect(() => {
  const messages = [
    "Initializing...",
    "Loading components...",
    "Almost ready..."
  ];
  
  let index = 0;
  const interval = setInterval(() => {
    setLoadingMessage(messages[index]);
    index = (index + 1) % messages.length;
  }, 1000);
  
  return () => clearInterval(interval);
}, []);

<Loading message={loadingMessage} />
```

## 📱 **Responsive Design**

All loading components are responsive:
- **Mobile**: Smaller sizes, touch-friendly
- **Tablet**: Medium sizes, optimized spacing
- **Desktop**: Full sizes, enhanced animations

## ♿ **Accessibility**

All components include:
- `role="status"` for screen readers
- `aria-label` attributes
- `sr-only` text for screen readers
- Keyboard navigation support

## 🔧 **Integration with Existing Code**

### **Replace Old PageLoader**
```tsx
// Old
import PageLoader from '@/components/PageLoader';
<PageLoader onLoadingComplete={callback} />

// New
import { Loading } from '@/components/Common';
<Loading onLoadingComplete={callback} />
```

### **Replace Basic Spinners**
```tsx
// Old
<div className="animate-spin">...</div>

// New
import { Spinner } from '@/components/Common';
<Spinner />
```

## 🚀 **Performance Tips**

1. **Use appropriate loading types**:
   - `Spinner` for quick operations (< 2s)
   - `PageLoading` for medium operations (2-5s)
   - `Loading` for initial app load

2. **Optimize loading durations**:
   - Keep under 3 seconds when possible
   - Show progress for longer operations
   - Provide meaningful messages

3. **Avoid loading overload**:
   - Don't show multiple loading states
   - Use skeleton screens for content loading
   - Implement proper error states

## ✅ **Best Practices**

1. **Consistent Loading States**: Use the same loading component throughout similar contexts
2. **Meaningful Messages**: Provide context-specific loading messages
3. **Proper Timing**: Match loading duration to actual operation time
4. **Graceful Fallbacks**: Always handle loading completion and errors
5. **User Feedback**: Show progress for operations > 2 seconds

The new loading components provide a professional, consistent, and accessible loading experience throughout your automobile website!