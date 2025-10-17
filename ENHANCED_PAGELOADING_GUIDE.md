# 🎨 Enhanced PageLoading Component

## ✨ **New Features**

The PageLoading component has been enhanced with beautiful animations and a smaller, more elegant logo design:

### 🎯 **Key Improvements:**
- **Smaller Logo**: Compact logo design with better proportions
- **Red-themed Animations**: Multiple layers of red-colored animations
- **Orbiting Particles**: 4 particles orbiting around the logo
- **Gradient Effects**: Rotating gradient rings
- **Pulsing Glow**: Subtle glow effects around elements
- **Energy Waves**: Expanding wave animations
- **Floating Animation**: Gentle floating motion for the logo

## 🚀 **Usage Examples**

### **Basic Animated Loading**
```tsx
import PageLoading from '@/components/Common/PageLoading';

// Full-screen animated loading
<PageLoading 
  message="Loading your automotive experience..."
  fullScreen={true}
  animated={true}
/>
```

### **Overlay with Progress**
```tsx
// Overlay loading with progress bar
<PageLoading 
  message="Processing your order..."
  overlay={true}
  animated={true}
  showProgress={true}
  duration={5000}
/>
```

### **Simple Non-animated**
```tsx
// Simple loading without animations
<PageLoading 
  message="Loading..."
  animated={false}
/>
```

### **Page Loading with Progress**
```tsx
// Page loading with progress tracking
<PageLoading 
  message="Loading products..."
  fullScreen={true}
  animated={true}
  showProgress={true}
  duration={3000}
/>
```

## 🎨 **Animation Layers**

### **1. Logo Container**
- White circular background with shadow
- Gentle floating animation
- Subtle glow effect
- Compact logo (12x6 for overlay, 12x6 for full-screen)

### **2. Rotating Rings**
- **Outer Ring**: Pulsing red border with ping animation
- **Middle Ring**: Gradient rotating ring (red-500 to red-600)
- **Inner Ring**: Spinning ring with transparent top

### **3. Orbiting Particles**
- 4 red particles orbiting at different positions
- Each particle has glow animation
- Different sizes and colors (red-300 to red-600)
- Smooth orbital motion

### **4. Energy Effects**
- **Rotating Spokes**: 4 gradient spokes rotating around center
- **Energy Waves**: 2 expanding wave rings
- **Background Particles**: Floating particles in background

## 🎯 **Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | `"Loading..."` | Loading message text |
| `fullScreen` | `boolean` | `false` | Full-screen loading |
| `overlay` | `boolean` | `false` | Overlay mode with backdrop |
| `animated` | `boolean` | `true` | Enable animations |
| `showProgress` | `boolean` | `false` | Show progress bar |
| `duration` | `number` | `3000` | Animation duration (ms) |

## 🎨 **Color Scheme**

### **Red Variations Used:**
- `red-200`: Light borders and subtle effects
- `red-300`: Medium particles and secondary elements
- `red-400`: Primary particles and rings
- `red-500`: Main elements and gradients
- `red-600`: Accent elements and gradient stops

### **Animation Timings:**
- **Logo Float**: 3s gentle up/down motion
- **Particle Orbit**: 3s circular motion
- **Ring Rotation**: 2-4s spinning
- **Glow Pulse**: 1.5-2s pulsing effect
- **Wave Expansion**: 2s expanding waves

## 📱 **Responsive Design**

### **Full-Screen Mode:**
- Logo: 16x16 container with 12x6 image
- Particles: 2px and 1.5px sizes
- Rings: 24px outer diameter
- Optimized for all screen sizes

### **Overlay Mode:**
- Logo: 12x12 container with 8x4 image
- Particles: 1.5px and 1px sizes
- Rings: 20px outer diameter
- Compact design for modal use

## 🎭 **Animation States**

### **Loading Messages:**
The component cycles through contextual messages:
1. "Initializing..."
2. "Loading components..."
3. "Preparing interface..."
4. "Almost ready..."
5. Custom message

### **Progress Animation:**
- Smooth progress bar with shimmer effect
- Percentage display
- Gradient background with wave animation

## 🔧 **Implementation in Pages**

### **Update Loading Files:**
```tsx
// src/app/(site)/loading.tsx
import PageLoading from '@/components/Common/PageLoading';

export default function SiteLoading() {
  return (
    <PageLoading 
      message="Welcome to Tushar Automobiles"
      fullScreen={true}
      animated={true}
      showProgress={true}
      duration={2500}
    />
  );
}
```

### **Cart Loading:**
```tsx
// src/app/(site)/(pages)/cart/loading.tsx
import PageLoading from '@/components/Common/PageLoading';

export default function Loading() {
  return (
    <PageLoading 
      message="Loading your cart..."
      fullScreen={true}
      animated={true}
    />
  );
}
```

## ✨ **Visual Features**

### **🎨 Aesthetic Elements:**
- Smooth gradient backgrounds
- Drop shadows and glows
- Particle effects
- Orbital animations
- Pulsing elements
- Wave propagation

### **🚀 Performance:**
- CSS-based animations (GPU accelerated)
- Optimized particle count
- Efficient re-renders
- Smooth 60fps animations

### **♿ Accessibility:**
- Respects `prefers-reduced-motion`
- Screen reader friendly
- Proper contrast ratios
- Semantic HTML structure

The enhanced PageLoading component now provides a premium, automotive-themed loading experience with beautiful red animations and a professional appearance!