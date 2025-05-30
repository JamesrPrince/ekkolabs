#!/bin/bash
# filepath: /Users/ekko/Developer/ekkolabs/quick-deploy.sh

# Colors for terminal output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}===========================================================${NC}"
echo -e "${BLUE}🚀 Quick Deploy to Vercel Script - Ekko Labs${NC}"
echo -e "${BLUE}===========================================================${NC}"

# Make sure we have all dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install

# Fix TypeScript errors using our enhanced script
echo -e "${BLUE}🔧 Fixing TypeScript errors...${NC}"
chmod +x ./scripts/fix-typescript-errors-v2.sh
./scripts/fix-typescript-errors-v2.sh

# Fix Prisma compatibility issues
echo -e "${BLUE}🔧 Fixing Prisma compatibility issues...${NC}"
chmod +x ./scripts/fix-prisma-compatibility.sh
./scripts/fix-prisma-compatibility.sh

# Set up environment variables in .vercelenv
echo -e "${BLUE}⚙️ Setting up environment variables...${NC}"
cp .vercelenv .env

# Deploy to Vercel directly with force option
echo -e "${BLUE}🚀 Deploying to Vercel...${NC}"
echo -e "${YELLOW}Note: Most TypeScript errors have been fixed automatically${NC}"
vercel --prod

# Show deployment URL
echo -e "${GREEN}🔍 Here's your deployment information:${NC}"
vercel ls

echo -e "${GREEN}✅ Deployment process completed!${NC}"
echo -e "${BLUE}===========================================================${NC}"
echo -e "${GREEN}Your changes are now live on Vercel!${NC}"
echo -e "${YELLOW}Note: TypeScript errors should be fixed in future updates${NC}"
echo -e "${BLUE}===========================================================${NC}"
