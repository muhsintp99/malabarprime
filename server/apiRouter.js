/**
 * Malabar Prime Central Trade Desk - API Gateway & Dispatcher
 * Modular Architecture Gateway bridging to MVC Routes, Controllers & Middlewares
 */
import { handleApiRequest } from './routes/index.js';
import { getDb, saveDb, parseBody } from './models/db.js';

export {
  handleApiRequest,
  getDb,
  saveDb,
  parseBody
};

export default handleApiRequest;
