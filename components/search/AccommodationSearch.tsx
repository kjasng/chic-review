"use client"

import { useState } from "react"

import { DollarSign, Filter, MapPin, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const districts = [
  "Ba Đình",
  "Hoàn Kiếm",
  "Tây Hồ",
  "Long Biên",
  "Cầu Giấy",
  "Đống Đa",
  "Hai Bà Trưng",
  "Hoàng Mai",
  "Thanh Xuân",
  "Nam Từ Liêm",
  "Bắc Từ Liêm",
  "Hà Đông",
]

const amenities = [
  { id: "wifi", label: "WiFi" },
  { id: "ac", label: "Điều hòa" },
  { id: "kitchen", label: "Bếp" },
  { id: "parking", label: "Chỗ đậu xe" },
  { id: "washing", label: "Máy giặt" },
  { id: "security", label: "An ninh 24/7" },
]

interface AccommodationSearchProps {
  onSearch?: (filters: any) => void
}

export function AccommodationSearch({ onSearch }: AccommodationSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [district, setDistrict] = useState("")
  const [priceRange, setPriceRange] = useState("")
  const [accommodationType, setAccommodationType] = useState("")
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = () => {
    onSearch?.({
      query: searchQuery,
      district,
      priceRange,
      type: accommodationType,
      amenities: selectedAmenities,
    })
  }

  const handleAmenityToggle = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId)
        ? prev.filter((id) => id !== amenityId)
        : [...prev, amenityId],
    )
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Main search bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm homestay, hostel, khách sạn..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleSearch}
            className="bg-golden hover:bg-golden/90"
          >
            Tìm kiếm
          </Button>
        </div>

        {/* Filter section */}
        {showFilters && (
          <div className="space-y-4 border-t pt-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* District filter */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Quận/Huyện
                </Label>
                <Select value={district} onValueChange={setDistrict}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn quận/huyện" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tất cả</SelectItem>
                    {districts.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price range filter */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Khoảng giá
                </Label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn khoảng giá" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tất cả</SelectItem>
                    <SelectItem value="0-500000">Dưới 500k</SelectItem>
                    <SelectItem value="500000-1000000">
                      500k - 1 triệu
                    </SelectItem>
                    <SelectItem value="1000000-2000000">1 - 2 triệu</SelectItem>
                    <SelectItem value="2000000-5000000">2 - 5 triệu</SelectItem>
                    <SelectItem value="5000000+">Trên 5 triệu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Accommodation type filter */}
              <div className="space-y-2">
                <Label>Loại chỗ ở</Label>
                <Select
                  value={accommodationType}
                  onValueChange={setAccommodationType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tất cả</SelectItem>
                    <SelectItem value="HOMESTAY">Homestay</SelectItem>
                    <SelectItem value="HOSTEL">Hostel</SelectItem>
                    <SelectItem value="HOTEL">Khách sạn</SelectItem>
                    <SelectItem value="APARTMENT">Căn hộ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Amenities filter */}
            <div className="space-y-2">
              <Label>Tiện nghi</Label>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {amenities.map((amenity) => (
                  <div key={amenity.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity.id}
                      checked={selectedAmenities.includes(amenity.id)}
                      onCheckedChange={() => handleAmenityToggle(amenity.id)}
                    />
                    <Label
                      htmlFor={amenity.id}
                      className="cursor-pointer text-sm font-normal"
                    >
                      {amenity.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
