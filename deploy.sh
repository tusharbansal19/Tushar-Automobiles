#!/bin/bash

# Automobile Parts E-commerce Deployment Script

echo "🚀 Starting deployment process..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check for environment variables
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local file not found. Creating template..."
    cat > .env.local << EOL
# Next.js Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# For production, update these URLs:
# NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
# NEXT_PUBLIC_SITE_URL=https://your-website-domain.com
EOL
    echo "📝 Please update .env.local with your production URLs"
fi

# Build the application
echo "🔨 Building the application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 Your application is ready for deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Update environment variables in .env.local"
    echo "2. Deploy to your preferred platform:"
    echo "   - Vercel: vercel --prod"
    echo "   - Netlify: netlify deploy --prod"
    echo "   - Railway: Connect your GitHub repo"
    echo ""
    echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi