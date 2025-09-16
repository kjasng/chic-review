"use client"

import Image from "next/image"

import { Book, Coins, Crown, FileText, Video } from "lucide-react"

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

interface RewardCardProps {
  name: string
  description: string
  category: "COURSE" | "EBOOK" | "MATERIAL" | "MEMBERSHIP"
  pointsCost: number
  image?: string
  available: boolean
  stock: number
  onRedeem?: () => void
  userPoints?: number
}

const categoryIcons = {
  COURSE: Video,
  EBOOK: Book,
  MATERIAL: FileText,
  MEMBERSHIP: Crown,
}

const categoryLabels = {
  COURSE: "Khóa học",
  EBOOK: "Sách điện tử",
  MATERIAL: "Tài liệu",
  MEMBERSHIP: "Thành viên",
}

export function RewardCard({
  name,
  description,
  category,
  pointsCost,
  image,
  available,
  stock,
  onRedeem,
  userPoints = 0,
}: RewardCardProps) {
  const Icon = categoryIcons[category]
  const canRedeem = available && stock > 0 && userPoints >= pointsCost

  return (
    <Card className="overflow-hidden">
      {image ? (
        <div className="relative aspect-video bg-muted">
          <Image
            src={image}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-golden/10 to-golden/5">
          <Icon className="h-12 w-12 text-golden/50" />
        </div>
      )}

      <CardHeader>
        <div className="flex items-start justify-between">
          <Badge variant="secondary" className="mb-2">
            {categoryLabels[category]}
          </Badge>
          {stock <= 5 && stock > 0 && (
            <Badge variant="destructive" className="text-xs">
              Còn {stock}
            </Badge>
          )}
        </div>
        <CardTitle className="line-clamp-2">{name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-golden" />
          <span className="text-2xl font-bold">
            {pointsCost.toLocaleString()}
          </span>
          <span className="text-muted-foreground">điểm</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          disabled={!canRedeem}
          onClick={onRedeem}
          variant={canRedeem ? "default" : "secondary"}
        >
          {!available
            ? "Không khả dụng"
            : stock === 0
              ? "Hết hàng"
              : userPoints < pointsCost
                ? `Cần ${(pointsCost - userPoints).toLocaleString()} điểm nữa`
                : "Đổi ngay"}
        </Button>
      </CardFooter>
    </Card>
  )
}
