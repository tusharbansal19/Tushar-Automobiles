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

export const AutoProductInmage =
    [
        "https://m.media-amazon.com/images/I/71Fc-CF198S._SX679_.jpg",
        
    ]
 

export const autoProductsData: AutoProduct[] = [
  // Engine Oils
  {
    id: "castrol-gtx-20w50",
    name: "Castrol GTX 20W50 Engine Oil - 3L",
    category: "Engine Components",
    brand: "Castrol",
    price: 899,
    originalPrice: 1150,
    discount: 22,
    image: "/images/arrivals/3l-castrol-gtx-20w50-engine-oil-removebg-preview.png",
    description: "High-performance engine oil that provides superior protection for your vehicle's engine.",
    link: "/product/castrol-gtx-20w50-engine-oil-3l",
    inStock: true,
    rating: 4.5,
    reviews: 128,
    features: [
      "Superior engine protection",
      "Reduces engine wear",
      "Improves fuel efficiency",
      "All-weather performance"
    ],
    specifications: {
      "Viscosity": "20W50",
      "Volume": "3 Liters",
      "Type": "Mineral Oil",
      "API Rating": "SN/CF"
    }
  },
  {
    id: "mobil-1-5w30",
    name: "Mobil 1 Advanced Full Synthetic 5W30 - 4L",
    category: "Engine Components",
    brand: "Mobil",
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    image: "/images/arrivals/71Y27LKXBdL-removebg-preview.png",
    description: "Advanced full synthetic engine oil for maximum engine performance and protection.",
    link: "/product/mobil-1-advanced-full-synthetic-5w30-4l",
    inStock: true,
    rating: 4.7,
    reviews: 95,
    features: [
      "Full synthetic formula",
      "Extended drain intervals",
      "Cold weather protection",
      "High temperature stability"
    ],
    specifications: {
      "Viscosity": "5W30",
      "Volume": "4 Liters",
      "Type": "Full Synthetic",
      "API Rating": "SN Plus"
    }
  },

  // Clutch Parts
  {
    id: "clutch-plate-maruti-swift",
    name: "Clutch Plate for Maruti Swift/Dzire",
    category: "Braking System",
    brand: "Valeo",
    price: 2499,
    originalPrice: 3200,
    discount: 22,
    image: "/images/arrivals/clutch-plate-500x500-removebg-preview.png",
    description: "High-quality clutch plate designed for smooth engagement and long-lasting performance.",
    link: "/product/clutch-plate-maruti-swift-dzire",
    inStock: true,
    rating: 4.3,
    reviews: 67,
    features: [
      "OEM quality",
      "Smooth engagement",
      "Long-lasting durability",
      "Perfect fit guarantee"
    ],
    specifications: {
      "Diameter": "200mm",
      "Spline Count": "20",
      "Material": "Organic",
      "Compatibility": "Swift, Dzire, Baleno"
    }
  },

  // Brake Parts
  {
    id: "brake-pads-hyundai-i20",
    name: "Brake Pads Set for Hyundai i20/Elite",
    category: "Braking System",
    brand: "Bosch",
    price: 1899,
    originalPrice: 2400,
    discount: 21,
    image: "/images/arrivals/41qOLbQLn+L._AC_SS450_-removebg-preview.png",
    description: "Premium brake pads offering excellent stopping power and reduced brake dust.",
    link: "/product/brake-pads-hyundai-i20-elite",
    inStock: true,
    rating: 4.6,
    reviews: 89,
    features: [
      "Excellent stopping power",
      "Low brake dust",
      "Quiet operation",
      "Long pad life"
    ],
    specifications: {
      "Type": "Ceramic",
      "Position": "Front",
      "Thickness": "17mm",
      "Compatibility": "i20, Elite i20, Active"
    }
  },

  // Air Filters
  {
    id: "air-filter-honda-city",
    name: "Air Filter for Honda City/Amaze",
    category: "Engine Components",
    brand: "Mann Filter",
    price: 599,
    originalPrice: 750,
    discount: 20,
    image: "/images/arrivals/OIP__4_-removebg-preview.png",
    description: "High-efficiency air filter that ensures clean air intake for optimal engine performance.",
    link: "/product/air-filter-honda-city-amaze",
    inStock: true,
    rating: 4.4,
    reviews: 156,
    features: [
      "High filtration efficiency",
      "Easy installation",
      "Improved engine performance",
      "Long service life"
    ],
    specifications: {
      "Type": "Paper Element",
      "Dimensions": "245 x 190 x 45mm",
      "Filtration": "99.5%",
      "Compatibility": "City, Amaze, Jazz"
    }
  },

  // Headlights
  {
    id: "headlight-assembly-tata-tiago",
    name: "Headlight Assembly for Tata Tiago",
    category: "Lighting",
    brand: "Hella",
    price: 3499,
    originalPrice: 4200,
    discount: 17,
    image: "/images/products/product-1-bg-1.png",
    description: "Complete headlight assembly with crystal clear lens and optimal light distribution.",
    link: "/product/headlight-assembly-tata-tiago",
    inStock: true,
    rating: 4.2,
    reviews: 43,
    features: [
      "Crystal clear lens",
      "Easy plug-and-play",
      "Weather resistant",
      "OEM fitment"
    ],
    specifications: {
      "Type": "Halogen",
      "Voltage": "12V",
      "Bulb Type": "H4",
      "Side": "Left (Driver)"
    }
  },

  // Spark Plugs
  {
    id: "spark-plugs-maruti-alto",
    name: "Spark Plugs Set for Maruti Alto K10",
    category: "Engine Components",
    brand: "NGK",
    price: 899,
    originalPrice: 1100,
    discount: 18,
    image: "/images/products/product-2-bg-1.png",
    description: "High-performance spark plugs for improved ignition and fuel efficiency.",
    link: "/product/spark-plugs-maruti-alto-k10",
    inStock: true,
    rating: 4.5,
    reviews: 201,
    features: [
      "Improved ignition",
      "Better fuel efficiency",
      "Reduced emissions",
      "Long service life"
    ],
    specifications: {
      "Type": "Iridium",
      "Thread Size": "14mm",
      "Heat Range": "6",
      "Quantity": "4 pieces"
    }
  },

  // Shock Absorbers
  {
    id: "shock-absorber-mahindra-scorpio",
    name: "Rear Shock Absorber for Mahindra Scorpio",
    category: "Suspension System",
    brand: "Monroe",
    price: 2799,
    originalPrice: 3500,
    discount: 20,
    image: "/images/products/product-3-bg-1.png",
    description: "Heavy-duty shock absorber designed for SUVs, providing excellent ride comfort.",
    link: "/product/shock-absorber-mahindra-scorpio",
    inStock: true,
    rating: 4.3,
    reviews: 78,
    features: [
      "Heavy-duty construction",
      "Improved ride comfort",
      "Reduced body roll",
      "All-terrain performance"
    ],
    specifications: {
      "Type": "Twin-tube",
      "Position": "Rear",
      "Length": "580mm",
      "Mounting": "Eye-to-eye"
    }
  },

  // Fuel Pumps
  {
    id: "fuel-pump-toyota-innova",
    name: "Electric Fuel Pump for Toyota Innova",
    category: "Fuel System",
    brand: "Denso",
    price: 4599,
    originalPrice: 5800,
    discount: 21,
    image: "/images/products/product-4-bg-1.png",
    description: "High-pressure electric fuel pump ensuring consistent fuel delivery to the engine.",
    link: "/product/fuel-pump-toyota-innova",
    inStock: true,
    rating: 4.4,
    reviews: 52,
    features: [
      "High-pressure delivery",
      "Consistent performance",
      "Long service life",
      "OEM replacement"
    ],
    specifications: {
      "Type": "Electric",
      "Pressure": "3.5 bar",
      "Flow Rate": "120 L/hr",
      "Voltage": "12V"
    }
  },

  // Radiators
  {
    id: "radiator-ford-ecosport",
    name: "Radiator Assembly for Ford EcoSport",
    category: "Cooling System",
    brand: "Valeo",
    price: 6999,
    originalPrice: 8500,
    discount: 18,
    image: "/images/products/product-5-bg-1.png",
    description: "Complete radiator assembly for efficient engine cooling and temperature control.",
    link: "/product/radiator-ford-ecosport",
    inStock: true,
    rating: 4.1,
    reviews: 34,
    features: [
      "Efficient cooling",
      "Corrosion resistant",
      "Direct fit replacement",
      "Leak-proof design"
    ],
    specifications: {
      "Core Size": "400 x 320mm",
      "Tank Material": "Plastic",
      "Core Material": "Aluminum",
      "Inlet/Outlet": "32mm"
    }
  },

  // Batteries
  {
    id: "car-battery-exide-fmi0",
    name: "Exide FMI0 Car Battery 35Ah",
    category: "Accessories",
    brand: "Exide",
    price: 3299,
    originalPrice: 3800,
    discount: 13,
    image: "/images/products/product-6-bg-1.png",
    description: "Maintenance-free car battery with excellent cranking power and long life.",
    link: "/product/car-battery-exide-fmi0-35ah",
    inStock: true,
    rating: 4.6,
    reviews: 167,
    features: [
      "Maintenance-free",
      "High cranking power",
      "Long service life",
      "Leak-proof design"
    ],
    specifications: {
      "Capacity": "35Ah",
      "Voltage": "12V",
      "CCA": "320A",
      "Dimensions": "187 x 127 x 227mm"
    }
  }
];

// Helper functions
export const getProductsByCategory = (category: string): AutoProduct[] => {
  return autoProductsData.filter(product => product.category === category);
};

export const getProductById = (id: string): AutoProduct | undefined => {
  return autoProductsData.find(product => product.id === id);
};

export const getFeaturedProducts = (count: number = 8): AutoProduct[] => {
  return autoProductsData
    .filter(product => product.discount && product.discount > 15)
    .slice(0, count);
};

export const getProductsByBrand = (brand: string): AutoProduct[] => {
  return autoProductsData.filter(product => product.brand === brand);
};

export const searchProducts = (query: string): AutoProduct[] => {
  const searchTerm = query.toLowerCase();
  return autoProductsData.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
};

export default autoProductsData;