import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const teapots = sqliteTable('teapots', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  clayType: text('clay_type').notNull(), // e.g. 紫泥, 朱泥, 段泥
  maker: text('maker').notNull(), // Name of the artisan
  capacityMl: integer('capacity_ml').notNull(),
  description: text('description'),
  imageUrl: text('image_url'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});
