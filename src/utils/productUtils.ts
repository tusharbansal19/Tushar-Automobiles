import { AutoProduct } from '@/types/autoProduct';

export const formatPrice = (price: number): string => {
  return `₹${price.toLocaleString('en-IN')}`;
};

export const calculateDiscount = (originalPrice: number, currentPrice: number): number => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const getDiscountedPrice = (product: AutoProduct): number => {
  if (product.originalPrice && product.discount) {
    return product.originalPrice - (product.originalPrice * product.discount / 100);
  }
  return product.price;
};

export const isOnSale = (product: AutoProduct): boolean => {
  return !!(product.originalPrice && product.discount && product.discount > 0);
};

export const getProductUrl = (product: AutoProduct): string => {
  return `/product/${product.id}`;
};

export const generateProductSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const getStockStatus = (product: AutoProduct): string => {
  return product.inStock ? 'In Stock' : 'Out of Stock';
};

export const getStockStatusColor = (product: AutoProduct): string => {
  return product.inStock ? 'text-green-600' : 'text-red-600';
};

export const sortProducts = (products: AutoProduct[], sortBy: string): AutoProduct[] => {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'price-low-high':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-high-low':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'rating':
      return sortedProducts.sort((a, b) => b.rating - a.rating);
    case 'name':
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    case 'newest':
      return sortedProducts; // Assuming the array is already in newest first order
    case 'discount':
      return sortedProducts.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    default:
      return sortedProducts;
  }
};

export const filterProducts = (
  products: AutoProduct[],
  filters: {
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    minRating?: number;
  }
): AutoProduct[] => {
  return products.filter(product => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.brand && product.brand !== filters.brand) return false;
    if (filters.minPrice && product.price < filters.minPrice) return false;
    if (filters.maxPrice && product.price > filters.maxPrice) return false;
    if (filters.inStock !== undefined && product.inStock !== filters.inStock) return false;
    if (filters.minRating && product.rating < filters.minRating) return false;
    return true;
  });
};