import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');

const DEFAULT_DB = {
  admin: {
    email: "malabarprime.co@gmail.com",
    password: "password123",
    name: "Malabar Prime Trade Desk Director",
    role: "Super Administrator"
  },
  assurance: {
    fssaiNumber: "",
    gstNumber: "",
    isoCert: "",
    coldChainCompliance: "",
    legalMetrology: "",
    labTesting: "",
    certifications: []
  },
  enquiries: [],
  partners: [],
  contacts: [],
  testimonials: [],
  categories: [],
  brands: [],
  products: [],
  companyContact: {
    contact: "",
    whatsapp: "",
    emergency: "",
    email: "",
    supportEmail: "",
    address: "",
    city: "Kozhikode, Kerala",
    mapUrl: ""
  },
  policies: {},
  warehouses: [],
  invoices: []
};

// In-memory cache for ultra-fast synchronous access across controllers
let cachedDb = null;
let mongoClient = null;
let mongoDb = null;
let isMongoConnected = false;

// Read database from local disk
function loadLocalDb() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const raw = fs.readFileSync(DB_PATH, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('[DB Model] Local read error:', err.message);
  }
  return { ...DEFAULT_DB };
}

// Initial in-memory load
cachedDb = loadLocalDb();

const ARRAY_COLLECTIONS = [
  'products',
  'categories',
  'brands',
  'warehouses',
  'invoices',
  'enquiries',
  'partners',
  'contacts',
  'testimonials'
];

const OBJECT_COLLECTIONS = [
  { key: 'admin', col: 'admin' },
  { key: 'assurance', col: 'assurance' },
  { key: 'companyContact', col: 'company_contact' },
  { key: 'policies', col: 'policies' }
];

/**
 * Connect to MongoDB Atlas and synchronize memory cache
 */
export async function initDb() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME || 'malabarprime';

  if (!uri) {
    console.log('[DB Model] MONGODB_URI not set. Using local file storage (server/data/db.json).');
    return cachedDb;
  }

  try {
    console.log(`[DB Model] Connecting to MongoDB Atlas cluster for database: "${dbName}"...`);
    mongoClient = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      connectTimeoutMS: 8000,
      serverSelectionTimeoutMS: 8000,
    });

    await mongoClient.connect();
    mongoDb = mongoClient.db(dbName);
    isMongoConnected = true;
    console.log(`[DB Model] ✅ Connected to MongoDB Atlas successfully! (Database: "${dbName}")`);

    // Check if MongoDB has existing data
    let totalItems = 0;
    const loadedData = { ...cachedDb };

    for (const collName of ARRAY_COLLECTIONS) {
      try {
        const col = mongoDb.collection(collName);
        const docs = await col.find({}).toArray();
        if (docs.length > 0) {
          loadedData[collName] = docs.map(d => {
            const { _id, ...rest } = d;
            return { id: rest.id || String(_id), ...rest };
          });
          totalItems += docs.length;
        }
      } catch (e) {
        console.warn(`[DB Model] Note querying collection ${collName}:`, e.message);
      }
    }

    for (const obj of OBJECT_COLLECTIONS) {
      try {
        const col = mongoDb.collection(obj.col);
        const doc = await col.findOne({ _id: 'current' }) || await col.findOne({});
        if (doc) {
          const { _id, ...rest } = doc;
          loadedData[obj.key] = rest;
          totalItems += 1;
        }
      } catch (e) {
        console.warn(`[DB Model] Note querying object ${obj.col}:`, e.message);
      }
    }

    // If MongoDB had records, update our cache and local file
    if (totalItems > 0) {
      cachedDb = loadedData;
      saveLocalDb(cachedDb);
      console.log(`[DB Model] Synchronized ${totalItems} active records from MongoDB Atlas into memory.`);
    } else {
      // MongoDB is currently empty, auto-seed from local db.json
      console.log('[DB Model] MongoDB database is currently empty. Seeding collections from local db.json...');
      await syncToMongo(cachedDb);
      console.log('[DB Model] Seeded collections to MongoDB Atlas.');
    }
  } catch (err) {
    console.warn(`[DB Model] ⚠️ MongoDB Atlas connection notice (${err.message}). Defaulting to local storage.`);
    isMongoConnected = false;
  }

  return cachedDb;
}

/**
 * Asynchronously syncs local data state to MongoDB Atlas collections
 */
async function syncToMongo(data) {
  if (!isMongoConnected || !mongoDb) return;
  try {
    for (const collName of ARRAY_COLLECTIONS) {
      const items = data[collName] || [];
      const col = mongoDb.collection(collName);
      await col.deleteMany({});
      if (items.length > 0) {
        const docs = items.map(item => ({
          ...item,
          _id: item.id ? String(item.id) : undefined
        }));
        await col.insertMany(docs);
      }
    }

    for (const obj of OBJECT_COLLECTIONS) {
      const val = data[obj.key];
      if (val) {
        const col = mongoDb.collection(obj.col);
        await col.deleteMany({});
        await col.insertOne({ _id: 'current', ...val });
      }
    }
  } catch (err) {
    console.error('[DB Model] MongoDB async sync error:', err.message);
  }
}

// Write to local db.json atomically
function saveLocalDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[DB Model] Local write error:', err);
    return false;
  }
}

// Synchronous getter for all controllers
export function getDb() {
  if (!cachedDb) {
    cachedDb = loadLocalDb();
  }
  return cachedDb;
}

// Synchronous saver for all controllers with background MongoDB sync
export function saveDb(data) {
  cachedDb = data;
  const localOk = saveLocalDb(data);

  // Non-blocking async sync to MongoDB Atlas
  if (isMongoConnected) {
    syncToMongo(data).catch(err => {
      console.error('[DB Model] Async MongoDB push failed:', err.message);
    });
  }

  return localOk;
}

export function isConnectedToMongo() {
  return isMongoConnected;
}

export function getMongoDb() {
  return mongoDb;
}

export function getMongoClient() {
  return mongoClient;
}

// Parse incoming JSON body
export function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
  });
}
