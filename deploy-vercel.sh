#!/bin/bash
# filepath: /Users/ekko/Developer/ekkolabs/deploy-vercel.sh

echo "🚀 Deploying to Vercel with debugging..."

# Check for Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Make sure we have all dependencies
echo "📦 Installing dependencies..."
npm install

# Run type checking
echo "📋 Running type checking..."
npm run check || { echo "❌ Type checking failed. Please fix errors and try again."; exit 1; }

# Build project locally to verify it works
echo "🔨 Building project locally..."
npm run build || { echo "❌ Build failed. Please fix errors and try again."; exit 1; }

# Verify TypeScript compilation of API handlers
echo "🔍 Verifying API handlers..."
tsc --noEmit ./api/*.ts || { echo "⚠️ TypeScript issues in API handlers. This might cause problems in deployment."; }

# Set up environment variables in .vercelenv
echo "⚙️ Setting up environment variables..."
cp .vercelenv .env

# Deploy to Vercel with debugging output
echo "🚀 Deploying to Vercel..."
vercel --debug --prod

# Show deployment URL
echo "🔍 Here's your deployment information:"
vercel ls

echo "✅ Deployment process completed!"
