"use client"

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Post } from '@/lib/db/schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Loader2, Save } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BlogEditorProps {
  post?: Post
  isEditing?: boolean
}

export function BlogEditor({ post, isEditing = false }: BlogEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState(post?.title || '')
  const [content, setContent] = useState(post?.content || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [tags, setTags] = useState(post?.tags || '')
  const [featuredImage, setFeaturedImage] = useState(post?.featuredImage || '')

  const createOrUpdatePost = useCallback(async () => {
    if (!title || !content) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(isEditing ? `/api/posts/${post?.id}` : '/api/posts', {
        method: isEditing ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          excerpt,
          tags,
          featuredImage,
          status: 'published',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save post')
      }

      const data = await response.json()
      toast.success(isEditing ? 'Post updated successfully' : 'Post created successfully')
      router.push(`/blog/${data.slug}`)
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
      console.error('Error saving post:', error)
    } finally {
      setIsLoading(false)
    }
  }, [title, content, excerpt, tags, featuredImage, isEditing, post?.id, router])

  // Auto-save draft every 30 seconds
  useEffect(() => {
    if (!title || !content) return

    const saveTimeout = setTimeout(async () => {
      try {
        await fetch(isEditing ? `/api/posts/${post?.id}` : '/api/posts', {
          method: isEditing ? 'PATCH' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            content,
            excerpt,
            tags,
            featuredImage,
            status: 'draft',
          }),
        })
        toast.success('Draft saved')
      } catch (error) {
        console.error('Error auto-saving draft:', error)
      }
    }, 30000)

    return () => clearTimeout(saveTimeout)
  }, [title, content, excerpt, tags, featuredImage, isEditing, post?.id])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        createOrUpdatePost()
      }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your post title"
          className="text-lg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Brief summary of your post"
          className="h-20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post content here..."
          className="min-h-[400px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="featuredImage">Featured Image URL</Label>
        <Input
          id="featuredImage"
          value={featuredImage}
          onChange={(e) => setFeaturedImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="technology, programming, web development"
        />
        <p className="text-sm text-muted-foreground">
          Separate tags with commas
        </p>
      </div>

      <Button
        type="submit"
        className={cn(
          "w-full sm:w-auto",
          isLoading && "cursor-not-allowed opacity-50"
        )}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            {isEditing ? 'Update Post' : 'Publish Post'}
          </>
        )}
      </Button>
    </form>
  )
} 