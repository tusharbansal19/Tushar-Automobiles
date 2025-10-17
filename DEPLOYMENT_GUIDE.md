# 🚀 Deployment Guide - Automobile Parts E-commerce

## Pre-Deployment Checklist

### ✅ Environment Variables Setup

#### Frontend (.env.local)
```bash
# Update these for production
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
NEXT_PUBLIC_SITE_URL=https://your-frontend-domain.com
```

#### Backend (server/.env)
```bash
MONGO_URI=your-mongodb-connection-string
PORT=4000
FRONTEND_URL=https://your-frontend-domain.com
JWT_SECRET=your-super-secure-jwt-secret-key
NODE_ENV=production

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=your-email@gmail.com
```

### ✅ Database Setup
- MongoDB Atlas is already configured
- Connection string is in server/.env
- Auto parts data will be seeded automatically

## 🚀 Deployment Options

### Option 1: Vercel + Railway (Recommended)

#### Deploy Backend on Railway:
1. Go to [Railway.app](https://railway.app)
2. Connect your GitHub repository
3. Create new project → Deploy from GitHub
4. Select your repository
5. Add environment variables from `server/.env`
6. Deploy will start automatically
7. Get your backend URL (e.g., `https://your-app.railway.app`)

#### Deploy Frontend on Vercel:
1. Go to [Vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Framework: Next.js (auto-detected)
4. Root Directory: `.` (leave default)
5. Add environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-railway-backend.railway.app/api
   NEXT_PUBLIC_SITE_URL=https://your-vercel-app.vercel.app
   ```
6. Deploy

### Option 2: Netlify + Railway

#### Deploy Backend on Railway (same as above)

#### Deploy Frontend on Netlify:
1. Go to [Netlify.com](https://netlify.com)
2. Connect to Git → Choose your repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add environment variables
5. Deploy

### Option 3: Full-Stack on Railway

1. Create Railway project
2. Add both services:
   - **Frontend Service**: Next.js app
   - **Backend Service**: Node.js API
3. Configure environment variables for both
4. Deploy

## 🔧 Build Commands

### Frontend Build:
```bash
npm run build
npm start
```

### Backend Build:
```bash
npm install
npm run server
```

## 🌐 Domain Setup

### Custom Domain (Optional):
1. **Vercel**: Project Settings → Domains → Add custom domain
2. **Railway**: Project → Settings → Domains → Custom Domain
3. **Netlify**: Site Settings → Domain Management → Add custom domain

## 📊 Post-Deployment Steps

### 1. Test the Application:
- ✅ Homepage loads correctly
- ✅ Product listings work
- ✅ Search functionality
- ✅ Contact form
- ✅ Authentication (if implemented)

### 2. Seed Database:
```bash
# Run this command on your deployed backend
npm run seed:auto-parts
```

### 3. Update CORS Settings:
Make sure your backend allows requests from your frontend domain.

### 4. SSL Certificate:
- Vercel/Netlify: Automatic HTTPS
- Railway: Automatic HTTPS
- Custom domains: Configure SSL

## 🔒 Security Checklist

- ✅ JWT_SECRET is secure and unique
- ✅ MongoDB connection uses authentication
- ✅ CORS is configured properly
- ✅ Environment variables are not exposed
- ✅ API endpoints are secured

## 📱 Performance Optimization

### Frontend:
- ✅ Images are optimized (Next.js Image component)
- ✅ Code splitting enabled
- ✅ Static generation where possible

### Backend:
- ✅ Database queries are optimized
- ✅ Proper indexing on MongoDB
- ✅ API response caching

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Update FRONTEND_URL in backend .env
   - Check CORS configuration in server/index.js

2. **Database Connection:**
   - Verify MongoDB URI
   - Check network access in MongoDB Atlas

3. **Environment Variables:**
   - Ensure all required variables are set
   - Check variable names match exactly

4. **Build Errors:**
   - Run `npm run build` locally first
   - Check for TypeScript errors
   - Verify all imports are correct

## 📞 Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints directly
4. Check database connectivity

## 🎉 Success!

Your automobile parts e-commerce website should now be live and accessible to customers worldwide!

### Live URLs:
- **Frontend**: https://your-app.vercel.app
- **Backend API**: https://your-api.railway.app
- **Admin Panel**: https://your-app.vercel.app/admin (if implemented)

---

**Note**: Remember to update your environment variables with the actual production URLs after deployment.