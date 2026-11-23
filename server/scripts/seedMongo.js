import { MongoClient, ServerApiVersion } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'malabarprime';

if (!uri) {
  console.error('[Seed Error] MONGODB_URI is not set in environment or .env');
  process.exit(1);
}

async function seed() {
  console.log(`[Seed] Connecting to MongoDB Atlas cluster for database: "${dbName}"...`);
  
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 10000,
  });

  try {
    await client.connect();
    console.log('[Seed] Connected successfully to MongoDB Atlas!');

    const db = client.db(dbName);
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    const localDb = JSON.parse(raw);

    const arrayCollections = [
      'products',
      'categories',
      'brands',
      'warehouses',
      'enquiries',
      'partners',
      'contacts',
      'testimonials'
    ];

    for (const collName of arrayCollections) {
      const items = localDb[collName] || [];
      const col = db.collection(collName);
      await col.deleteMany({});
      if (items.length > 0) {
        const docs = items.map(item => ({
          ...item,
          _id: item.id ? String(item.id) : undefined
        }));
        await col.insertMany(docs);
        console.log(`[Seed] Collection "${collName}": inserted ${items.length} records.`);
      } else {
        console.log(`[Seed] Collection "${collName}": 0 records (empty collection initialized).`);
      }
    }

    // Object collections: admin, assurance, companyContact, policies
    const objectCollections = [
      { key: 'admin', col: 'admin' },
      { key: 'assurance', col: 'assurance' },
      { key: 'companyContact', col: 'company_contact' },
      { key: 'policies', col: 'policies' }
    ];

    for (const obj of objectCollections) {
      const val = localDb[obj.key];
      if (val) {
        const col = db.collection(obj.col);
        await col.deleteMany({});
        await col.insertOne({ _id: 'current', ...val });
        console.log(`[Seed] Single-doc collection "${obj.col}": stored successfully.`);
      }
    }

    console.log('\n[Seed Complete] All Malabar Prime database collections seeded to MongoDB Atlas!');
    await client.close();
    process.exit(0);
  } catch (err) {
    console.error('[Seed Error] Failed to seed MongoDB Atlas:', err);
    process.exit(1);
  }
}

seed();
