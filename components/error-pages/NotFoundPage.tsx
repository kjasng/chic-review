'use client'

import { useState, useEffect } from 'react'

import {
  ArrowLeft,
  Home,
  Search,
  Users,
  BookOpen,
  HelpCircle,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { ErrorIllustration } from './ErrorIllustration'
import { QuickNavigation } from './QuickNavigation'

export function NotFoundPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Animate content entrance
    const timer = setTimeout(() => setShowContent(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const popularPages = [
    {
      icon: Home,
      title: 'Trang chủ',
      description: 'Khám phá điểm đến & homestay',
      href: '/',
      color: 'text-golden',
    },
    {
      icon: Users,
      title: 'Điểm đến',
      description: 'Khám phá địa điểm du lịch',
      href: '/destinations',
      color: 'text-blue-500',
    },
    {
      icon: BookOpen,
      title: 'Đánh giá',
      description: 'Xem đánh giá du lịch',
      href: '/reviews',
      color: 'text-green-500',
    },
    {
      icon: HelpCircle,
      title: 'Hỗ trợ',
      description: 'Liên hệ với chúng tôi',
      href: '/contact',
      color: 'text-purple-500',
    },
  ]

  return (
    <div
      className={`min-h-[60vh] px-4 py-12 transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className='container mx-auto max-w-6xl'>
        {/* Error Illustration and Message */}
        <div className='mb-12 text-center'>
          <ErrorIllustration />

          <h1 className='mb-4 text-4xl font-bold text-foreground md:text-5xl'>
            Oops! Trang này đã{' '}
            <span className='text-golden'>&quot;lạc đường&quot;</span> rồi! 🧭
          </h1>

          <p className='mx-auto mb-8 max-w-2xl text-lg text-muted-foreground'>
            Có vẻ như trang bạn đang tìm không tồn tại hoặc đã được chuyển đi
            nơi khác. Đừng lo, hãy cùng chúng mình tìm những thông tin hữu ích
            khác nhé!
          </p>

          {/* Primary Actions */}
          <div className='mb-8 flex flex-col justify-center gap-4 sm:flex-row'>
            <Button
              size='lg'
              onClick={() => router.back()}
              variant='outline'
              className='group'
            >
              <ArrowLeft className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1' />
              Quay lại trang trước
            </Button>
            <Button
              size='lg'
              className='bg-golden text-white hover:bg-golden/90'
              asChild
            >
              <Link href='/'>
                <Home className='mr-2 h-4 w-4' />
                Về trang chủ
              </Link>
            </Button>
          </div>

          {/* Search Box */}
          <div className='mx-auto max-w-md'>
            <form onSubmit={handleSearch} className='relative'>
              <Input
                type='text'
                placeholder='Tìm kiếm nội dung...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pr-10'
              />
              <Button
                type='submit'
                size='sm'
                className='absolute right-1 top-1 h-8 w-8 p-0'
                variant='ghost'
              >
                <Search className='h-4 w-4' />
              </Button>
            </form>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className='mb-12'>
          <h2 className='mb-8 text-center text-2xl font-bold'>
            Có thể bạn đang tìm kiếm:
          </h2>
          <QuickNavigation pages={popularPages} />
        </div>

        {/* Helpful Content Suggestions */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          <Card className='transition-shadow hover:shadow-lg'>
            <CardHeader>
              <CardTitle className='text-lg'>✈️ Mới khám phá?</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className='mb-4'>
                Khám phá hướng dẫn sử dụng và cách tìm kiếm điểm đến, homestay
                phù hợp
              </CardDescription>
              <Link
                href='/guide'
                className='text-sm text-golden hover:underline'
              >
                Xem hướng dẫn →
              </Link>
            </CardContent>
          </Card>

          <Card className='transition-shadow hover:shadow-lg'>
            <CardHeader>
              <CardTitle className='text-lg'>💬 Cần hỗ trợ?</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className='mb-4'>
                Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn
              </CardDescription>
              <Link
                href='/contact'
                className='text-sm text-golden hover:underline'
              >
                Liên hệ ngay →
              </Link>
            </CardContent>
          </Card>

          <Card className='transition-shadow hover:shadow-lg'>
            <CardHeader>
              <CardTitle className='text-lg'>📢 Báo lỗi</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className='mb-4'>
                Giúp chúng tôi cải thiện bằng cách báo cáo lỗi này
              </CardDescription>
              <Link
                href='/contact'
                className='text-sm text-golden hover:underline'
              >
                Báo cáo lỗi →
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Motivational Quote */}
        <div className='mt-12 rounded-lg bg-golden/10 p-6 text-center'>
          <p className='text-lg italic text-foreground'>
            &quot;Lạc đường đôi khi lại giúp ta khám phá những điểm đến tuyệt
            vời hơn!&quot;
          </p>
          <p className='mt-2 text-sm text-muted-foreground'>
            - Cộng đồng du lịch Chic Review -
          </p>
        </div>
      </div>
    </div>
  )
}
