"use client"

import { useState } from "react"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Menu, Search, X } from "lucide-react"
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"

export function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const navigation = [
    { name: "Trang chủ", href: "/" },
    { name: "Điểm đến", href: "/destinations" },
    { name: "Homestay", href: "/homestays" },
    { name: "Đánh giá", href: "/reviews" },
    { name: "Blog", href: "/blog" },
    { name: "Liên hệ", href: "/contact" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Tagline */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Chic Review"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  Chic Review
                </h1>
                <p className="hidden text-xs text-muted-foreground sm:block">
                  Cộng đồng du lịch Việt Nam
                </p>
              </div>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden max-w-md flex-1 px-8 lg:flex"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm điểm đến, homestay..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border bg-gray-50 px-4 py-2 pr-10 text-sm focus:border-golden focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-golden p-1.5 text-white hover:bg-golden/90"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            {session ? (
              <>
                <Button variant="outline" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button
                  variant="default"
                  className="bg-golden hover:bg-golden/90"
                >
                  <Link href="/profile">
                    {session.user.name || "Tài khoản"}
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">Đăng nhập</Link>
                </Button>
                <Button className="bg-golden hover:bg-golden/90" asChild>
                  <Link href="/register">Đăng ký</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="p-2 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t py-4 md:hidden">
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-2 border-t pt-4">
              {session ? (
                <>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button
                    className="w-full bg-golden hover:bg-golden/90"
                    asChild
                  >
                    <Link href="/profile">
                      {session.user.name || "Tài khoản"}
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/login">Đăng nhập</Link>
                  </Button>
                  <Button
                    className="w-full bg-golden hover:bg-golden/90"
                    asChild
                  >
                    <Link href="/register">Đăng ký</Link>
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
