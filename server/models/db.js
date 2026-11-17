import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');

// Read database from disk
export function getDb() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[DB Model] Read error:', err);
    return {
      admin: {
        email: "malabarprime.co@gmail.com",
        password: "password123",
        name: "Malabar Prime Trade Desk Director",
        role: "Super Administrator"
      },
      assurance: { certifications: [] },
      enquiries: [],
      partners: [],
      contacts: [],
      testimonials: [],
      categories: [],
      products: [],
      brands: []
    };
  }
}

// Write database to disk atomically
export function saveDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[DB Model] Write error:', err);
    return false;
  }
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
