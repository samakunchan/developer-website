import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
const x = new PrismaPg({ connectionString: process.env.DATABASE_URL });
console.log(x);
