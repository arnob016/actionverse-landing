import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { posts } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import slugify from 'slugify';

const postSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  tags: z.string().optional(),
  featuredImage: z.string().url().optional(),
  status: z.enum(['draft', 'published']),
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const json = await req.json();
    const body = postSchema.parse(json);

    const slug = slugify(body.title, { lower: true, strict: true });
    const existingPost = await db.select()
      .from(posts)
      .where(eq(posts.slug, slug))
      .limit(1);

    if (existingPost.length > 0) {
      return new NextResponse('Post with this title already exists', { status: 409 });
    }

    const post = await db.insert(posts).values({
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      tags: body.tags,
      featuredImage: body.featuredImage,
      status: body.status,
      slug,
      authorId: session.user.id,
    }).returning();

    return NextResponse.json(post[0]);
  } catch (error) {
    console.error('Error creating post:', error);
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.errors), { status: 400 });
    }
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await db.query.posts.findMany({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
      with: {
        author: true,
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 