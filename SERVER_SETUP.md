# 🚗 Tushar Automobiles Server Setup

## 📋 Prerequisites

Before running the server, make sure you have:

1. **Node.js** (v16 or higher)
2. **MongoDB** (local installation or MongoDB Atlas account)
3. **npm** or **yarn** package manager

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/tushar_automobiles
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/tushar_automobiles

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=4000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### 3. Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**MongoDB Atlas:**
- Create a cluster on [MongoDB Atlas](https://cloud.mongodb.com)
- Get your connection string
- Update `MONGODB_URI` in `.env`

### 4. Seed Sample Data

```bash
npm run seed
```

This will create:
- Sample products (engine oils, brake parts, etc.)
- Admin user: `admin@tusharautomobiles.com` / `Admin@123`
- Test customer: `customer@test.com` / `Customer@123`

### 5. Start the Server

**Development mode:**
```bash
npm run server:dev
```

**Production mode:**
```bash
npm run server
```

Server will be running at: `http://localhost:4000`

## 📚 API Documentation

### Base URL
```
http://localhost:4000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/signup` | Register new user | No |
| POST | `/auth/login` | User login | No |
| GET | `/auth/profile` | Get user profile | Yes |
| PUT | `/auth/profile` | Update profile | Yes |
| PUT | `/auth/change-password` | Change password | Yes |
| POST | `/auth/logout` | Logout user | Yes |

### Product Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/products` | Get all products | No |
| GET | `/products/featured` | Get featured products | No |
| GET | `/products/categories` | Get categories | No |
| GET | `/products/:id` | Get single product | No |
| POST | `/products` | Create product | Admin |
| PUT | `/products/:id` | Update product | Admin |
| DELETE | `/products/:id` | Delete product | Admin |
| POST | `/products/:id/reviews` | Add review | Yes |

## 🔧 API Features

### Authentication
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (customer/admin)
- Token expiration handling

### Products
- Full CRUD operations
- Advanced filtering and search
- Pagination support
- Category management
- Review system
- Inventory tracking
- Featured products

### Data Models

#### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: Object,
  role: String (customer/admin),
  isActive: Boolean,
  orders: [ObjectId],
  wishlist: [ObjectId],
  cart: [Object]
}
```

#### Product Model
```javascript
{
  name: String,
  description: String,
  sku: String (unique),
  category: String,
  brand: String,
  price: { regular: Number, sale: Number },
  images: [Object],
  specifications: Map,
  compatibility: [Object],
  inventory: Object,
  reviews: [Object],
  status: String
}
```

## 🛡️ Security Features

- Input validation with express-validator
- Password strength requirements
- JWT token security
- CORS configuration
- Request rate limiting (can be added)
- SQL injection prevention (MongoDB)

## 📊 Database Indexes

Optimized indexes for:
- User email lookups
- Product searches
- Category filtering
- Price range queries
- Featured products

## 🔍 Query Examples

### Get Products with Filters
```
GET /api/products?category=engine-oil&minPrice=500&maxPrice=2000&page=1&limit=12
```

### Search Products
```
GET /api/products?search=castrol&sort=price.regular&order=asc
```

### Get Featured Products
```
GET /api/products/featured
```

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Validation errors if applicable
}
```

## 📈 Performance Optimizations

- Database indexes for fast queries
- Pagination for large datasets
- Selective field projection
- Aggregation pipelines for complex queries

## 🧪 Testing

You can test the API using:
- **Postman** collection (can be created)
- **curl** commands
- **Frontend integration**

### Sample curl Commands

**Register User:**
```bash
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test@123"}'
```

**Login:**
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@123"}'
```

**Get Products:**
```bash
curl http://localhost:4000/api/products
```

## 🔄 Development Workflow

1. Make changes to server code
2. Server auto-restarts (with nodemon)
3. Test endpoints
4. Update frontend integration

## 📝 Logging

Server logs include:
- Request timestamps and methods
- Database connection status
- Error details
- Authentication attempts

## 🚀 Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use strong JWT secret
3. Configure MongoDB Atlas
4. Set up proper CORS origins
5. Add rate limiting
6. Set up monitoring

## 🆘 Troubleshooting

**MongoDB Connection Issues:**
- Check if MongoDB is running
- Verify connection string
- Check network connectivity

**Authentication Issues:**
- Verify JWT secret
- Check token expiration
- Validate user credentials

**API Errors:**
- Check server logs
- Verify request format
- Validate required fields

## 📞 Support

For issues or questions:
- Check server logs
- Review API documentation
- Contact: tusharbansal3366@gmail.com