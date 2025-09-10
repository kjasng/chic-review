import { NotFoundPage } from '@/components/error-pages/NotFoundPage'
import { Footer } from '@/components/homepage/Footer'
import { Header } from '@/components/homepage/Header'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trang không tồn tại - Chic Review | Cộng đồng sinh viên Việt Nam',
  description:
    'Trang bạn tìm kiếm không tồn tại. Khám phá cộng đồng sinh viên, đánh giá trường học và chia sẻ kinh nghiệm học tập tại Chic Review.',
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
