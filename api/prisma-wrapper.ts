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
