# 🚗 Auto Parts API Documentation

## Overview
The Auto Parts API provides comprehensive functionality for managing automobile parts with advanced filtering, searching, and categorization capabilities.

## Base URL
```
http://localhost:4000/api/auto-parts
```

## Endpoints

### 1. Get All Auto Parts
**GET** `/api/auto-parts`

Retrieve all auto parts with optional filtering and pagination.

#### Query Parameters:
- `search` - Search across title, brand, category, vehicle name, company, model, part number
- `company` - Filter by company (comma-separated for multiple)
- `category` - Filter by category (comma-separated for multiple)
- `vehicleType` - Filter by vehicle type (comma-separated for multiple)
- `fuelType` - Filter by fuel type (comma-separated for multiple)
- `transmission` - Filter by transmission type
- `stockStatus` - Filter by stock status (`in-stock`, `out-of-stock`, `pre-order`, `limited-stock`)
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `sortBy` - Sort field (`title`, `price`, `discountedPrice`, `reviews`, `createdAt`, `updatedAt`)
- `sortOrder` - Sort direction (`asc`, `desc`)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)

#### Example Requests:
```bash
# Get all parts
GET /api/auto-parts

# Search for brake parts
GET /api/auto-parts?search=brake

# Filter by Hyundai company
GET /api/auto-parts?company=Hyundai

# Filter by multiple categories
GET /api/auto-parts?category=Engine Components,Braking System

# Price range filter
GET /api/auto-parts?minPrice=1000&maxPrice=5000

# Sort by price (low to high)
GET /api/auto-parts?sortBy=price&sortOrder=asc

# Pagination
GET /api/auto-parts?page=2&limit=10
```

#### Response:
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "title": "Hyundai Creta Brake Pad Set",
      "brand": "Hyundai",
      "category": "Braking System",
      "vehicleType": "Car",
      "vehicleName": "Hyundai Creta",
      "company": "Hyundai",
      "model": "Creta2017",
      "variant": "SX Executive",
      "fuelType": "Petrol",
      "transmission": "Manual",
      "specifications": {
        "Compatibility": "Front and Rear Wheels",
        "Material": "Ceramic",
        "Durability": "50000 km",
        "Warranty": "2 Years"
      },
      "stockStatus": "in-stock",
      "reviews": 178,
      "price": 4200,
      "discountedPrice": 4000,
      "partNumber": "CRETA-BRKPAD-2024",
      "warranty": "2 Years",
      "imgs": {
        "thumbnails": ["/images/parts/brakepad-thumb.png"],
        "previews": ["/images/parts/brakepad-prev.png"]
      },
      "discountPercentage": 5,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 2,
    "totalItems": 20,
    "itemsPerPage": 20,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### 2. Get Filter Options
**GET** `/api/auto-parts/filters`

Get all available filter options with counts.

#### Response:
```json
{
  "success": true,
  "data": {
    "companies": [
      { "name": "Hyundai", "count": 8 },
      { "name": "Maruti Suzuki", "count": 3 },
      { "name": "Tata Motors", "count": 3 }
    ],
    "categories": [
      { "name": "Braking System", "count": 3 },
      { "name": "Engine Components", "count": 4 },
      { "name": "Lighting", "count": 3 }
    ],
    "vehicleTypes": [
      { "name": "Car", "count": 15 },
      { "name": "SUV", "count": 4 },
      { "name": "Van", "count": 1 }
    ],
    "fuelTypes": [
      { "name": "Petrol", "count": 12 },
      { "name": "Diesel", "count": 8 }
    ],
    "transmissions": ["Manual", "Automatic", "CVT"]
  }
}
```

### 3. Get Single Auto Part
**GET** `/api/auto-parts/:id`

Get details of a specific auto part by ID.

#### Response:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Hyundai Creta Brake Pad Set",
    // ... full part details
  }
}
```

### 4. Create Auto Part (Admin)
**POST** `/api/auto-parts`

Create a new auto part (requires admin authentication).

#### Request Body:
```json
{
  "title": "New Auto Part",
  "brand": "Brand Name",
  "category": "Category",
  "vehicleType": "Car",
  "vehicleName": "Vehicle Name",
  "company": "Company",
  "model": "Model2024",
  "variant": "Variant",
  "fuelType": "Petrol",
  "transmission": "Manual",
  "specifications": {
    "key": "value"
  },
  "price": 1000,
  "discountedPrice": 900,
  "partNumber": "UNIQUE-PART-2024",
  "warranty": "1 Year"
}
```

### 5. Update Auto Part (Admin)
**PUT** `/api/auto-parts/:id`

Update an existing auto part (requires admin authentication).

### 6. Delete Auto Part (Admin)
**DELETE** `/api/auto-parts/:id`

Soft delete an auto part (requires admin authentication).

### 7. Seed Database
**POST** `/api/auto-parts/seed`

Manually seed the database with dummy data.

## Data Structure

### Auto Part Schema:
- `title` (String, required) - Part title
- `brand` (String, required) - Brand name
- `category` (String, required) - Part category
- `vehicleType` (String, required) - Type of vehicle (Car, SUV, Van)
- `vehicleName` (String, required) - Full vehicle name
- `company` (String, required) - Vehicle manufacturer
- `model` (String, required) - Vehicle model
- `variant` (String, optional) - Vehicle variant
- `fuelType` (String, required) - Fuel type (Petrol, Diesel, Electric, Hybrid)
- `transmission` (String, required) - Transmission type
- `specifications` (Map, optional) - Technical specifications
- `stockStatus` (String) - Stock status (in-stock, out-of-stock, pre-order, limited-stock)
- `reviews` (Number) - Number of reviews
- `price` (Number, required) - Original price
- `discountedPrice` (Number, optional) - Discounted price
- `partNumber` (String, required, unique) - Unique part number
- `warranty` (String, optional) - Warranty information
- `imgs` (Object, optional) - Image URLs
- `isActive` (Boolean) - Active status
- `tags` (Array) - Search tags

## Categories Available:
- Braking System
- Engine Components
- Lighting
- Body Parts
- Mirrors and Exteriors
- Accessories
- Suspension System
- Fuel System
- Cooling System
- Wheels and Tires
- Steering System

## Companies Available:
- Hyundai
- Maruti Suzuki
- Tata Motors
- Mahindra
- Toyota
- Honda
- Kia

## Error Responses:
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

## Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request / Validation Error
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Getting Started:

1. **Start the server:**
   ```bash
   npm run start:auto
   ```

2. **Test the API:**
   ```bash
   # Get all parts
   curl http://localhost:4000/api/auto-parts
   
   # Get filter options
   curl http://localhost:4000/api/auto-parts/filters
   
   # Search for brake parts
   curl "http://localhost:4000/api/auto-parts?search=brake"
   ```

3. **Database will be automatically seeded on first startup!**

The API provides comprehensive filtering, searching, and pagination capabilities for managing automobile parts efficiently.