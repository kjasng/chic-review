'use client'

import { useState } from 'react'

import { Star, ThumbsUp, MapPin, Calendar } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ReviewCardProps {
  userName: string
  userAvatar?: string
  rating: number
  date: string
  location: string
  title: string
  content: string
  helpfulCount?: number
  verified?: boolean
  images?: string[]
}

export function ReviewCard({
  userName,
  userAvatar,
  rating,
  date,
  location,
  title,
  content,
  helpfulCount = 0,
  verified = false,
  images = [],
}: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [helpful, setHelpful] = useState(helpfulCount)
  const [hasVoted, setHasVoted] = useState(false)

  const handleHelpful = () => {
    if (!hasVoted) {
      setHelpful(helpful + 1)
      setHasVoted(true)
    }
  }

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-golden text-golden' : 'fill-gray-200 text-gray-200'
        }`}
      />
    ))
  }

  return (
    <Card className='overflow-hidden'>
      <CardContent className='p-4'>
        {/* User Info */}
        <div className='mb-3 flex items-start justify-between'>
          <div className='flex gap-3'>
            <Avatar>
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback>{userName[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <div className='flex items-center gap-2'>
                <h4 className='font-semibold'>{userName}</h4>
                {verified && (
                  <Badge variant='secondary' className='text-xs'>
                    Đã xác thực
                  </Badge>
                )}
              </div>
              <div className='flex items-center gap-3 text-xs text-muted-foreground'>
                <span className='flex items-center gap-1'>
                  <Calendar className='h-3 w-3' />
                  {date}
                </span>
                <span className='flex items-center gap-1'>
                  <MapPin className='h-3 w-3' />
                  {location}
                </span>
              </div>
            </div>
          </div>
          <div className='flex'>{renderStars()}</div>
        </div>

        {/* Review Content */}
        <div className='mb-3'>
          <h5 className='mb-2 font-semibold'>{title}</h5>
          <p
            className={`text-sm text-muted-foreground ${
              !isExpanded ? 'line-clamp-3' : ''
            }`}
          >
            {content}
          </p>
          {content.length > 200 && (
            <Button
              variant='link'
              size='sm'
              className='h-auto p-0 text-golden'
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Thu gọn' : 'Xem thêm'}
            </Button>
          )}
        </div>

        {/* Images */}
        {images.length > 0 && (
          <div className='mb-3 flex gap-2 overflow-x-auto'>
            {images.map((image, index) => (
              <div
                key={index}
                className='h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100'
              >
                <img
                  src={image}
                  alt={`Review ${index + 1}`}
                  className='h-full w-full object-cover'
                />
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className='flex items-center gap-4 border-t pt-3'>
          <Button
            variant='ghost'
            size='sm'
            onClick={handleHelpful}
            disabled={hasVoted}
            className='text-xs'
          >
            <ThumbsUp
              className={`mr-1 h-3 w-3 ${hasVoted ? 'fill-golden' : ''}`}
            />
            Hữu ích ({helpful})
          </Button>
          <Button variant='ghost' size='sm' className='text-xs'>
            Báo cáo
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
