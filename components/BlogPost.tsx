import { formatDistance, format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { Post, Author } from '@/lib/db/schema';
import { cn } from '@/lib/utils';
import { CalendarDays, Clock, Eye, Share2 } from 'lucide-react';

interface BlogPostProps {
  post: Post;
  author: Author | null;
  isPreview?: boolean;
}

export function BlogPost({ post, author, isPreview = false }: BlogPostProps) {
  const commonProps = {
    className: cn(
      "group relative rounded-lg border p-6 shadow-md transition-all",
      "hover:shadow-lg dark:border-gray-800 dark:hover:border-gray-700",
      isPreview && "hover:cursor-pointer"
    )
  };

  if (isPreview) {
    return (
      <Link href={`/blog/${post.slug}`} {...commonProps}>
        <BlogPostContent post={post} author={author} isPreview={isPreview} />
      </Link>
    );
  }

  return (
    <article {...commonProps}>
      <BlogPostContent post={post} author={author} isPreview={isPreview} />
    </article>
  );
}

function BlogPostContent({ post, author, isPreview }: BlogPostProps) {
  return (
    <>
      {post.featuredImage && (
        <div className="relative mb-6 h-[200px] w-full overflow-hidden rounded-lg">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {author?.avatarUrl && (
            <Image
              src={author.avatarUrl}
              alt={author.name}
              width={24}
              height={24}
              className="rounded-full"
            />
          )}
          <span>{author?.name}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            <time dateTime={new Date(post.createdAt).toISOString()}>
              {format(new Date(post.createdAt), 'MMMM d, yyyy')}
            </time>
          </div>
        </div>

        <h2 className="text-2xl font-bold tracking-tight">{post.title}</h2>

        {post.excerpt && (
          <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
        )}

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {post.readingTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{post.views} views</span>
          </div>
          {!isPreview && (
            <button className="ml-auto flex items-center gap-1 rounded-md p-2 hover:bg-accent">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
          )}
        </div>

        {post.tags && (
          <div className="flex flex-wrap gap-2">
            {post.tags.split(',').map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
} 