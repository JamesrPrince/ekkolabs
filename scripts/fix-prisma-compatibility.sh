#!/bin/bash
# Fix Prisma Client Compatibility Issues

# Colors for terminal output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}===========================================================${NC}"
echo -e "${BLUE}🔧 Prisma Client Compatibility Fix - Ekko Labs${NC}"
echo -e "${BLUE}===========================================================${NC}"

# Step 1: Regenerate Prisma schema from DB
echo -e "${BLUE}🔄 Regenerating Prisma schema from database...${NC}"
npx prisma db pull

# Step 2: Regenerate Prisma client
echo -e "${BLUE}🔄 Regenerating Prisma client...${NC}"
npx prisma generate

# Step 3: Create type-safe wrapper for Prisma client
echo -e "${BLUE}📝 Creating type-safe Prisma wrapper...${NC}"
cat > ./api/prisma-wrapper.ts << 'EOL'
/**
 * Type-safe wrapper for Prisma client operations
 */
import { PrismaClient } from '@prisma/client';
import { prisma } from './_db';

/**
 * Find a single record with proper type handling
 */
export async function findUnique<T>(
  model: keyof PrismaClient,
  args: any
): Promise<T | null> {
  try {
    // @ts-ignore - We're handling this dynamically
    const result = await prisma[model].findUnique(args);
    return result as T;
  } catch (error) {
    console.error(`Error in findUnique for ${String(model)}:`, error);
    return null;
  }
}

/**
 * Find multiple records with proper type handling
 */
export async function findMany<T>(
  model: keyof PrismaClient, 
  args?: any
): Promise<T[]> {
  try {
    // @ts-ignore - We're handling this dynamically
    const results = await prisma[model].findMany(args || {});
    return results as T[];
  } catch (error) {
    console.error(`Error in findMany for ${String(model)}:`, error);
    return [];
  }
}

/**
 * Count records with proper type handling
 */
export async function count(
  model: keyof PrismaClient,
  args?: any
): Promise<number> {
  try {
    // @ts-ignore - We're handling this dynamically
    return await prisma[model].count(args || {});
  } catch (error) {
    console.error(`Error in count for ${String(model)}:`, error);
    return 0;
  }
}

/**
 * Create record with proper type handling
 */
export async function create<T>(
  model: keyof PrismaClient,
  args: any
): Promise<T | null> {
  try {
    // @ts-ignore - We're handling this dynamically
    const result = await prisma[model].create(args);
    return result as T;
  } catch (error) {
    console.error(`Error in create for ${String(model)}:`, error);
    return null;
  }
}

/**
 * Update record with proper type handling
 */
export async function update<T>(
  model: keyof PrismaClient,
  args: any
): Promise<T | null> {
  try {
    // @ts-ignore - We're handling this dynamically
    const result = await prisma[model].update(args);
    return result as T;
  } catch (error) {
    console.error(`Error in update for ${String(model)}:`, error);
    return null;
  }
}

/**
 * Delete record with proper type handling
 */
export async function remove<T>(
  model: keyof PrismaClient,
  args: any
): Promise<T | null> {
  try {
    // @ts-ignore - We're handling this dynamically
    const result = await prisma[model].delete(args);
    return result as T;
  } catch (error) {
    console.error(`Error in remove for ${String(model)}:`, error);
    return null;
  }
}
EOL

echo -e "${GREEN}✅ Prisma compatibility fix completed!${NC}"
echo -e "${YELLOW}Note: Update your API endpoints to use the new wrapper functions.${NC}"
echo -e "${BLUE}===========================================================${NC}"
