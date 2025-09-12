import { Suspense } from "react"

import type { Metadata } from "next"

import { LoginForm } from "@/components/forms/login-form"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

// Force dynamic rendering to prevent auth-related prerendering errors
export const dynamic = "force-dynamic"

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
