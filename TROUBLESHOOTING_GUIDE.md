# 🔧 Troubleshooting Guide - Page Issues

## ✅ **Issues Fixed:**

### 1. **Redux Store Initialization**
- Added delays to prevent components from accessing Redux before initialization
- Added proper error handling for API failures
- Added fallback data for when API is unavailable

### 2. **Environment Variables**
- Fixed duplicate `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensured proper API URL configuration

### 3. **Error Handling**
- Added comprehensive error handling in Redux actions
- Added retry buttons for failed API calls
- Added loading states and fallback content

## 🚀 **Steps to Get Pages Working:**

### Step 1: Start the Backend Server
```bash
# In the server directory
cd server
node index.js
```

**Expected Output:**
```
🔌 Connecting to MongoDB...
✅ MongoDB Connected: cluster0.8hrjq19.mongodb.net
🔄 Initializing auto parts database...
✅ Auto parts data seeded successfully!
🚗 TUSHAR AUTOMOBILES API SERVER
🌐 Server running on: http://localhost:4000
```

### Step 2: Start the Frontend
```bash
# In the root directory
npm run dev
```

**Expected Output:**
```
▲ Next.js 15.2.3
- Local:        http://localhost:3000
- ready in 2.1s
```

### Step 3: Test the Pages

1. **Home Page**: `http://localhost:3000`
   - Should show categories and new arrivals
   - If API fails, shows fallback content

2. **Shop Page**: `http://localhost:3000/shop-with-sidebar`
   - Should show auto parts with filters
   - Pagination should work with 15 items per page

## 🔍 **Common Issues & Solutions:**

### Issue 1: "Page Not Working" / White Screen
**Cause**: Redux store not initialized or API not available
**Solution**: 
- Check if backend server is running on port 4000
- Check browser console for errors
- Components now have fallback content if API fails

### Issue 2: "Failed to fetch auto parts"
**Cause**: Backend server not running or database connection issues
**Solution**:
- Start the backend server: `node server/index.js`
- Check MongoDB connection in server logs
- Click "Try Again" button that now appears on errors

### Issue 3: Categories/Products Not Loading
**Cause**: API endpoints not responding
**Solution**:
- Check if `http://localhost:4000/api/auto-parts` returns data
- Check if `http://localhost:4000/api/auto-parts/filters` returns data
- Fallback categories will show if API fails

### Issue 4: Environment Variables
**Cause**: Incorrect API URL configuration
**Solution**:
- Ensure `.env.local` has: `NEXT_PUBLIC_API_URL=http://localhost:4000/api`
- Restart the frontend after changing environment variables

## 🧪 **Testing API Endpoints:**

### Test Auto Parts API:
```bash
curl http://localhost:4000/api/auto-parts
```

### Test Filter Options:
```bash
curl http://localhost:4000/api/auto-parts/filters
```

### Manual Seed (if needed):
```bash
curl -X POST http://localhost:4000/api/auto-parts/seed
```

## 📊 **What Should Work Now:**

✅ **Home Page Components:**
- Categories slider with fallback data
- New arrivals section with error handling
- Proper loading states

✅ **Shop Page:**
- 15 items per page pagination
- Advanced filtering (Company, Vehicle Type, Fuel Type, Category)
- Search functionality
- Error handling with retry options

✅ **Error Resilience:**
- Pages work even if API is down (with fallback content)
- Retry buttons for failed requests
- Proper loading indicators

## 🔄 **If Still Having Issues:**

1. **Clear Browser Cache**: Hard refresh (Ctrl+F5)
2. **Check Browser Console**: Look for JavaScript errors
3. **Restart Both Servers**: Backend and frontend
4. **Check Network Tab**: See if API calls are being made
5. **Verify Environment**: Ensure `.env.local` is correct

## 📞 **Quick Debug Commands:**

```bash
# Check if backend is running
curl http://localhost:4000/api

# Check if frontend can reach backend
curl http://localhost:3000/api/auto-parts

# Check MongoDB connection
# Look for "MongoDB Connected" in server logs
```

The pages should now work reliably with proper error handling and fallback content! 🎉