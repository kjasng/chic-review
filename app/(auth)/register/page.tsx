import type { Metadata } from "next"

import { RegisterForm } from "@/components/forms/register-form"

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
}

// Force dynamic rendering to prevent auth-related prerendering errors
export const dynamic = "force-dynamic"

export default function RegisterPage() {
  return <RegisterForm />
}
