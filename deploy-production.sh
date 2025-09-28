#!/bin/bash

# 🚀 BlitXpress Production Build & Deploy Script
# Usage: ./deploy-production.sh [environment]

set -e  # Exit on any error

echo "🚀 BlitXpress Production Build & Deploy"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js and npm are installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

# Step 1: Install dependencies
print_status "Installing dependencies..."
npm install
print_success "Dependencies installed successfully"

# Step 2: Run type check
print_status "Running TypeScript type check..."
if npm run type-check; then
    print_success "Type check passed"
else
    print_warning "Type check failed, but continuing with build..."
fi

# Step 3: Run linting
print_status "Running ESLint checks..."
if npm run lint; then
    print_success "Linting passed"
else
    print_warning "Linting issues found. Run 'npm run lint:fix' to fix automatically."
fi

# Step 4: Clean previous build
print_status "Cleaning previous build..."
rm -rf dist
print_success "Previous build cleaned"

# Step 5: Build for production
print_status "Building for production..."
if npm run build; then
    print_success "Production build completed successfully!"
else
    print_error "Production build failed!"
    exit 1
fi

# Step 6: Display build summary
print_status "Build Summary:"
echo "----------------------------------------"
echo "📦 Build Output: $(du -sh dist | cut -f1)"
echo "📁 Total Files: $(find dist -type f | wc -l | tr -d ' ')"
echo "🗂️  JS Files: $(find dist/js -name '*.js' | wc -l | tr -d ' ')"
echo "🎨 CSS Files: $(find dist/css -name '*.css' | wc -l | tr -d ' ')"
echo "----------------------------------------"

# Step 7: Verify critical files exist
print_status "Verifying build integrity..."
if [ -f "dist/index.html" ]; then
    print_success "✅ index.html exists"
else
    print_error "❌ index.html missing"
    exit 1
fi

if [ -d "dist/js" ]; then
    print_success "✅ JavaScript files exist"
else
    print_error "❌ JavaScript files missing"
    exit 1
fi

if [ -d "dist/css" ]; then
    print_success "✅ CSS files exist"
else
    print_error "❌ CSS files missing"
    exit 1
fi

# Step 8: Create deployment archive (optional)
print_status "Creating deployment archive..."
tar -czf "blitxpress-production-$(date +%Y%m%d-%H%M%S).tar.gz" -C dist .
print_success "Deployment archive created"

# Step 9: Start preview server (optional)
read -p "🌐 Do you want to start the preview server to test the build? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Starting preview server..."
    print_success "🚀 Preview server will start at http://localhost:4173"
    print_status "Press Ctrl+C to stop the server"
    npm run preview
fi

print_success "🎉 Production build process completed successfully!"
print_status "📁 Your production files are ready in the 'dist' folder"
print_status "📖 Check PRODUCTION_DEPLOYMENT_GUIDE.md for deployment instructions"

# Display deployment options
echo ""
echo "🚀 Deployment Options:"
echo "1. Static Hosting: Upload 'dist' folder to Netlify, Vercel, or similar"
echo "2. Server Deployment: Copy 'dist' contents to your web server"
echo "3. Docker: Use the generated archive with your Docker setup"
echo "4. CDN: Upload to AWS S3 + CloudFront or similar CDN"
echo ""
print_success "Happy deploying! 🚀"