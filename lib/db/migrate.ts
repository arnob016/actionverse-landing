import { migrate } from 'drizzle-orm/libsql/migrator';
import { db } from '@/lib/db';

async function runMigrations() {
  try {
    console.log('Running migrations...');
    await migrate(db, { migrationsFolder: './lib/db/migrations' });
    console.log('Migrations completed successfully!');
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  }
}

runMigrations(); 