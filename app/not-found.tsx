import { NotFoundPage } from '@/components/error-pages/NotFoundPage'
import { Footer } from '@/components/homepage/Footer'
import { Header } from '@/components/homepage/Header'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trang không tồn tại - Chic Review | Cộng đồng du lịch Việt Nam',
  description:
    'Trang bạn tìm kiếm không tồn tại. Khám phá điểm đến, homestay và đánh giá du lịch chân thực tại Chic Review.',
  robots: 'noindex, follow',
}

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex-grow'>
        <NotFoundPage />
      </main>
      <Footer />
    </div>
  )
}
