"use client"

import Image from "next/image"
import Link from "next/link"

import { Bath, Bed, MapPin, Star, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface AccommodationCardProps {
  id: string
  name: string
  type: "HOMESTAY" | "HOSTEL" | "HOTEL" | "APARTMENT"
  slug: string
  description: string
  district: string
  priceDaily: number
  priceMonthly?: number
  amenities: string[]
  images: string[]
  capacity: number
  rooms: number
  bathrooms: number
  featured?: boolean
  rating: number
  reviewCount: number
}

const typeLabels = {
  HOMESTAY: "Homestay",
  HOSTEL: "Hostel",
  HOTEL: "Khách sạn",
  APARTMENT: "Căn hộ",
}

const typeColors = {
  HOMESTAY: "bg-green-100 text-green-800",
  HOSTEL: "bg-blue-100 text-blue-800",
  HOTEL: "bg-purple-100 text-purple-800",
  APARTMENT: "bg-orange-100 text-orange-800",
}

export function AccommodationCard({
  name,
  type,
  slug,
  description,
  district,
  priceDaily,
  priceMonthly,
  amenities,
  images,
  capacity,
  rooms,
  bathrooms,
  featured,
  rating,
  reviewCount,
}: AccommodationCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  return (
    <Card className={`overflow-hidden ${featured ? "ring-2 ring-golden" : ""}`}>
      {/* Image */}
      <div className="relative aspect-video bg-muted">
        {images[0] ? (
          <Image
            src={images[0]}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200" />
        )}
        {featured && (
          <Badge className="absolute right-2 top-2 bg-golden">Nổi bật</Badge>
        )}
        <Badge className={`absolute left-2 top-2 ${typeColors[type]}`}>
          {typeLabels[type]}
        </Badge>
      </div>

      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-1">
            <CardTitle className="line-clamp-1">{name}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {district}, Hà Nội
            </CardDescription>
          </div>
          {reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-golden text-golden" />
              <span className="font-semibold">{rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">
                ({reviewCount})
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Description */}
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {description}
        </p>

        {/* Property info */}
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {capacity}
          </span>
          <span className="flex items-center gap-1">
            <Bed className="h-3 w-3" />
            {rooms}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="h-3 w-3" />
            {bathrooms}
          </span>
        </div>

        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {amenities.slice(0, 3).map((amenity) => (
              <Badge key={amenity} variant="secondary" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {amenities.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{amenities.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Pricing */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-golden">
              {formatPrice(priceDaily)}
            </span>
            <span className="text-sm text-muted-foreground">/ngày</span>
          </div>
          {priceMonthly && (
            <div className="text-sm text-muted-foreground">
              {formatPrice(priceMonthly)}/tháng
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Link href={`/accommodations/${slug}`} className="w-full">
          <Button className="w-full">Xem chi tiết</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
