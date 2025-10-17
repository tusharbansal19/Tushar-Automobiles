# Items API Documentation

## Overview
The Items API provides endpoints to manage automobile parts and accessories with a simplified schema compared to the Products API.

## Base URL
```
http://localhost:4000/api/items
```

## Item Schema
```javascript
{
  name: String (required, trimmed),
  brand: String (default: "Generic"),
  category: String (required, enum),
  description: String (required, max 300 chars),
  price: Number (required, min: 0),
  stock: Number (default: 0),
  discount: Number (default: 0),
  images: [{ url: String }],
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## Categories
- Engine
- Brakes
- Suspension
- Body
- Lighting
- Oils
- Electrical
- Cooling
- Transmission
- Accessories

## API Endpoints

### 1. Get All Items
```
GET /api/items
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `category` (string): Filter by category
- `brand` (string): Filter by brand (case-insensitive)
- `search` (string): Search in name and description

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

### 2. Get Single Item
```
GET /api/items/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "item": { ... }
  }
}
```

### 3. Create New Item
```
POST /api/items
```

**Request Body:**
```json
{
  "name": "Premium Engine Oil 5W-30",
  "brand": "Mobil 1",
  "category": "Oils",
  "description": "High-performance synthetic motor oil",
  "price": 45.99,
  "stock": 25,
  "discount": 10,
  "images": [
    { "url": "https://example.com/image.jpg" }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Item created successfully",
  "data": {
    "item": { ... }
  }
}
```

### 4. Update Item
```
PUT /api/items/:id
```

**Request Body:** (partial update supported)
```json
{
  "price": 39.99,
  "stock": 30
}
```

### 5. Delete Item
```
DELETE /api/items/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Item deleted successfully"
}
```

### 6. Get Items by Category
```
GET /api/items/category/:category
```

**Example:**
```
GET /api/items/category/Oils
```

## Example Usage

### Create an Item
```javascript
const newItem = {
  name: "Brake Pads Set",
  brand: "Brembo",
  category: "Brakes",
  description: "High-performance ceramic brake pads for superior stopping power",
  price: 89.99,
  stock: 15,
  discount: 5,
  images: [
    { url: "https://example.com/brake-pads.jpg" }
  ]
};

fetch('http://localhost:4000/api/items', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newItem)
})
.then(response => response.json())
.then(data => console.log(data));
```

### Search Items
```javascript
// Search for engine-related items
fetch('http://localhost:4000/api/items?search=engine&category=Engine')
.then(response => response.json())
.then(data => console.log(data.data.items));
```

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "price",
      "message": "Price cannot be negative"
    }
  ]
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Item not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Testing
Run the test script to verify all endpoints:
```bash
node test-items-api.js
```

Make sure your server is running on port 4000 before running tests.