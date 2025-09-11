"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"

import { CalendarIcon, MapPin, Search, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function SearchBar() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(2)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams({
      location,
      checkIn,
      checkOut,
      guests: guests.toString(),
    })
    router.push(`/search?${params.toString()}`)
  }

  const popularLocations = [
    "Hà Nội",
    "TP.HCM",
    "Đà Nẵng",
    "Nha Trang",
    "Phú Quốc",
    "Đà Lạt",
    "Hội An",
    "Sapa",
  ]

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full flex-col gap-3 rounded-lg bg-white p-4 shadow-lg md:flex-row md:items-end"
    >
      {/* Location Input */}
      <div className="flex-1">
        <Label htmlFor="location" className="mb-2 flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          Điểm đến
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Input
              id="location"
              type="text"
              placeholder="Bạn muốn đi đâu?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full"
            />
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-2">
              <h4 className="font-medium">Điểm đến phổ biến</h4>
              <div className="grid grid-cols-2 gap-2">
                {popularLocations.map((loc) => (
                  <Button
                    key={loc}
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => setLocation(loc)}
                  >
                    {loc}
                  </Button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Check-in Date */}
      <div className="flex-1">
        <Label htmlFor="checkin" className="mb-2 flex items-center gap-1">
          <CalendarIcon className="h-4 w-4" />
          Ngày nhận phòng
        </Label>
        <Input
          id="checkin"
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Check-out Date */}
      <div className="flex-1">
        <Label htmlFor="checkout" className="mb-2 flex items-center gap-1">
          <CalendarIcon className="h-4 w-4" />
          Ngày trả phòng
        </Label>
        <Input
          id="checkout"
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          min={checkIn}
          className="w-full"
        />
      </div>

      {/* Guests */}
      <div className="w-full md:w-32">
        <Label htmlFor="guests" className="mb-2 flex items-center gap-1">
          <Users className="h-4 w-4" />
          Số khách
        </Label>
        <Input
          id="guests"
          type="number"
          min="1"
          max="20"
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
          className="w-full"
        />
      </div>

      {/* Search Button */}
      <Button
        type="submit"
        className="w-full bg-golden hover:bg-golden/90 md:w-auto"
      >
        <Search className="mr-2 h-4 w-4" />
        Tìm kiếm
      </Button>
    </form>
  )
}
