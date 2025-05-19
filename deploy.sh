#!/bin/bash
# filepath: /Users/ekko/Developer/ekkolabs/deploy.sh

echo "🚀 Deploying to Vercel..."

# Check for Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Run type checking
echo "📋 Running type checking..."
npm run check || { echo "❌ Type checking failed. Please fix errors and try again."; exit 1; }

# Build project locally to verify it works
echo "🔨 Building project locally..."
npm run build || { echo "❌ Build failed. Please fix errors and try again."; exit 1; }

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment completed!"
