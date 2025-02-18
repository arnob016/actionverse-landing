import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { BlogEditor } from "@/components/BlogEditor"

export default async function BlogDashboard() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/api/auth/signin')
  }

  return (
    <main className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-4xl font-bold mb-8">Blog Dashboard</h1>
      <BlogEditor />
    </main>
  )
} 