import 'dotenv/config';
import { loadSecrets } from './src/core/utils/bao.server.js';

async function test() {
  await loadSecrets();
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
}

test().catch(console.error);
