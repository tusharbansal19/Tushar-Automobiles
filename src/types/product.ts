export type Product = {
  title: string;
  brand: string;
  category: string;
  vehicleType: string; // Car, Van, etc.
  company: string; // Maruti Suzuki, Honda, Tata, etc.
  model: string; // Swift, City, Nexon, etc.
  variant?: string; // VXI, ZX CVT, XZ Plus, etc.
  fuelType: string; // Petrol, Diesel, Electric, Hybrid
  transmission: string; // Manual, Automatic, CVT
  compatibleVehicles?: string[];
  specifications?: {
    [key: string]: string;
  };
  stockStatus: 'in-stock' | 'out-of-stock' | 'pre-order';
  reviews: number;
  price: number;
  discountedPrice: number;
  id: number;
  partNumber?: string;
  warranty?: string;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};
