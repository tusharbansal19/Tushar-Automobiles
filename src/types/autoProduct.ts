export interface AutoProduct {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  description: string;
  link: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  features: string[];
  specifications: {
    [key: string]: string;
  };
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface ProductBrand {
  id: string;
  name: string;
  logo: string;
  description: string;
  productCount: number;
}

export interface ProductFilter {
  categories: string[];
  brands: string[];
  priceRange: {
    min: number;
    max: number;
  };
  inStock?: boolean;
  rating?: number;
}