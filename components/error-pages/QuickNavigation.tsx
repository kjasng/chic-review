import Link from "next/link"

import type { LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

interface QuickNavigationProps {
  pages: {
    icon: LucideIcon
    title: string
    description: string
    href: string
    color?: string
  }[]
}

export function QuickNavigation({ pages }: QuickNavigationProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {pages.map((page, index) => {
        const Icon = page.icon
        return (
          <Link key={index} href={page.href} className="group block">
            <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-golden/50 hover:shadow-lg">
              <CardContent className="p-6">
                <div
                  className={`mb-4 inline-flex rounded-lg bg-golden/10 p-3 transition-colors group-hover:bg-golden/20`}
                >
                  <Icon className={`h-6 w-6 ${page.color || "text-golden"}`} />
                </div>
                <h3 className="mb-2 font-semibold transition-colors group-hover:text-golden">
                  {page.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {page.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
