
import { db } from './src/core/database/db.server.js';

async function test() {
  console.log('Connecting to DB...');
  try {
    const userCount = await db.user.count();
    console.log('User count:', userCount);
  } catch (error) {
    console.error('DB Error:', error);
  } finally {
    await db.$disconnect();
  }
}

test();
