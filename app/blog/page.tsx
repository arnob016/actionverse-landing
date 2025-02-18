import { db } from '@/lib/db';
import { posts, authors } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { BlogPost } from '@/components/BlogPost';
import { Button } from '@/components/ui/button';
import { PenSquare } from 'lucide-react';
import { auth } from '@/lib/auth';

export const revalidate = 60; // Revalidate every minute

export default async function BlogPage() {
  const session = await auth();
  const allPosts = await db.select()
    .from(posts)
    .leftJoin(authors, eq(posts.authorId, authors.id))
    .where(eq(posts.status, 'published'))
    .orderBy(posts.createdAt);

  return (
    <main className="container mx-auto px-4 py-8 pt-24">
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Thoughts, stories and ideas.
          </p>
        </div>
        
        {session && (
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/blog/new">
                <PenSquare className="mr-2 h-4 w-4" />
                Write a Post
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/blog/dashboard">
                Dashboard
              </Link>
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {allPosts.map(({ posts: post, authors: author }) => (
          <BlogPost
            key={post.id}
            post={post}
            author={author}
            isPreview
          />
        ))}
      </div>

      {allPosts.length === 0 && (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed">
          <h2 className="text-xl font-semibold">No posts yet</h2>
          <p className="mt-2 text-muted-foreground">
            Be the first one to write a post!
          </p>
          {session && (
            <Button asChild className="mt-4">
              <Link href="/blog/new">
                <PenSquare className="mr-2 h-4 w-4" />
                Write a Post
              </Link>
            </Button>
          )}
        </div>
      )}
    </main>
  );
} 