import { User, ContactMessages } from '@prisma/client';

import { prisma } from "./db";

// Define proper interfaces for input types
export interface UserInput {
  username: string;
  password: string;
  name?: string;
  email?: string;
}

export interface ContactMessageInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Keep the interface the same but with updated types
export interface IStorage {
  getUser(id: number): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  createUser(user: UserInput): Promise<User>;
  saveContactMessage(message: ContactMessageInput): Promise<ContactMessages>;
}

// Replace database access with Prisma
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id }
    });
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { username }
    });
  }

  async createUser(user: UserInput): Promise<User> {
    return await prisma.user.create({
      data: user
    });
  }

  async saveContactMessage(message: ContactMessageInput): Promise<ContactMessages> {
    return await prisma.contactMessages.create({
      data: message
    });
  }
}

export const storage = new DatabaseStorage();
