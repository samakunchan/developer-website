import 'dotenv/config'; // Schema updated 2026-04-14T07:10:00Z
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { loadSecrets } from '../../../core/utils/bao.server';

// Load secrets from OpenBao before anything else
await loadSecrets();

export const db: PrismaClient = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});
