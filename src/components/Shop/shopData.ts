import { Product } from "@/types/product";

// Automobile data with comprehensive car models and brands
const shopData: Product[] = [
  // Maruti Suzuki Cars
  {
    title: "Maruti Suzuki Swift VXI",
    brand: "Maruti Suzuki",
    category: "Hatchback",
    vehicleType: "Car",
    company: "Maruti Suzuki",
    model: "Swift",
    variant: "VXI",
    fuelType: "Petrol",
    transmission: "Manual",
    specifications: {
      "Engine": "1.2L K-Series",
      "Power": "83 PS",
      "Mileage": "23.20 kmpl",
      "Seating": "5"
    },
    stockStatus: "in-stock",
    reviews: 245,
    price: 650000.0,
    discountedPrice: 625000.0,
    id: 1,
    partNumber: "SWIFT-VXI-2024",
    warranty: "2 Years",
    imgs: {
      thumbnails: [
        "/images/cars/swift-thumbnail.png",
        "/images/categories/hatchback.png",
      ],
      previews: [
        "/images/cars/swift-preview.jpg",
        "/images/categories/hatchback.png",
      ],
    },
  },
  {
    title: "Maruti Suzuki Alto K10",
    brand: "Maruti Suzuki",
    category: "Hatchback",
    vehicleType: "Car",
    company: "Maruti Suzuki",
    model: "Alto",
    variant: "K10",
    fuelType: "Petrol",
    transmission: "Manual",
    specifications: {
      "Engine": "1.0L K-Series",
      "Power": "67 PS",
      "Mileage": "24.39 kmpl",
      "Seating": "5"
    },
    stockStatus: "in-stock",
    reviews: 189,
    price: 450000.0,
    discountedPrice: 435000.0,
    id: 2,
    partNumber: "ALTO-K10-2024",
    warranty: "2 Years",
    imgs: {
      thumbnails: [
        "/images/cars/alto-thumbnail.png",
        "/images/categories/hatchback.png",
      ],
      previews: [
        "/images/cars/alto-preview.jpg",
        "/images/categories/hatchback.png",
      ],
    },
  },
  // Honda Cars
  {
    title: "Honda City ZX CVT",
    brand: "Honda",
    category: "Sedan",
    vehicleType: "Car",
    company: "Honda",
    model: "City",
    variant: "ZX CVT",
    fuelType: "Petrol",
    transmission: "CVT",
    specifications: {
      "Engine": "1.5L i-VTEC",
      "Power": "121 PS",
      "Mileage": "17.8 kmpl",
      "Seating": "5"
    },
    stockStatus: "in-stock",
    reviews: 156,
    price: 1350000.0,
    discountedPrice: 1320000.0,
    id: 3,
    partNumber: "CITY-ZX-CVT-2024",
    warranty: "3 Years",
    imgs: {
      thumbnails: [
        "/images/cars/city-thumbnail.png",
        "/images/categories/sedan.png",
      ],
      previews: [
        "/images/cars/city-preview.jpg",
        "/images/categories/sedan.png",
      ],
    },
  },
  // Tata Cars
  {
    title: "Tata Nexon XZ Plus",
    brand: "Tata",
    category: "SUV",
    vehicleType: "Car",
    company: "Tata",
    model: "Nexon",
    variant: "XZ Plus",
    fuelType: "Petrol",
    transmission: "Manual",
    specifications: {
      "Engine": "1.2L Revotron",
      "Power": "120 PS",
      "Mileage": "17.57 kmpl",
      "Seating": "5"
    },
    stockStatus: "in-stock",
    reviews: 203,
    price: 1100000.0,
    discountedPrice: 1075000.0,
    id: 4,
    partNumber: "NEXON-XZ-PLUS-2024",
    warranty: "4 Years",
    imgs: {
      thumbnails: [
        "/images/cars/nexon-thumbnail.png",
        "/images/categories/suv.png",
      ],
      previews: [
        "/images/cars/nexon-preview.jpg",
        "/images/categories/suv.png",
      ],
    },
  },
  // Mahindra Cars
  {
    title: "Mahindra XUV300 W8 Option",
    brand: "Mahindra",
    category: "SUV",
    vehicleType: "Car",
    company: "Mahindra",
    model: "XUV300",
    variant: "W8 Option",
    fuelType: "Diesel",
    transmission: "Manual",
    specifications: {
      "Engine": "1.5L mHawk",
      "Power": "117 PS",
      "Mileage": "20 kmpl",
      "Seating": "5"
    },
    stockStatus: "in-stock",
    reviews: 134,
    price: 1250000.0,
    discountedPrice: 1225000.0,
    id: 5,
    partNumber: "XUV300-W8-2024",
    warranty: "3 Years",
    imgs: {
      thumbnails: [
        "/images/cars/xuv300-thumbnail.png",
        "/images/categories/suv.png",
      ],
      previews: [
        "/images/cars/xuv300-preview.jpg",
        "/images/categories/suv.png",
      ],
    },
  },
  // Hyundai Cars
  {
    title: "Hyundai i20 Asta",
    brand: "Hyundai",
    category: "Hatchback",
    vehicleType: "Car",
    company: "Hyundai",
    model: "i20",
    variant: "Asta",
    fuelType: "Petrol",
    transmission: "Manual",
    specifications: {
      "Engine": "1.2L Kappa",
      "Power": "83 PS",
      "Mileage": "20.35 kmpl",
      "Seating": "5"
    },
    stockStatus: "in-stock",
    reviews: 178,
    price: 850000.0,
    discountedPrice: 825000.0,
    id: 6,
    partNumber: "I20-ASTA-2024",
    warranty: "3 Years",
    imgs: {
      thumbnails: [
        "/images/cars/i20-thumbnail.png",
        "/images/categories/hatchback.png",
      ],
      previews: [
        "/images/cars/i20-preview.jpg",
        "/images/categories/hatchback.png",
      ],
    },
  },
  // Nissan Cars
  {
    title: "Nissan Magnite XV Premium",
    brand: "Nissan",
    category: "SUV",
    vehicleType: "Car",
    company: "Nissan",
    model: "Magnite",
    variant: "XV Premium",
    fuelType: "Petrol",
    transmission: "CVT",
    specifications: {
      "Engine": "1.0L Turbo",
      "Power": "100 PS",
      "Mileage": "17.7 kmpl",
      "Seating": "5"
    },
    stockStatus: "in-stock",
    reviews: 89,
    price: 950000.0,
    discountedPrice: 925000.0,
    id: 7,
    partNumber: "MAGNITE-XV-2024",
    warranty: "2 Years",
    imgs: {
      thumbnails: [
        "/images/cars/magnite-thumbnail.png",
        "/images/categories/suv.png",
      ],
      previews: [
        "/images/cars/magnite-preview.jpg",
        "/images/categories/suv.png",
      ],
    },
  },
  // Kia Cars
  {
    title: "Kia Sonet HTX Plus",
    brand: "Kia",
    category: "SUV",
    vehicleType: "Car",
    company: "Kia",
    model: "Sonet",
    variant: "HTX Plus",
    fuelType: "Petrol",
    transmission: "Manual",
    specifications: {
      "Engine": "1.2L Kappa",
      "Power": "83 PS",
      "Mileage": "18.4 kmpl",
      "Seating": "5"
    },
    stockStatus: "in-stock",
    reviews: 112,
    price: 1150000.0,
    discountedPrice: 1125000.0,
    id: 8,
    partNumber: "SONET-HTX-2024",
    warranty: "3 Years",
    imgs: {
      thumbnails: [
        "/images/cars/sonet-thumbnail.png",
        "/images/categories/suv.png",
      ],
      previews: [
        "/images/cars/sonet-preview.jpg",
        "/images/categories/suv.png",
      ],
    },
  },
  // Commercial Vehicles
  {
    title: "Tata Ace Gold CX",
    brand: "Tata",
    category: "Commercial",
    vehicleType: "Van",
    company: "Tata",
    model: "Ace Gold",
    variant: "CX",
    fuelType: "Diesel",
    transmission: "Manual",
    specifications: {
      "Engine": "0.8L CR4",
      "Power": "40 PS",
      "Payload": "750 kg",
      "Seating": "2"
    },
    stockStatus: "in-stock",
    reviews: 67,
    price: 450000.0,
    discountedPrice: 435000.0,
    id: 9,
    partNumber: "ACE-GOLD-CX-2024",
    warranty: "2 Years",
    imgs: {
      thumbnails: [
        "/images/cars/ace-thumbnail.png",
        "/images/categories/commercial.png",
      ],
      previews: [
        "/images/cars/ace-preview.jpg",
        "/images/categories/commercial.png",
      ],
    },
  },
  {
    title: "Maruti Suzuki Eeco 5 STR",
    brand: "Maruti Suzuki",
    category: "Commercial",
    vehicleType: "Van",
    company: "Maruti Suzuki",
    model: "Eeco",
    variant: "5 STR",
    fuelType: "Petrol",
    transmission: "Manual",
    specifications: {
      "Engine": "1.2L K-Series",
      "Power": "73 PS",
      "Seating": "5",
      "Cargo": "540L"
    },
    stockStatus: "in-stock",
    reviews: 145,
    price: 550000.0,
    discountedPrice: 535000.0,
    id: 10,
    partNumber: "EECO-5STR-2024",
    warranty: "2 Years",
    imgs: {
      thumbnails: [
        "/images/cars/eeco-thumbnail.png",
        "/images/categories/commercial.png",
      ],
      previews: [
        "/images/cars/eeco-preview.jpg",
        "/images/categories/commercial.png",
      ],
    },
  },
  // More vehicles for better filtering demonstration
  {
    title: "Maruti Suzuki Baleno Alpha",
    brand: "Maruti Suzuki",
    category: "Hatchback",
    vehicleType: "Car",
    company: "Maruti Suzuki",
    model: "Baleno",
    variant: "Alpha",
    fuelType: "Petrol",
    transmission: "CVT",
    specifications: {
      "Engine": "1.2L DualJet",
      "Power": "90 PS",
      "Mileage": "22.35 kmpl",
      "Seating": "5"
    },
    stockStatus: "in-stock",
    reviews: 167,
    price: 950000.0,
    discountedPrice: 925000.0,
    id: 11,
    partNumber: "BALENO-ALPHA-2024",
    warranty: "2 Years",
    imgs: {
      thumbnails: [
        "/images/cars/baleno-thumbnail.png",
        "/images/categories/hatchback.png",
      ],
      previews: [
        "/images/cars/baleno-preview.jpg",
        "/images/categories/hatchback.png",
      ],
    },
  },
  {
    title: "Honda Amaze VX CVT",
    brand: "Honda",
    category: "Sedan",
    vehicleType: "Car",
    company: "Honda",
    model: "Amaze",
    variant: "VX CVT",
    fuelType: "Petrol",
    transmission: "CVT",
    specifications: {
      "Engine": "1.2L i-VTEC",
      "Power": "90 PS",
      "Mileage": "18.3 kmpl",
      "Seating": "5"
    },
    stockStatus: "in-stock",
    reviews: 134,
    price: 850000.0,
    discountedPrice: 825000.0,
    id: 12,
    partNumber: "AMAZE-VX-CVT-2024",
    warranty: "3 Years",
    imgs: {
      thumbnails: [
        "/images/cars/amaze-thumbnail.png",
        "/images/categories/sedan.png",
      ],
      previews: [
        "/images/cars/amaze-preview.jpg",
        "/images/categories/sedan.png",
      ],
    },
  },
  {
    title: "Tata Harrier XZ Plus",
    brand: "Tata",
    category: "SUV",
    vehicleType: "Car",
    company: "Tata",
    model: "Harrier",
    variant: "XZ Plus",
    fuelType: "Diesel",
    transmission: "Manual",
    specifications: {
      "Engine": "2.0L Kryotec",
      "Power": "170 PS",
      "Mileage": "16.35 kmpl",
      "Seating": "5"
    },
    stockStatus: "in-stock",
    reviews: 198,
    price: 1650000.0,
    discountedPrice: 1625000.0,
    id: 13,
    partNumber: "HARRIER-XZ-PLUS-2024",
    warranty: "4 Years",
    imgs: {
      thumbnails: [
        "/images/cars/harrier-thumbnail.png",
        "/images/categories/suv.png",
      ],
      previews: [
        "/images/cars/harrier-preview.jpg",
        "/images/categories/suv.png",
      ],
    },
  },
  {
    title: "Mahindra Bolero Neo N10",
    brand: "Mahindra",
    category: "SUV",
    vehicleType: "Car",
    company: "Mahindra",
    model: "Bolero Neo",
    variant: "N10",
    fuelType: "Diesel",
    transmission: "Manual",
    specifications: {
      "Engine": "1.5L mHawk",
      "Power": "100 PS",
      "Mileage": "17.28 kmpl",
      "Seating": "7"
    },
    stockStatus: "in-stock",
    reviews: 89,
    price: 1050000.0,
    discountedPrice: 1025000.0,
    id: 14,
    partNumber: "BOLERO-NEO-N10-2024",
    warranty: "3 Years",
    imgs: {
      thumbnails: [
        "/images/cars/bolero-neo-thumbnail.png",
        "/images/categories/suv.png",
      ],
      previews: [
        "/images/cars/bolero-neo-preview.jpg",
        "/images/categories/suv.png",
      ],
    },
  },
  {
    title: "Hyundai Creta SX Executive",
    brand: "Hyundai",
    category: "SUV",
    vehicleType: "Car",
    company: "Hyundai",
    model: "Creta",
    variant: "SX Executive",
    fuelType: "Petrol",
    transmission: "Manual",
    specifications: {
      "Engine": "1.5L MPi",
      "Power": "115 PS",
      "Mileage": "17.4 kmpl",
      "Seating": "5"
    },
    stockStatus: "in-stock",
    reviews: 245,
    price: 1350000.0,
    discountedPrice: 1325000.0,
    id: 15,
    partNumber: "CRETA-SX-EXEC-2024",
    warranty: "3 Years",
    imgs: {
      thumbnails: [
        "/images/cars/creta-thumbnail.png",
        "/images/categories/suv.png",
      ],
      previews: [
        "/images/cars/creta-preview.jpg",
        "/images/categories/suv.png",
      ],
    },
  },];


export default shopData;