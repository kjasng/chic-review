"use client"

import { AccommodationCard } from "@/components/accommodations/AccommodationCard"
import { AccommodationSearch } from "@/components/search/AccommodationSearch"

export default function AccommodationsPage() {
  // Mock data - replace with actual data fetching
  const accommodations = [
    {
      id: "1",
      name: "Homestay Tây Hồ View Hồ",
      type: "HOMESTAY" as const,
      slug: "homestay-tay-ho-view-ho",
      description:
        "Homestay xinh xắn với view hồ Tây tuyệt đẹp, gần nhiều quán cafe và nhà hàng nổi tiếng",
      district: "Tây Hồ",
      priceDaily: 800000,
      priceMonthly: 15000000,
      amenities: ["WiFi", "Điều hòa", "Bếp", "View hồ"],
      images: [],
      capacity: 4,
      rooms: 2,
      bathrooms: 1,
      featured: true,
      rating: 4.8,
      reviewCount: 125,
    },
    {
      id: "2",
      name: "Hostel Phố Cổ Backpackers",
      type: "HOSTEL" as const,
      slug: "hostel-pho-co-backpackers",
      description:
        "Hostel giá rẻ ngay trung tâm phố cổ, phù hợp cho backpacker và sinh viên",
      district: "Hoàn Kiếm",
      priceDaily: 200000,
      amenities: ["WiFi", "Điều hòa", "Tủ khóa", "Phòng chung"],
      images: [],
      capacity: 8,
      rooms: 1,
      bathrooms: 2,
      featured: false,
      rating: 4.2,
      reviewCount: 89,
    },
    {
      id: "3",
      name: "Khách sạn Cầu Giấy Plaza",
      type: "HOTEL" as const,
      slug: "khach-san-cau-giay-plaza",
      description:
        "Khách sạn 3 sao tiện nghi, gần các trường đại học và khu công nghệ",
      district: "Cầu Giấy",
      priceDaily: 1200000,
      priceMonthly: 25000000,
      amenities: ["WiFi", "Điều hòa", "Gym", "Bữa sáng", "Chỗ đậu xe"],
      images: [],
      capacity: 2,
      rooms: 1,
      bathrooms: 1,
      featured: true,
      rating: 4.5,
      reviewCount: 234,
    },
    {
      id: "4",
      name: "Căn hộ Studio Đống Đa",
      type: "APARTMENT" as const,
      slug: "can-ho-studio-dong-da",
      description:
        "Căn hộ studio đầy đủ tiện nghi, phù hợp cho người đi làm và sinh viên",
      district: "Đống Đa",
      priceDaily: 600000,
      priceMonthly: 12000000,
      amenities: ["WiFi", "Điều hòa", "Máy giặt", "Bếp"],
      images: [],
      capacity: 2,
      rooms: 1,
      bathrooms: 1,
      featured: false,
      rating: 4.3,
      reviewCount: 67,
    },
  ]

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Tìm kiếm chỗ ở tại Hà Nội</h1>
        <p className="text-muted-foreground">
          Khám phá {accommodations.length}+ homestay, hostel và khách sạn được
          đánh giá cao
        </p>
      </div>

      {/* Search and Filters */}
      <AccommodationSearch onSearch={(filters) => console.log(filters)} />

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Tìm thấy {accommodations.length} chỗ ở
          </h2>
          <div className="text-sm text-muted-foreground">
            Sắp xếp theo: Phổ biến nhất
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {accommodations.map((accommodation) => (
            <AccommodationCard key={accommodation.id} {...accommodation} />
          ))}
        </div>
      </div>
    </div>
  )
}
