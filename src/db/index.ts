import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';
import { getRequestContext } from '@cloudflare/next-on-pages';

export function getDb() {
  let env;
  try {
    env = getRequestContext().env;
  } catch (e) {
    // Fallback for local development or if getRequestContext fails
    env = process.env as any;
  }
  return drizzle(env.DB, { schema });
}
