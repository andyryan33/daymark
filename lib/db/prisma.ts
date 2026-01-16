import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter: pool });

const globalForPrisma = global as unknown as { prisma: typeof db }

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

export default db