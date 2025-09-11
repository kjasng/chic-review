import Image from "next/image"
import Link from "next/link"

import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
} from "lucide-react"

export function Footer() {
  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href:
        process.env.NEXT_PUBLIC_FACEBOOK_URL ||
        "https://facebook.com/chicreview",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href:
        process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
        "https://instagram.com/chicreview",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href:
        process.env.NEXT_PUBLIC_YOUTUBE_URL ||
        "https://youtube.com/@chicreview",
    },
    {
      name: "Zalo",
      icon: MessageCircle,
      href: process.env.NEXT_PUBLIC_ZALO_URL || "https://zalo.me/chicreview",
    },
  ]

  const footerLinks = {
    "Khám phá": [
      { name: "Điểm đến phổ biến", href: "/destinations" },
      { name: "Homestay nổi bật", href: "/homestays" },
      { name: "Đánh giá mới nhất", href: "/reviews" },
      { name: "Blog du lịch", href: "/blog" },
    ],
    "Dịch vụ": [
      { name: "Viết đánh giá", href: "/reviews/create" },
      { name: "Đăng ký homestay", href: "/homestays/register" },
      { name: "Quảng cáo", href: "/advertise" },
      { name: "Hợp tác", href: "/partnership" },
    ],
    "Hỗ trợ": [
      { name: "Hướng dẫn sử dụng", href: "/guide" },
      { name: "Câu hỏi thường gặp", href: "/faq" },
      { name: "Điều khoản sử dụng", href: "/terms" },
      { name: "Chính sách bảo mật", href: "/privacy" },
    ],
  }

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Chic Review"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <div>
                <h3 className="text-xl font-bold">Chic Review</h3>
                <p className="text-sm text-muted-foreground">
                  Cộng đồng du lịch Việt Nam
                </p>
              </div>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Nền tảng đánh giá du lịch và homestay hàng đầu Việt Nam. Khám phá
              trải nghiệm thật từ cộng đồng du lịch.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors hover:bg-golden hover:text-white"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 font-semibold">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
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
        <div className="mt-8 border-t pt-8">
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-golden" />
              <span className="text-sm text-muted-foreground">
                hello@chicreview.vn
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-golden" />
              <span className="text-sm text-muted-foreground">1900 1234</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-golden" />
              <span className="text-sm text-muted-foreground">
                Hà Nội, Việt Nam
              </span>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 Chic Review. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
