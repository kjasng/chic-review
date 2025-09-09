import { RegisterForm } from '@/components/forms/register-form'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create a new account',
}

export default function RegisterPage() {
  return <RegisterForm />
}
