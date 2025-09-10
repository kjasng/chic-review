'use client'

import { useState } from 'react'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'

export function Header() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Cộng đồng', href: '/community' },
    { name: 'Đánh giá', href: '/reviews' },
    { name: 'Blog', href: '/blog' },
    { name: 'Liên hệ', href: '/contact' },
  ]

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto px-4'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo and Tagline */}
          <div className='flex items-center gap-3'>
            <Link href='/' className='flex items-center gap-2'>
              <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-golden font-bold text-white'>
                CR
              </div>
              <div>
                <h1 className='text-lg font-bold text-foreground'>
                  Chic Review
                </h1>
                <p className='hidden text-xs text-muted-foreground sm:block'>
                  Cộng đồng tri thức sinh viên Việt Nam
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden items-center gap-6 md:flex'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className='hidden items-center gap-3 md:flex'>
            {session ? (
              <>
                <Button variant='outline' asChild>
                  <Link href='/dashboard'>Dashboard</Link>
                </Button>
                <Button
                  variant='default'
                  className='bg-golden hover:bg-golden/90'
                >
                  <Link href='/profile'>
                    {session.user.name || 'Tài khoản'}
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant='outline' asChild>
                  <Link href='/login'>Đăng nhập</Link>
                </Button>
                <Button className='bg-golden hover:bg-golden/90' asChild>
                  <Link href='/register'>Đăng ký</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className='p-2 md:hidden'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className='border-t py-4 md:hidden'>
            <nav className='flex flex-col gap-2'>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className='rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground'
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className='mt-4 flex flex-col gap-2 border-t pt-4'>
              {session ? (
                <>
                  <Button variant='outline' asChild className='w-full'>
                    <Link href='/dashboard'>Dashboard</Link>
                  </Button>
                  <Button
                    className='w-full bg-golden hover:bg-golden/90'
                    asChild
                  >
                    <Link href='/profile'>
                      {session.user.name || 'Tài khoản'}
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant='outline' asChild className='w-full'>
                    <Link href='/login'>Đăng nhập</Link>
                  </Button>
                  <Button
                    className='w-full bg-golden hover:bg-golden/90'
                    asChild
                  >
                    <Link href='/register'>Đăng ký</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
