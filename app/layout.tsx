import { Inter } from 'next/font/google'

import { Providers } from './providers'

import type { Metadata } from 'next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Chic Review - Cộng đồng tri thức sinh viên Việt Nam',
  description:
    'Nền tảng đánh giá và chia sẻ kinh nghiệm học tập, cuộc sống của sinh viên Việt Nam. Kết nối cộng đồng, chia sẻ tri thức, phát triển bản thân.',
  keywords: [
    'đánh giá trường đại học',
    'sinh viên việt nam',
    'chia sẻ kinh nghiệm học tập',
    'cộng đồng sinh viên',
    'review giảng viên',
    'tài liệu học tập',
    'chic review',
  ],
  authors: [{ name: 'Chic Review Team' }],
  creator: 'Chic Review',
  publisher: 'Chic Review',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://chicreview.vn',
    siteName: 'Chic Review',
    title: 'Chic Review - Cộng đồng tri thức sinh viên Việt Nam',
    description:
      'Nền tảng đánh giá và chia sẻ kinh nghiệm học tập dành cho sinh viên Việt Nam',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Chic Review - Cộng đồng sinh viên Việt Nam',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chic Review - Cộng đồng tri thức sinh viên',
    description: 'Nền tảng đánh giá và chia sẻ kinh nghiệm học tập',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='vi'>
      <body className={`${inter.className} ${inter.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
