import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { Role } from '@prisma/client';
import { db } from '../src/features/database/client/db.server';

// Zod schema for data verification as requested
const UserSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  name: z.string().optional(),
  role: z.enum(['admin', 'developer', 'moderator', 'guest', 'user']).default('user'),
});

async function main() {
  console.log('🌱 Starting database seed...');

  // A mettre dans un .env
  const userData = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD, // Raw password before hashing
    name: process.env.ADMIN_USER_NAME,
    role: process.env.ADMIN_ROLE,
  };

  // Verify data using Zod
  const validatedUser = UserSchema.parse(userData);

  // Reset the database and restart identity sequences
  try {
    await db.$executeRawUnsafe(`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE`);
    console.log('✅ Database truncated and identities reset.');
  } catch (error) {
    console.warn('⚠️ Could not truncate table. It might not exist yet.', error);
  }

  const hashedPassword = await bcrypt.hash(validatedUser.password, 10);

  const user = await db.user.create({
    data: {
      email: validatedUser.email,
      password: hashedPassword,
      name: validatedUser.name,
      role: validatedUser.role as Role, // Correctly cast to the Role enum from Prisma Client
    },
  });

  console.log(`✅ Seed completed: First user created with email ${user.email} and ID ${user.id}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
