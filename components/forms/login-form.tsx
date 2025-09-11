'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'
import type { LoginInput } from '@/lib/validations/auth.schema'
import { loginSchema } from '@/lib/validations/auth.schema'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        toast({
          title: 'Lỗi',
          description: 'Email hoặc mật khẩu không đúng',
          variant: 'destructive',
        })
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch {
      toast({
        title: 'Lỗi',
        description: 'Có lỗi xảy ra. Vui lòng thử lại.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthSignIn = (provider: string) => {
    setIsLoading(true)
    signIn(provider, { callbackUrl })
  }

  return (
    <Card className='w-full max-w-md'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl font-bold'>Đăng nhập</CardTitle>
        <CardDescription>
          Nhập thông tin để truy cập tài khoản của bạn
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='ten@example.com'
              {...register('email')}
              disabled={isLoading}
            />
            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email.message}</p>
            )}
          </div>
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <Label htmlFor='password'>Mật khẩu</Label>
              <Link
                href='/forgot-password'
                className='text-sm text-primary hover:underline'
              >
                Quên mật khẩu?
              </Link>
            </div>
            <Input
              id='password'
              type='password'
              {...register('password')}
              disabled={isLoading}
            />
            {errors.password && (
              <p className='text-sm text-red-500'>{errors.password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Đăng nhập
          </Button>

          <div className='relative w-full'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                Hoặc đăng nhập với
              </span>
            </div>
          </div>

          <div className='grid w-full grid-cols-2 gap-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => handleOAuthSignIn('google')}
              disabled={isLoading}
            >
              Google
            </Button>
            <Button
              type='button'
              variant='outline'
              onClick={() => handleOAuthSignIn('github')}
              disabled={isLoading}
            >
              Facebook
            </Button>
          </div>

          <p className='text-center text-sm text-muted-foreground'>
            Chưa có tài khoản?{' '}
            <Link
              href='/register'
              className='font-medium text-primary hover:underline'
            >
              Đăng ký ngay
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
