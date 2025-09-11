'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'
import type { RegisterInput } from '@/lib/validations/auth.schema'
import { registerSchema } from '@/lib/validations/auth.schema'

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterInput) => {
    if (!agreedToTerms) {
      toast({
        title: 'Lỗi',
        description: 'Bạn cần đồng ý với điều khoản sử dụng',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Đăng ký thất bại')
      }

      toast({
        title: 'Thành công',
        description: 'Tạo tài khoản thành công! Vui lòng đăng nhập.',
      })

      router.push('/login')
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: error instanceof Error ? error.message : 'Có lỗi xảy ra',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className='w-full max-w-md'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl font-bold'>Đăng ký tài khoản</CardTitle>
        <CardDescription>Nhập thông tin để tạo tài khoản mới</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Họ và tên</Label>
            <Input
              id='name'
              placeholder='Nguyễn Văn A'
              {...register('name')}
              disabled={isLoading}
            />
            {errors.name && (
              <p className='text-sm text-red-500'>{errors.name.message}</p>
            )}
          </div>
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
            <Label htmlFor='password'>Mật khẩu</Label>
            <Input
              id='password'
              type='password'
              placeholder='Ít nhất 8 ký tự'
              {...register('password')}
              disabled={isLoading}
            />
            {errors.password && (
              <p className='text-sm text-red-500'>{errors.password.message}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>Xác nhận mật khẩu</Label>
            <Input
              id='confirmPassword'
              type='password'
              placeholder='Nhập lại mật khẩu'
              {...register('confirmPassword')}
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <p className='text-sm text-red-500'>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className='flex items-start space-x-2'>
            <Checkbox
              id='terms'
              checked={agreedToTerms}
              onCheckedChange={(checked) =>
                setAgreedToTerms(checked as boolean)
              }
              disabled={isLoading}
            />
            <div className='grid gap-1.5 leading-none'>
              <label
                htmlFor='terms'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Tôi đồng ý với{' '}
                <Link href='/terms' className='text-primary hover:underline'>
                  điều khoản sử dụng
                </Link>{' '}
                và{' '}
                <Link href='/privacy' className='text-primary hover:underline'>
                  chính sách bảo mật
                </Link>
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <Button
            type='submit'
            className='w-full'
            disabled={isLoading || !agreedToTerms}
          >
            {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Đăng ký
          </Button>

          <div className='relative w-full'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                Hoặc đăng ký với
              </span>
            </div>
          </div>

          <div className='grid w-full grid-cols-2 gap-4'>
            <Button type='button' variant='outline' disabled={isLoading}>
              Google
            </Button>
            <Button type='button' variant='outline' disabled={isLoading}>
              Facebook
            </Button>
          </div>

          <p className='text-center text-sm text-muted-foreground'>
            Đã có tài khoản?{' '}
            <Link
              href='/login'
              className='font-medium text-primary hover:underline'
            >
              Đăng nhập
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
