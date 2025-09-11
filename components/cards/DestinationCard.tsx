import Image from "next/image"
import Link from "next/link"

import { Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface DestinationCardProps {
  name: string
  province?: string
  image: string
  rating: number
  reviewCount: number
  activities?: string[]
  slug: string
}

export function DestinationCard({
  name,
  province,
  image,
  rating,
  reviewCount,
  activities = [],
  slug,
}: DestinationCardProps) {
  return (
    <Link href={`/destinations/${slug}`}>
      <Card className="group cursor-pointer overflow-hidden transition-shadow hover:shadow-xl">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 text-white">
            <h3 className="text-xl font-bold">{name}</h3>
            {province && <p className="text-sm opacity-90">{province}</p>}
          </div>
        </div>
        <CardContent className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-golden text-golden" />
              <span className="font-semibold">{rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">
                ({reviewCount.toLocaleString("vi-VN")} đánh giá)
              </span>
            </div>
          </div>
          {activities.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {activities.slice(0, 3).map((activity) => (
                <Badge key={activity} variant="secondary" className="text-xs">
                  {activity}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
