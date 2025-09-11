import Image from 'next/image'

import { SearchBar } from '@/components/search/SearchBar'

export function Hero() {
  return (
    <section className='relative min-h-[600px] w-full overflow-hidden'>
      {/* Background Image */}
      <div className='absolute inset-0'>
        <Image
          src='/homepage/hero/vietnam-banner.svg'
          alt='Vietnam Travel'
          fill
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40' />
      </div>

      {/* Content */}
      <div className='relative z-10 flex min-h-[600px] flex-col items-center justify-center px-4 py-20 text-center'>
        <div className='mb-8 max-w-4xl'>
          <h1 className='mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl'>
            Khám Phá Điểm Đến & Homestay{' '}
            <span className='text-golden'>Tuyệt Vời</span> Tại Việt Nam
          </h1>
          <p className='mb-2 text-lg text-white/90 md:text-xl'>
            Đánh giá thật từ cộng đồng du lịch Việt
          </p>
          <p className='text-base text-white/80 md:text-lg'>
            Tìm kiếm trải nghiệm du lịch hoàn hảo với hàng nghìn review chân
            thực
          </p>
        </div>

        {/* Search Bar */}
        <div className='w-full max-w-5xl px-4'>
          <SearchBar />
        </div>

        {/* Stats */}
        <div className='mt-12 grid grid-cols-3 gap-8 text-white md:gap-16'>
          <div>
            <p className='text-2xl font-bold md:text-3xl'>1000+</p>
            <p className='text-sm opacity-90'>Điểm đến</p>
          </div>
          <div>
            <p className='text-2xl font-bold md:text-3xl'>5000+</p>
            <p className='text-sm opacity-90'>Homestay</p>
          </div>
          <div>
            <p className='text-2xl font-bold md:text-3xl'>10K+</p>
            <p className='text-sm opacity-90'>Đánh giá</p>
          </div>
        </div>
      </div>

      {/* Wave Decoration */}
      <div className='absolute bottom-0 left-0 right-0'>
        <svg
          viewBox='0 0 1440 120'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='w-full'
        >
          <path
            d='M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z'
            fill='white'
          />
        </svg>
      </div>
    </section>
  )
}
