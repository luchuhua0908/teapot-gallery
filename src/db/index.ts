import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';
import { getRequestContext } from '@cloudflare/next-on-pages';

export function getDb() {
  const ctx = getRequestContext();
  if (ctx && ctx.env && ctx.env.DB) {
     return drizzle(ctx.env.DB, { schema });
  }
  
  // 開發環境備用 (如果有全域變數)
  if (typeof process !== 'undefined' && process.env && (process.env as any).DB) {
      return drizzle((process.env as any).DB, { schema });
  }
  
  throw new Error("無法連接到 D1 資料庫：請確認 Cloudflare Bindings 或是開發環境設定");
}
