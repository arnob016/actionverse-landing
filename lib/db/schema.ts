import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  slug: text('slug').notNull().unique(),
  authorId: text('author_id').notNull(),
  status: text('status', { enum: ['draft', 'published'] }).notNull().default('draft'),
  featuredImage: text('featured_image'),
  tags: text('tags'),
  readingTime: integer('reading_time'),
  views: integer('views').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const authors = sqliteTable('authors', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  role: text('role', { enum: ['admin', 'author'] }).notNull().default('author'),
  twitter: text('twitter'),
  github: text('github'),
  website: text('website'),
});

export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey(),
  content: text('content').notNull(),
  postId: integer('post_id').notNull(),
  authorId: text('author_id').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export type Post = typeof posts.$inferSelect;
export type Author = typeof authors.$inferSelect;
export type Comment = typeof comments.$inferSelect; 