import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    role: "USER" | "ADMIN"
    points: number
  }

  interface Session {
    user: {
      id: string
      role: "USER" | "ADMIN"
      points: number
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: "USER" | "ADMIN"
    points: number
  }
}
