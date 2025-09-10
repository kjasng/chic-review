import { ArrowRight, Users, BookOpen, Star } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-b from-golden/10 to-background py-16 md:py-24'>
      {/* Background Pattern */}
      <div className='bg-grid-pattern absolute inset-0 opacity-5' />

      <div className='container relative mx-auto px-4'>
        <div className='mx-auto max-w-4xl text-center'>
          {/* Main Headline */}
          <h1 className='mb-6 text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl'>
            Kết nối, Chia sẻ, Phát triển
            <span className='mt-2 block text-golden'>cùng Chic Review</span>
          </h1>

          {/* Subtitle */}
          <p className='mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl'>
            Nền tảng đánh giá và chia sẻ kinh nghiệm học tập, cuộc sống của sinh
            viên Việt Nam. Tìm kiếm thông tin trường học, giảng viên, và kết nối
            với cộng đồng sinh viên.
          </p>

          {/* CTA Buttons */}
          <div className='mb-12 flex flex-col justify-center gap-4 sm:flex-row'>
            <Button
              size='lg'
              className='bg-golden text-white hover:bg-golden/90'
              asChild
            >
              <Link href='/register'>
                Tham gia ngay
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
            <Button size='lg' variant='outline' asChild>
              <Link href='/community'>Khám phá cộng đồng</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className='mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8'>
            <div className='text-center'>
              <div className='mb-2 flex justify-center'>
                <Users className='h-8 w-8 text-golden' />
              </div>
              <div className='text-2xl font-bold md:text-3xl'>10,000+</div>
              <div className='text-sm text-muted-foreground'>
                Sinh viên tham gia
              </div>
            </div>
            <div className='text-center'>
              <div className='mb-2 flex justify-center'>
                <BookOpen className='h-8 w-8 text-golden' />
              </div>
              <div className='text-2xl font-bold md:text-3xl'>500+</div>
              <div className='text-sm text-muted-foreground'>
                Trường đại học
              </div>
            </div>
            <div className='text-center'>
              <div className='mb-2 flex justify-center'>
                <Star className='h-8 w-8 text-golden' />
              </div>
              <div className='text-2xl font-bold md:text-3xl'>50,000+</div>
              <div className='text-sm text-muted-foreground'>
                Đánh giá chất lượng
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
