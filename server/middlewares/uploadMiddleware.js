import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.join(__dirname, '..', '..', 'public', 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Allowed MIME / Extensions
const ALLOWED_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.pdf'];

export function saveBase64File(base64String, originalName = 'upload') {
  // Extract extension and raw data
  let ext = path.extname(originalName).toLowerCase();
  let base64Data = base64String;

  if (base64String.startsWith('data:')) {
    const matches = base64String.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (matches && matches.length === 3) {
      const mime = matches[1];
      base64Data = matches[2];
      if (!ext) {
        if (mime.includes('png')) ext = '.png';
        else if (mime.includes('jpeg') || mime.includes('jpg')) ext = '.jpg';
        else if (mime.includes('webp')) ext = '.webp';
        else if (mime.includes('pdf')) ext = '.pdf';
        else ext = '.png';
      }
    }
  }

  if (!ALLOWED_EXTS.includes(ext)) {
    ext = '.png';
  }

  const cleanBaseName = path.basename(originalName, path.extname(originalName))
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 30);

  const filename = `${Date.now()}_${cleanBaseName || 'file'}${ext}`;
  const targetPath = path.join(UPLOADS_DIR, filename);

  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(targetPath, buffer);

  return {
    filename,
    url: `/uploads/${filename}`,
    size: buffer.length,
    extension: ext
  };
}

