import { Facebook, Linkedin, Youtube, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: process.env.NEXT_PUBLIC_FACEBOOK_URL || '#',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: process.env.NEXT_PUBLIC_LINKEDIN_URL || '#',
    },
    {
      name: 'YouTube',
      icon: Youtube,
      href: process.env.NEXT_PUBLIC_YOUTUBE_URL || '#',
    },
  ]

  const footerLinks = {
    'Về chúng tôi': [
      { name: 'Giới thiệu', href: '/about' },
      { name: 'Sứ mệnh', href: '/mission' },
      { name: 'Đội ngũ', href: '/team' },
      { name: 'Liên hệ', href: '/contact' },
    ],
    'Dịch vụ': [
      { name: 'Đánh giá trường', href: '/schools' },
      { name: 'Đánh giá giảng viên', href: '/professors' },
      { name: 'Chia sẻ tài liệu', href: '/resources' },
      { name: 'Hỏi đáp', href: '/qa' },
    ],
    'Hỗ trợ': [
      { name: 'Hướng dẫn sử dụng', href: '/guide' },
      { name: 'Câu hỏi thường gặp', href: '/faq' },
      { name: 'Điều khoản sử dụng', href: '/terms' },
      { name: 'Chính sách bảo mật', href: '/privacy' },
    ],
  }

  return (
    <footer className='border-t bg-background'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5'>
          {/* Brand Section */}
          <div className='lg:col-span-2'>
            <div className='mb-4 flex items-center gap-2'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-golden font-bold text-white'>
                CR
              </div>
              <div>
                <h3 className='text-xl font-bold'>Chic Review</h3>
                <p className='text-sm text-muted-foreground'>
                  Cộng đồng tri thức sinh viên
                </p>
              </div>
            </div>
            <p className='mb-4 text-sm text-muted-foreground'>
              Nền tảng đánh giá và chia sẻ kinh nghiệm học tập hàng đầu dành cho
              sinh viên Việt Nam.
            </p>

            {/* Social Links */}
            <div className='flex gap-3'>
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors hover:bg-golden hover:text-white'
                    aria-label={social.name}
                  >
                    <Icon className='h-5 w-5' />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className='mb-4 font-semibold'>{category}</h4>
              <ul className='space-y-2'>
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className='text-sm text-muted-foreground transition-colors hover:text-foreground'
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className='mt-8 border-t pt-8'>
          <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-3'>
            <div className='flex items-center gap-3'>
              <Mail className='h-5 w-5 text-golden' />
              <span className='text-sm text-muted-foreground'>
                contact@chicreview.vn
              </span>
            </div>
            <div className='flex items-center gap-3'>
              <Phone className='h-5 w-5 text-golden' />
              <span className='text-sm text-muted-foreground'>
                (+84) 123 456 789
              </span>
            </div>
            <div className='flex items-center gap-3'>
              <MapPin className='h-5 w-5 text-golden' />
              <span className='text-sm text-muted-foreground'>
                Hà Nội, Việt Nam
              </span>
            </div>
          </div>

          {/* Copyright */}
          <div className='text-center text-sm text-muted-foreground'>
            <p>© 2025 Chic Review. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
