import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"

import { prisma } from "@/lib/db/prisma"

import { authConfig } from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  session: { strategy: "jwt" },
  ...authConfig,
})
