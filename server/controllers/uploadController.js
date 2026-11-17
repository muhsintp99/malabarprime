import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { saveBase64File } from '../middlewares/uploadMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.join(__dirname, '..', '..', 'public', 'uploads');

export const uploadController = {
  uploadFile: async (req, res, body) => {
    try {
      const filePayload = body.file || body.data || body.base64;
      const filename = body.name || body.filename || 'uploaded_image';

      if (!filePayload) {
        return res.json(400, {
          success: false,
          message: 'No file data received. Provide "file" as base64 string or data URL.'
        });
      }

      const fileInfo = saveBase64File(filePayload, filename);

      return res.json(201, {
        success: true,
        message: 'File uploaded successfully',
        data: {
          url: fileInfo.url,
          filename: fileInfo.filename,
          size: fileInfo.size,
          extension: fileInfo.extension
        }
      });
    } catch (err) {
      console.error('[Upload Controller Error]', err);
      return res.json(500, { success: false, message: 'File upload failed', error: err.message });
    }
  },

  deleteFile: async (req, res, params) => {
    try {
      const filename = path.basename(params.filename);
      const filePath = path.join(UPLOADS_DIR, filename);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return res.json(200, { success: true, message: `File ${filename} deleted successfully` });
      }
      return res.json(404, { success: false, message: `File ${filename} not found` });
    } catch (err) {
      return res.json(500, { success: false, message: 'Delete file failed', error: err.message });
    }
  }
};

