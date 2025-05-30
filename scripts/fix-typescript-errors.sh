#!/bin/bash
# TypeScript Error Fixing Script

# Colors for terminal output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}===========================================================${NC}"
echo -e "${BLUE}🔧 TypeScript Error Fixing Script - Ekko Labs${NC}"
echo -e "${BLUE}===========================================================${NC}"

# Step 1: Add missing type declarations
echo -e "${BLUE}📦 Installing missing type declarations...${NC}"
npm install --save-dev @types/jsonwebtoken @types/express @types/bcryptjs

# Step 2: Fix import order using ESLint
echo -e "${BLUE}📝 Fixing import order issues...${NC}"
npx eslint --fix client/src/**/*.{ts,tsx} api/*.ts server/*.ts --ext .ts,.tsx

# Step 3: Generate Prisma client again with latest types
echo -e "${BLUE}🔄 Regenerating Prisma client...${NC}"
npx prisma generate --schema=./prisma/schema.prisma

echo -e "${GREEN}✅ TypeScript error fixing process completed!${NC}"
echo -e "${YELLOW}Note: You may still need to manually fix some TypeScript errors${NC}"
echo -e "${BLUE}===========================================================${NC}"
