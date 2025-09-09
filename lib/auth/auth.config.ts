import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { loginSchema } from '@/lib/validations/auth.schema'
import { getUserByEmail } from '@/lib/db/queries'

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials)

        if (!validatedFields.success) {
          return null
        }

        const { email, password } = validatedFields.data
        const user = await getUserByEmail(email)

        if (!user || !user.password) {
          return null
        }

        const passwordsMatch = await compare(password, user.password)

        if (passwordsMatch) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/auth/error',
    verifyRequest: '/auth/verify',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      const isOnProfile = nextUrl.pathname.startsWith('/profile')
      const isOnSettings = nextUrl.pathname.startsWith('/settings')
      const isProtected = isOnDashboard || isOnProfile || isOnSettings

      if (isProtected) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      }

      return true
    },
    jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
        }
      }
      return token
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
}
