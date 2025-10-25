# 🚀 Unified Server Setup Guide

## Overview
Your application now runs both the Next.js frontend and Express backend on a single server. This makes deployment easier and eliminates CORS issues.

## 📁 Project Structure
```
├── src/                    # Next.js frontend
│   ├── app/               # App router pages
│   ├── components/        # React components
│   └── ...
├── server/                # Express backend
│   ├── controllers/       # API controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── ...
├── server.js             # Unified server (NEW)
├── package.json          # Updated scripts
└── .env                  # Unified environment variables
```

## 🔧 Updated Scripts

### Development (Both Frontend + Backend):
```bash
npm run dev
```
This starts the unified server with hot reload for both frontend and backend.

### Production Build:
```bash
npm run build
npm start
```

### Individual Services (if needed):
```bash
npm run server:only    # Backend only
npm run frontend:only  # Frontend only
```

## 🌐 Server Endpoints

### Frontend:
- **Homepage**: http://localhost:3000
- **All Next.js pages**: http://localhost:3000/*

### Backend API:
- **Test API**: http://localhost:3000/api/test
- **Health Check**: http://localhost:3000/api/health
- **Auth**: http://localhost:3000/api/auth/*
- **Products**: http://localhost:3000/api/products/*
- **Contact**: http://localhost:3000/api/contact/*

## 🔄 How It Works

1. **Single Port**: Everything runs on port 3000
2. **API Routes**: `/api/*` requests go to Express backend
3. **Frontend Routes**: All other requests go to Next.js
4. **No CORS Issues**: Same origin for frontend and backend
5. **Shared Environment**: Single .env file for all configurations

## 🚀 Development Workflow

1. **Start Development**:
   ```bash
   npm run dev
   ```

2. **Access Your App**:
   - Frontend: http://localhost:3000
   - API: http://localhost:3000/api/test

3. **Make Changes**:
   - Frontend changes: Auto-reload via Next.js
   - Backend changes: Auto-reload via nodemon

## 📦 Deployment Benefits

### Single Deployment:
- Deploy one application instead of two
- No need to manage separate frontend/backend URLs
- Simplified environment variables

### Platform Support:
- **Vercel**: Deploy as Next.js app with API routes
- **Railway**: Deploy as Node.js app
- **Heroku**: Deploy as Node.js app
- **Netlify**: Deploy with serverless functions

## 🔧 Environment Variables

### Development (.env):
```bash
PORT=3000
NODE_ENV=development
MONGO_URI=your-mongodb-connection
FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Production (.env):
```bash
PORT=3000
NODE_ENV=production
MONGO_URI=your-production-mongodb
FRONTEND_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://your-domain.com/api
```

## 🐛 Troubleshooting

### Port Already in Use:
```bash
# Kill process on port 3000
npx kill-port 3000
# Or change PORT in .env
```

### Database Connection Issues:
- Check MONGO_URI in .env
- Ensure MongoDB Atlas allows connections
- Verify network access settings

### API Not Working:
- Check http://localhost:3000/api/health
- Verify API routes are imported in server.js
- Check server logs for errors

## 🎯 Next Steps

1. **Test the Setup**:
   ```bash
   npm run dev
   ```

2. **Verify Endpoints**:
   - Frontend: http://localhost:3000
   - API Test: http://localhost:3000/api/test
   - Health: http://localhost:3000/api/health

3. **Deploy**:
   - Build: `npm run build`
   - Start: `npm start`
   - Deploy to your preferred platform

## 🔥 Benefits of This Setup

✅ **Single Server**: Easier deployment and management
✅ **No CORS Issues**: Same origin for all requests
✅ **Simplified URLs**: No need for separate API URLs
✅ **Better Performance**: Reduced network overhead
✅ **Easier Development**: One command to start everything
✅ **Production Ready**: Optimized for deployment platforms

Your automobile parts e-commerce application is now ready with a unified server architecture! 🚗💨