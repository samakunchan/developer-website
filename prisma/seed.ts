import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { Role, ProjectCategory } from '@prisma/client';
import { db } from '../src/features/database/server/db.server';
import fs from 'fs';
import path from 'path';
import { syncPendingEmbeddingsInternal } from '../src/features/search/utils/search-actions.server';

// Zod schema for data verification as requested
const UserSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  name: z.string().optional(),
  role: z.enum(['admin', 'developer', 'moderator', 'guest', 'user']).default('user'),
  // Ajout de la validation pour l'image de profil
  image: z
    .object({
      tiny: z.url(),
      medium: z.url(),
      raw: z.url(),
    })
    .optional(),
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

  const APP_URL = process.env.APP_URL || `http://localhost:${process.env.APP_PORT || 3000}`;

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
      image: {
        create: {
          tiny: `${APP_URL}/shared/seed/me-1-1777162885183-tiny.webp`,
          medium: `${APP_URL}/shared/seed/me-1-1777162885183-medium.webp`,
          raw: `${APP_URL}/shared/seed/me-1-1777162885183-raw.webp`,
        },
      },
    },
    include: {
      image: true,
    },
  });

  const initialProjects = [
    {
      slug: 'nova-analytics-platform-web',
      image: {
        medium: {
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0S_tlYJ11_Zm9AM9150irhx0uCiLyo890jeNJ4_HFXYihTkZtgcGx-FnjCK0wxollBz5iADdB65IEX20B3PC2idT6NLS_-Z3fpasq5pcf9eic0lDl0y5JGuELh6J_AMGRX86i7skN-Vleb97NyhbnhFS4HMCaqOtFlRM0K09jb7BxNPcnEn29lsvaVXHrZgwx2R1Krm3ceYI783WvBIXN6XpNHmg6Nr4qGQFQDSF78Z_eIwg8iewu2t_xH8egesRS42l5_GVvxSw',
          alt: 'Modern minimalist dashboard interface design',
        },
        raw: {
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0S_tlYJ11_Zm9AM9150irhx0uCiLyo890jeNJ4_HFXYihTkZtgcGx-FnjCK0wxollBz5iADdB65IEX20B3PC2idT6NLS_-Z3fpasq5pcf9eic0lDl0y5JGuELh6J_AMGRX86i7skN-Vleb97NyhbnhFS4HMCaqOtFlRM0K09jb7BxNPcnEn29lsvaVXHrZgwx2R1Krm3ceYI783WvBIXN6XpNHmg6Nr4qGQFQDSF78Z_eIwg8iewu2t_xH8egesRS42l5_GVvxSw',
          alt: 'Modern minimalist dashboard interface design',
        },
      },
      title: 'Nova Analytics Platform',
      category: ProjectCategory.web,
      categoryLabel: 'Web',
      description:
        'A complex data visualization dashboard built with Next.js, D3.js, and Supabase for real-time fleet tracking.',
      caseStudyNumber: '01',
      techIcons: ['javascript', 'database'],
      techStack: [
        { name: 'Next.js', icon: 'layers' },
        { name: 'D3.js', icon: 'show_chart' },
        { name: 'Supabase', icon: 'database' },
        { name: 'Tailwind CSS', icon: 'palette' },
      ],
      features: [
        {
          icon: 'bolt',
          title: 'Real-time Telemetry',
          description: 'Sub-100ms updates via WebSockets and Supabase Realtime.',
        },
        {
          icon: 'query_stats',
          title: 'Custom D3 Rig',
          description: 'Bespoke SVG coordinate systems for non-standard data mapping.',
        },
        {
          icon: 'security',
          title: 'RBAC Control',
          description: 'Granular Row-Level Security for enterprise-grade privacy.',
        },
        {
          icon: 'view_quilt',
          title: 'Fluid Layouts',
          description: 'Adaptive canvas scaling for ultra-wide command centers.',
        },
      ],
      isFeatured: true,
    },
    {
      slug: 'fitflow-mobile-mobile',
      image: {
        medium: {
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVFwUrXKAcvI-3AypGUga4YO36oJAUPdYlsZE7PKYZ6bHj8Yc_5hYng0-vSM26jACNIhFZenme8v0WbzH3daYFsIiJQaeXdiNwB1tWcALGm3NJZ5h2wB7OoiAakGOjLmmNvNoOviOlgLVU_2gxy-Jk99chkfkmp3zwUQ4ptTHuE60zpT6-YOGnwUI65Jyz9pQCF6EreyjZygFFiaSQd6-H4aYoERaTzVLJR0VV7lOk3oKo6XSoMJB1dqvMXAsKt_qEzXnXQZgZt-8',
          alt: 'Sleek mobile app interface on a smartphone',
        },
        raw: {
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVFwUrXKAcvI-3AypGUga4YO36oJAUPdYlsZE7PKYZ6bHj8Yc_5hYng0-vSM26jACNIhFZenme8v0WbzH3daYFsIiJQaeXdiNwB1tWcALGm3NJZ5h2wB7OoiAakGOjLmmNvNoOviOlgLVU_2gxy-Jk99chkfkmp3zwUQ4ptTHuE60zpT6-YOGnwUI65Jyz9pQCF6EreyjZygFFiaSQd6-H4aYoERaTzVLJR0VV7lOk3oKo6XSoMJB1dqvMXAsKt_qEzXnXQZgZt-8',
          alt: 'Sleek mobile app interface on a smartphone',
        },
      },
      title: 'FitFlow Mobile',
      category: ProjectCategory.mobile,
      categoryLabel: 'Mobile',
      description:
        'Cross-platform fitness application featuring custom workout builders and wearable device integration using React Native.',
      caseStudyNumber: '02',
      techIcons: ['smartphone', 'monitoring'],
      techStack: [
        { name: 'React Native', icon: 'smartphone' },
        { name: 'Redux State', icon: 'account_tree' },
        { name: 'Firebase', icon: 'local_fire_department' },
        { name: 'Apple Health', icon: 'favorite' },
      ],
      features: [
        {
          icon: 'fitness_center',
          title: 'Workout Builder',
          description: 'Highly customized routines with drag-and-drop mechanics.',
        },
        {
          icon: 'watch',
          title: 'Wearable Sync',
          description: 'Instant synchronization with health-tracking devices.',
        },
        {
          icon: 'notifications_active',
          title: 'Smart Reminders',
          description: 'Adaptive push notification engine based on user habits.',
        },
        {
          icon: 'offline_bolt',
          title: 'Offline-First',
          description: 'Fully functional without internet, syncing when online.',
        },
      ],
      isFeatured: true,
    },
    {
      slug: 'apex-e-commerce-web',
      image: {
        medium: {
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDq5xXlSiAo7jU2iKT_S6U1-1u0IIA4kwqajqjm07FqugNtqzbMjrRIigsQDywnYhLw6DmacD3k7ncIU3nS-NKABLBDQQGNV4dE6OG_YpEQMq3Tudy4ISPbTet_z1J0uW1NWy5u9k1L3nkgnWpJoup5M4Kid6FTVzn00E-s11XElXFsodF9NxcZ5fN2iA-RJL1sX9k9HLnbt9t7Hx9L8hXx2zoYHGZrj4dQclBJifbyGmaT-xI-wom0pd9d3s9a5t1gb5ggOsT1gqE',
          alt: 'E-commerce website with product grid view',
        },
        raw: {
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDq5xXlSiAo7jU2iKT_S6U1-1u0IIA4kwqajqjm07FqugNtqzbMjrRIigsQDywnYhLw6DmacD3k7ncIU3nS-NKABLBDQQGNV4dE6OG_YpEQMq3Tudy4ISPbTet_z1J0uW1NWy5u9k1L3nkgnWpJoup5M4Kid6FTVzn00E-s11XElXFsodF9NxcZ5fN2iA-RJL1sX9k9HLnbt9t7Hx9L8hXx2zoYHGZrj4dQclBJifbyGmaT-xI-wom0pd9d3s9a5t1gb5ggOsT1gqE',
          alt: 'E-commerce website with product grid view',
        },
      },
      title: 'Apex E-Commerce',
      category: ProjectCategory.web,
      categoryLabel: 'Web',
      description:
        'High-performance headless commerce solution with Stripe integration and custom inventory management.',
      caseStudyNumber: '03',
      techIcons: ['shopping_bag', 'payments'],
      techStack: [
        { name: 'Remix', icon: 'auto_awesome' },
        { name: 'Stripe', icon: 'payments' },
        { name: 'Prisma ORM', icon: 'storage' },
        { name: 'Redis Cache', icon: 'memory' },
      ],
      features: [
        {
          icon: 'shopping_cart_checkout',
          title: 'One-Tap Checkout',
          description: 'Stripe-managed checkout flow for zero conversion drop.',
        },
        {
          icon: 'inventory_2',
          title: 'Real-time Stock',
          description: 'Global inventory tracking across multiple warehouses.',
        },
        {
          icon: 'analytics',
          title: 'Admin Dashboard',
          description: 'Bespoke sales and audience data visualization insights.',
        },
        {
          icon: 'speed',
          title: 'Edge Caching',
          description: 'Instant site delivery via ultra-global edge locations.',
        },
      ],
      isFeatured: false,
    },
    {
      slug: 'cryptopulse-api-web',
      image: {
        medium: {
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwed4Z9umdS00GxunpMe0hwo7OmMtNp_yCbeJRFFfkKJCGXy53xgISbl7LB5yOp7sQRBodsAPKYiyc9sTS_JiXZQvZpeEsvts-XndIn6WfnPsnHimnu2nzBH_EEc0jF8dbKcnihtwzhV5h3JwTB0JZrfXsYbwEPew8mM8fMXi5KjrCoNLEKmGNt6XvEwq0E56g7Tbt7efbO6vXWpP9CUo-iXiiQNVE7Jupf1iMar3wM9oUl-VwPR4GMlbqQXWZE-NPw26tJY0rtzs',
          alt: 'Abstract data visualization with neon lines',
        },
        raw: {
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwed4Z9umdS00GxunpMe0hwo7OmMtNp_yCbeJRFFfkKJCGXy53xgISbl7LB5yOp7sQRBodsAPKYiyc9sTS_JiXZQvZpeEsvts-XndIn6WfnPsnHimnu2nzBH_EEc0jF8dbKcnihtwzhV5h3JwTB0JZrfXsYbwEPew8mM8fMXi5KjrCoNLEKmGNt6XvEwq0E56g7Tbt7efbO6vXWpP9CUo-iXiiQNVE7Jupf1iMar3wM9oUl-VwPR4GMlbqQXWZE-NPw26tJY0rtzs',
          alt: 'Abstract data visualization with neon lines',
        },
      },
      title: 'CryptoPulse API',
      category: ProjectCategory.web,
      categoryLabel: 'Web',
      description:
        'Robust backend service for cryptocurrency market analysis providing real-time data to thousands of users.',
      caseStudyNumber: '04',
      techIcons: ['api', 'speed'],
      techStack: [
        { name: 'Go (Golang)', icon: 'terminal' },
        { name: 'gRPC', icon: 'swap_horiz' },
        { name: 'PostgreSQL', icon: 'database' },
        { name: 'Grafana', icon: 'monitoring' },
      ],
      features: [
        {
          icon: 'stream',
          title: 'High-Throughput',
          description: 'Capable of handling 50k concurrent gRPC connections.',
        },
        {
          icon: 'timer',
          title: 'Nanosecond Latency',
          description: 'Optimized data pathways for high-frequency trading.',
        },
        {
          icon: 'api',
          title: 'Dynamic Webhooks',
          description: 'Custom alert triggers for market price volatility events.',
        },
        {
          icon: 'history',
          title: 'Temporal Data',
          description: 'Vast historical archive accessible via optimized APIs.',
        },
      ],
      isFeatured: false,
    },
  ];

  const projectsDir = path.join(process.cwd(), 'public', 'shared', 'projects');
  if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir, { recursive: true });
  }

  for (const project of initialProjects) {
    const { image, slug, ...rest } = project;

    const mediumFilename = `project-${slug}-1776090901828-medium.webp`;
    const mediumPath = path.join(projectsDir, mediumFilename);
    if (!fs.existsSync(mediumPath)) {
      try {
        const res = await fetch(image.medium.url);
        const buffer = await res.arrayBuffer();
        await fs.promises.writeFile(mediumPath, Buffer.from(buffer));
        console.log(`Downloaded medium image for ${slug}`);
      } catch (error) {
        console.error(`Failed to download medium image for ${slug}`, error);
      }
    }

    const rawFilename = `project-${slug}-1776090901828-raw.webp`;
    const rawPath = path.join(projectsDir, rawFilename);
    if (!fs.existsSync(rawPath)) {
      try {
        const res = await fetch(image.raw.url);
        const buffer = await res.arrayBuffer();
        await fs.promises.writeFile(rawPath, Buffer.from(buffer));
        console.log(`Downloaded raw image for ${slug}`);
      } catch (error) {
        console.error(`Failed to download raw image for ${slug}`, error);
      }
    }

    const mediumUrl = `${APP_URL}/cdn/${mediumFilename}`;
    const rawUrl = `${APP_URL}/cdn/${rawFilename}`;

    await db.project.create({
      data: {
        ...rest,
        slug,
        userId: user.id,
        image: {
          create: {
            medium: { url: mediumUrl, alt: image.medium.alt },
            raw: { url: rawUrl, alt: image.raw.alt },
          },
        },
      },
    });
  }

  console.log(`✅ Seed completed: First user created with email ${user.email} and ID ${user.id}`);
  console.log(`✅ ${initialProjects.length} projects seeded.`);

  console.log('✅ Indexing completed (via triggers).');

  console.log('🤖 Syncing embeddings (this may take a moment)...');
  await syncPendingEmbeddingsInternal();
  console.log('✅ Embeddings synced.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
