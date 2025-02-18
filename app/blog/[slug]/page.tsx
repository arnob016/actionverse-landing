import { Metadata } from 'next'
import { db } from '@/lib/db'
import { posts, authors } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { BlogPost } from '@/components/BlogPost'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Edit } from 'lucide-react'
import Link from 'next/link'
import { auth } from '@/lib/auth'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await db.select()
    .from(posts)
    .leftJoin(authors, eq(posts.authorId, authors.id))
    .where(eq(posts.slug, params.slug))
    .limit(1)

  if (!post[0]) return {}

  const { posts: postData, authors: author } = post[0]

  return {
    title: postData.title,
    description: postData.excerpt || postData.content.slice(0, 160),
    authors: [{ name: author?.name }],
    openGraph: {
      title: postData.title,
      description: postData.excerpt || postData.content.slice(0, 160),
      type: 'article',
      publishedTime: new Date(postData.createdAt).toISOString(),
      authors: author?.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: postData.title,
      description: postData.excerpt || postData.content.slice(0, 160),
    }
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const session = await auth()
  const post = await db.select()
    .from(posts)
    .leftJoin(authors, eq(posts.authorId, authors.id))
    .where(eq(posts.slug, params.slug))
    .limit(1)

  if (!post[0]) notFound()

  const { posts: postData, authors: author } = post[0]
  const isAuthor = session?.user?.id === author?.id

  // Increment view count
  await db
    .update(posts)
    .set({ views: (postData.views || 0) + 1 })
    .where(eq(posts.id, postData.id))

  return (
    <main className="container mx-auto px-4 py-8 pt-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link href="/blog" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
          {isAuthor && (
            <Button variant="outline" asChild>
              <Link href={`/blog/${params.slug}/edit`} className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit Post
              </Link>
            </Button>
          )}
        </div>

        <BlogPost post={postData} author={author} />
      </div>
    </main>
  )
} 