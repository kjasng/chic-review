import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { DestinationCard } from '@/components/cards/DestinationCard'
import { Button } from '@/components/ui/button'

const destinations = [
  {
    name: 'Hà Nội',
    province: 'Thủ đô',
    image: '/homepage/destinations/hanoi.svg',
    rating: 4.7,
    reviewCount: 3542,
    activities: ['Phố cổ', 'Ẩm thực', 'Văn hóa'],
    slug: 'ha-noi',
  },
  {
    name: 'TP. Hồ Chí Minh',
    province: 'Miền Nam',
    image: '/homepage/destinations/hochiminh.svg',
    rating: 4.5,
    reviewCount: 4128,
    activities: ['Mua sắm', 'Ẩm thực', 'Giải trí'],
    slug: 'tp-ho-chi-minh',
  },
  {
    name: 'Đà Nẵng',
    province: 'Miền Trung',
    image: '/homepage/destinations/danang.svg',
    rating: 4.8,
    reviewCount: 2987,
    activities: ['Biển', 'Cầu Vàng', 'Resort'],
    slug: 'da-nang',
  },
  {
    name: 'Đà Lạt',
    province: 'Lâm Đồng',
    image: '/homepage/destinations/dalat.svg',
    rating: 4.6,
    reviewCount: 2456,
    activities: ['Thiên nhiên', 'Cà phê', 'Chợ đêm'],
    slug: 'da-lat',
  },
  {
    name: 'Nha Trang',
    province: 'Khánh Hòa',
    image: '/homepage/destinations/hanoi.svg',
    rating: 4.5,
    reviewCount: 2103,
    activities: ['Biển', 'Lặn biển', 'Hải sản'],
    slug: 'nha-trang',
  },
  {
    name: 'Phú Quốc',
    province: 'Kiên Giang',
    image: '/homepage/destinations/hochiminh.svg',
    rating: 4.7,
    reviewCount: 1876,
    activities: ['Biển', 'Resort', 'Câu cá'],
    slug: 'phu-quoc',
  },
  {
    name: 'Hội An',
    province: 'Quảng Nam',
    image: '/homepage/destinations/danang.svg',
    rating: 4.9,
    reviewCount: 3214,
    activities: ['Phố cổ', 'Đèn lồng', 'May đo'],
    slug: 'hoi-an',
  },
  {
    name: 'Sapa',
    province: 'Lào Cai',
    image: '/homepage/destinations/dalat.svg',
    rating: 4.6,
    reviewCount: 1543,
    activities: ['Trekking', 'Ruộng bậc thang', 'Văn hóa'],
    slug: 'sapa',
  },
]

export function PopularDestinations() {
  return (
    <section className='py-16'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='mb-10 flex items-center justify-between'>
          <div>
            <h2 className='mb-2 text-3xl font-bold'>Điểm Đến Phổ Biến</h2>
            <p className='text-muted-foreground'>
              Khám phá những địa điểm du lịch được yêu thích nhất Việt Nam
            </p>
          </div>
          <Button variant='outline' asChild className='hidden md:flex'>
            <Link href='/destinations'>
              Xem tất cả
              <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>

        {/* Destinations Grid */}
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {destinations.map((destination) => (
            <DestinationCard key={destination.slug} {...destination} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className='mt-8 text-center md:hidden'>
          <Button variant='outline' asChild>
            <Link href='/destinations'>
              Xem tất cả điểm đến
              <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
