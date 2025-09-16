"use client"

import { Coins, TrendingUp } from "lucide-react"

import { Card } from "@/components/ui/card"

interface PointsDisplayProps {
  points: number
  totalEarned?: number
  className?: string
}

export function PointsDisplay({
  points,
  totalEarned,
  className,
}: PointsDisplayProps) {
  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">
            Điểm hiện tại
          </p>
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-golden" />
            <span className="text-2xl font-bold">
              {points.toLocaleString()}
            </span>
          </div>
        </div>
        {totalEarned !== undefined && (
          <div className="space-y-1 text-right">
            <p className="text-xs text-muted-foreground">Tổng kiếm được</p>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">
                +{totalEarned.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
