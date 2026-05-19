import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { Role } from '@prisma/client';
import { db } from '../src/features/database/server/db.server';

// Zod schema for data verification
const UserSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  name: z.string().optional(),
  role: z.enum(['admin', 'developer', 'moderator', 'guest', 'user']).default('user'),
});

async function main() {
  console.log('🌱 Starting production database seed (User only)...');

  const userData = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD, // Raw password before hashing
    name: process.env.ADMIN_USER_NAME || 'Admin',
    role: process.env.ADMIN_ROLE || 'admin',
  };

  let APP_URL: string;
  if (process.env.NODE_ENV == 'production') {
    APP_URL = process.env.APP_URL_PROD || `http://localhost:${process.env.APP_PORT || 3007}`;
  } else if (process.env.NODE_ENV == 'staging') {
    APP_URL = process.env.APP_URL_STAGING || `http://localhost:${process.env.APP_PORT || 3006}`;
  } else {
    APP_URL = process.env.APP_URL_DEV || `http://localhost:${process.env.APP_PORT || 3000}`;
  }

  if (!userData.email || !userData.password) {
    console.log('⚠️ ADMIN_EMAIL or ADMIN_PASSWORD not set. Skipping production user creation.');
    return;
  }

  // Verify data using Zod
  const validatedUser = UserSchema.parse(userData);

  // Check if user already exists
  const existingUser = await db.user.findUnique({
    where: { email: validatedUser.email },
  });

  if (existingUser) {
    console.log(`✅ Admin user with email ${validatedUser.email} already exists. Skipping creation.`);
    return;
  }

  const hashedPassword = await bcrypt.hash(validatedUser.password, 10);

  const user = await db.user.create({
    data: {
      email: validatedUser.email,
      password: hashedPassword,
      name: validatedUser.name,
      role: validatedUser.role as Role,
      image: {
        create: {
          tiny: `${APP_URL}/shared/seed/me-1-1777162885183-tiny.webp`,
          medium: `${APP_URL}/shared/seed/me-1-1777162885183-medium.webp`,
          raw: `${APP_URL}/shared/seed/me-1-1777162885183-raw.webp`,
        },
      },
    },
  });

  console.log(`✅ Production admin user successfully created: ${user.email}`);
}

main()
  .catch((e) => {
    console.error('❌ Production seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
