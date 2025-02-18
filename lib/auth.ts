import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/lib/db"
import { authors } from "@/lib/db/schema"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { eq } from "drizzle-orm"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        const author = await db.query.authors.findFirst({
          where: eq(authors.email, session.user.email!)
        })
        
        if (author) {
          session.user.id = author.id
        }
      }
      return session
    },
    async signIn({ user }) {
      // Create author profile if it doesn't exist
      if (user.email) {
        const author = await db.query.authors.findFirst({
          where: eq(authors.email, user.email)
        })
        
        if (!author) {
          await db.insert(authors).values({
            id: user.id,
            name: user.name!,
            email: user.email,
            avatarUrl: user.image
          })
        }
      }
      return true
    }
  }
}) 