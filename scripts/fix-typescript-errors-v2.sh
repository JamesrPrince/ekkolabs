#!/bin/bash
# Enhanced TypeScript Error Fixing Script v2

# Colors for terminal output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}===========================================================${NC}"
echo -e "${BLUE}🔧 Enhanced TypeScript Error Fixing Script v2 - Ekko Labs${NC}"
echo -e "${BLUE}===========================================================${NC}"

# Step 1: Install missing type declarations
echo -e "${BLUE}📦 Installing missing type declarations...${NC}"
npm install --save-dev @types/jsonwebtoken @types/express @types/bcryptjs @types/node

# Step 2: Generate Prisma client with latest types
echo -e "${BLUE}🔄 Regenerating Prisma client...${NC}"
npx prisma generate --schema=./prisma/schema.prisma

# Step 3: Fix specific files with TypeScript errors
echo -e "${BLUE}🔍 Fixing specific TypeScript issues...${NC}"

# Fix Blog.tsx issues - rename unused variables with underscore prefix
echo -e "${YELLOW}Fixing unused variables in Blog.tsx...${NC}"
if grep -q "const { elementRef:" "/Users/ekko/Developer/ekkolabs/client/src/pages/Blog.tsx"; then
  sed -i '' 's/const { elementRef:/const { elementRef: _elementRef,/g' "/Users/ekko/Developer/ekkolabs/client/src/pages/Blog.tsx"
fi

if grep -q "const featuredPost =" "/Users/ekko/Developer/ekkolabs/client/src/pages/Blog.tsx"; then
  sed -i '' 's/const featuredPost =/const _featuredPost =/g' "/Users/ekko/Developer/ekkolabs/client/src/pages/Blog.tsx"
fi

# Fix React unescaped entities in Blog.tsx
echo -e "${YELLOW}Fixing unescaped entities in Blog.tsx...${NC}"
sed -i '' "s/Don't miss out/Don&apos;t miss out/g" "/Users/ekko/Developer/ekkolabs/client/src/pages/Blog.tsx"
sed -i '' "s/We'll send/We&apos;ll send/g" "/Users/ekko/Developer/ekkolabs/client/src/pages/Blog.tsx"

# Fix BlogList.tsx issues
echo -e "${YELLOW}Fixing BlogList.tsx TypeScript errors...${NC}"
# Replace local normalizePost function with imported one
if grep -q "const normalizePost = (post)" "/Users/ekko/Developer/ekkolabs/client/src/pages/BlogList.tsx"; then
  sed -i '' '/const normalizePost = (post)/,/};/d' "/Users/ekko/Developer/ekkolabs/client/src/pages/BlogList.tsx"
fi

# Fix undefined properties
sed -i '' 's/.filter((post) => /.filter((post: Post) => /g' "/Users/ekko/Developer/ekkolabs/client/src/pages/BlogList.tsx"
sed -i '' 's/.map((post) => /.map((post: Post) => /g' "/Users/ekko/Developer/ekkolabs/client/src/pages/BlogList.tsx"

# Step 4: Fix import order using ESLint
echo -e "${BLUE}📝 Fixing import order issues...${NC}"
npx eslint --fix client/src/pages/BlogList.tsx
npx eslint --fix client/src/pages/Blog.tsx
npx eslint --fix client/src/hooks/use-blog-api.ts
npx eslint --fix client/src/hooks/use-api-cache.ts

echo -e "${GREEN}✅ Enhanced TypeScript error fixing completed!${NC}"
echo -e "${YELLOW}Note: Run TypeScript check to verify error resolution:${NC}"
echo -e "${YELLOW}      npx tsc --noEmit${NC}"
echo -e "${BLUE}===========================================================${NC}"
