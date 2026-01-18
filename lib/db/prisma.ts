import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const db = globalForPrisma.prisma || createPrismaClient()

function createPrismaClient() {
    const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
    return new PrismaClient({ adapter: pool })
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

export default db