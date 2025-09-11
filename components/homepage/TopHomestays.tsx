'use client'

import { useState, useRef } from 'react'

import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { HomestayCard } from '@/components/cards/HomestayCard'
import { Button } from '@/components/ui/button'

const homestays = [
  {
    id: '1',
    name: 'Villa Hồ Tây View Tuyệt Đẹp',
    location: 'Tây Hồ, Hà Nội',
    image: '/homepage/homestays/homestay-1.svg',
    rating: 4.9,
    reviewCount: 234,
    price: 1500000,
    amenities: ['Wi-Fi', 'Bữa sáng', 'Đỗ xe'],
    isPromoted: true,
  },
  {
    id: '2',
    name: 'Homestay Phố Cổ Hà Nội',
    location: 'Hoàn Kiếm, Hà Nội',
    image: '/homepage/homestays/homestay-1.svg',
    rating: 4.7,
    reviewCount: 189,
    price: 800000,
    amenities: ['Wi-Fi', 'Bữa sáng'],
  },
  {
    id: '3',
    name: 'Beach House Đà Nẵng',
    location: 'Mỹ Khê, Đà Nẵng',
    image: '/homepage/homestays/homestay-1.svg',
    rating: 4.8,
    reviewCount: 312,
    price: 2000000,
    amenities: ['Wi-Fi', 'Đỗ xe', 'Bữa sáng'],
    isPromoted: true,
  },
  {
    id: '4',
    name: 'Garden Villa Đà Lạt',
    location: 'Trung tâm, Đà Lạt',
    image: '/homepage/homestays/homestay-1.svg',
    rating: 4.6,
    reviewCount: 156,
    price: 1200000,
    amenities: ['Wi-Fi', 'Đỗ xe'],
  },
  {
    id: '5',
    name: 'Riverside Homestay Hội An',
    location: 'Cẩm An, Hội An',
    image: '/homepage/homestays/homestay-1.svg',
    rating: 4.9,
    reviewCount: 278,
    price: 900000,
    amenities: ['Wi-Fi', 'Bữa sáng', 'Đỗ xe'],
  },
  {
    id: '6',
    name: 'Mountain View Sapa',
    location: 'Trung tâm, Sapa',
    image: '/homepage/homestays/homestay-1.svg',
    rating: 4.7,
    reviewCount: 198,
    price: 700000,
    amenities: ['Wi-Fi', 'Bữa sáng'],
  },
]

export function TopHomestays() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320 // Width of one card
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
      setTimeout(checkScroll, 300)
    }
  }

  return (
    <section className='bg-gray-50 py-16'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='mb-10 flex items-center justify-between'>
          <div>
            <h2 className='mb-2 text-3xl font-bold'>Homestay Nổi Bật</h2>
            <p className='text-muted-foreground'>
              Những homestay được đánh giá cao nhất bởi cộng đồng
            </p>
          </div>
          <Button variant='outline' asChild className='hidden md:flex'>
            <Link href='/homestays'>
              Xem tất cả
              <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>

        {/* Carousel Container */}
        <div className='relative'>
          {/* Navigation Buttons */}
          <Button
            variant='outline'
            size='icon'
            className={`absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white shadow-lg transition-opacity ${
              canScrollLeft ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
            onClick={() => scroll('left')}
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className={`absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white shadow-lg transition-opacity ${
              canScrollRight ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
            onClick={() => scroll('right')}
          >
            <ChevronRight className='h-4 w-4' />
          </Button>

          {/* Homestays Slider */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className='scrollbar-hide flex gap-6 overflow-x-auto scroll-smooth pb-2'
          >
            {homestays.map((homestay) => (
              <div key={homestay.id} className='w-[300px] flex-shrink-0'>
                <HomestayCard {...homestay} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View All Button */}
        <div className='mt-8 text-center md:hidden'>
          <Button variant='outline' asChild>
            <Link href='/homestays'>
              Xem tất cả homestay
              <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
