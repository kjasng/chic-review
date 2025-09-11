import Image from "next/image"
import Link from "next/link"

import { Car, Coffee, MapPin, Star, Wifi } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface HomestayCardProps {
  id: string
  name: string
  location: string
  image: string
  rating: number
  reviewCount: number
  price: number
  amenities?: string[]
  isPromoted?: boolean
}

const amenityIcons: Record<string, React.ReactNode> = {
  "Wi-Fi": <Wifi className="h-3 w-3" />,
  "Bữa sáng": <Coffee className="h-3 w-3" />,
  "Đỗ xe": <Car className="h-3 w-3" />,
}

export function HomestayCard({
  id,
  name,
  location,
  image,
  rating,
  reviewCount,
  price,
  amenities = [],
  isPromoted = false,
}: HomestayCardProps) {
  return (
    <Link href={`/homestays/${id}`}>
      <Card className="group cursor-pointer overflow-hidden transition-shadow hover:shadow-xl">
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform group-hover:scale-110"
          />
          {isPromoted && (
            <Badge className="absolute left-3 top-3 bg-golden text-white">
              Nổi bật
            </Badge>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <p className="text-lg font-bold text-white">
              {price.toLocaleString("vi-VN")}₫
              <span className="text-sm font-normal">/đêm</span>
            </p>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="mb-1 line-clamp-1 text-lg font-semibold">{name}</h3>
          <div className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {location}
          </div>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-golden text-golden" />
              <span className="font-semibold">{rating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({reviewCount} đánh giá)
            </span>
          </div>
          {amenities.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {amenities.slice(0, 3).map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-1 text-xs text-muted-foreground"
                >
                  {amenityIcons[amenity] || null}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
