import { db } from '../src/features/database/server/db.server';

async function main() {
  // Reset the database and restart identity sequences
  console.log('📬 Reset table Message...');
  try {
    await db.$executeRawUnsafe(`TRUNCATE TABLE "messages" RESTART IDENTITY CASCADE`);
    console.log('✅ Database truncated and identities reset.');
  } catch (error) {
    console.warn('⚠️ Could not truncate table. It might not exist yet.', error);
  }
  // Create 100 sample messages
  console.log('📬 Seeding 100 messages...');
  const services = [
    { id: 'web', label: 'Web Development', icon: 'language' },
    { id: 'mobile', label: 'Mobile App', icon: 'smartphone' },
    { id: 'ai', label: 'AI Solutions', icon: 'psychology' },
  ];

  const priceRanges = [
    { id: 'budget', label: '$1k - $5k', currency: '$' },
    { id: 'medium', label: '$5k - $20k', currency: '$' },
    { id: 'enterprise', label: '$20k+', currency: '$' },
  ];

  const firstNames = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];

  for (let i = 0; i < 100; i++) {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[Math.floor(i / 1.5) % lastNames.length];
    const fullName = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`;
    const service = services[i % services.length];
    const price = priceRanges[i % priceRanges.length];
    const isRead = i % 3 === 0; // Every 3rd message is read

    await db.message.create({
      data: {
        fullName,
        email,
        serviceType: service,
        priceRangeType: price,
        projectBrief: `This is a sample project brief for message #${i + 1}. I am interested in ${service.label} services within the ${price.label} range.`,
        isRead,
        createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 2), // Spread over time (2 hours apart)
      },
    });
  }
}
main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
