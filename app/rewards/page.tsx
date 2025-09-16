import { Target, TrendingUp } from "lucide-react"

import { auth } from "@/lib/auth/auth"

import {
  AlertDialog,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { PointsDisplay } from "@/components/rewards/PointsDisplay"
import { RewardCard } from "@/components/rewards/RewardCard"

export default async function RewardsPage() {
  const session = await auth()

  // Mock data - replace with actual data fetching
  const userPoints = session?.user?.points || 0
  const totalEarned = 2500

  const rewards = [
    {
      id: "1",
      name: "Khóa học Tiếng Anh IELTS Online",
      description: "Khóa học IELTS 4 kỹ năng với giảng viên bản ngữ",
      category: "COURSE" as const,
      pointsCost: 2000,
      available: true,
      stock: 5,
    },
    {
      id: "2",
      name: "Ebook: 100 Cụm từ Tiếng Anh thông dụng",
      description: "Tài liệu PDF với 100 cụm từ hay dùng trong giao tiếp",
      category: "EBOOK" as const,
      pointsCost: 300,
      available: true,
      stock: 100,
    },
    {
      id: "3",
      name: "Bộ đề thi TOEIC 2024",
      description: "10 đề thi TOEIC mới nhất với đáp án chi tiết",
      category: "MATERIAL" as const,
      pointsCost: 500,
      available: true,
      stock: 50,
    },
    {
      id: "4",
      name: "Thành viên Premium 1 tháng",
      description: "Truy cập không giới hạn tất cả tính năng Premium",
      category: "MEMBERSHIP" as const,
      pointsCost: 1500,
      available: true,
      stock: 10,
    },
  ]

  const pointsHistory = [
    { action: "Viết review chi tiết", points: 50, date: "2024-01-15" },
    { action: "Upload ảnh review", points: 30, date: "2024-01-14" },
    { action: "Review được vote hữu ích", points: 25, date: "2024-01-13" },
    { action: "Hoàn thành hồ sơ", points: 100, date: "2024-01-10" },
  ]

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Phần thưởng & Điểm</h1>
        <p className="text-muted-foreground">
          Đổi điểm lấy phần thưởng hấp dẫn
        </p>
      </div>

      {/* Points Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <PointsDisplay
          points={userPoints}
          totalEarned={totalEarned}
          className="md:col-span-1"
        />

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Cách kiếm điểm
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Viết review chi tiết (200+ từ)</span>
                  <span className="font-semibold text-golden">+50 điểm</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Upload ảnh trong review</span>
                  <span className="font-semibold text-golden">
                    +10 điểm/ảnh
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Xác minh lưu trú</span>
                  <span className="font-semibold text-golden">+30 điểm</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Review được vote hữu ích</span>
                  <span className="font-semibold text-golden">
                    +5 điểm/vote
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Giới thiệu người dùng mới</span>
                  <span className="font-semibold text-golden">+100 điểm</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Đăng nhập hàng ngày</span>
                  <span className="font-semibold text-golden">+5 điểm</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {!session && (
        <AlertDialog>
          <AlertDialogDescription>
            Vui lòng đăng nhập để xem điểm và đổi phần thưởng của bạn.
          </AlertDialogDescription>
        </AlertDialog>
      )}

      {/* Rewards Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="courses">Khóa học</TabsTrigger>
          <TabsTrigger value="ebooks">Sách điện tử</TabsTrigger>
          <TabsTrigger value="materials">Tài liệu</TabsTrigger>
          <TabsTrigger value="membership">Thành viên</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rewards.map((reward) => (
              <RewardCard
                key={reward.id}
                {...reward}
                userPoints={userPoints}
                onRedeem={() => console.log("Redeem", reward.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rewards
              .filter((r) => r.category === "COURSE")
              .map((reward) => (
                <RewardCard
                  key={reward.id}
                  {...reward}
                  userPoints={userPoints}
                  onRedeem={() => console.log("Redeem", reward.id)}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="ebooks" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rewards
              .filter((r) => r.category === "EBOOK")
              .map((reward) => (
                <RewardCard
                  key={reward.id}
                  {...reward}
                  userPoints={userPoints}
                  onRedeem={() => console.log("Redeem", reward.id)}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="materials" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rewards
              .filter((r) => r.category === "MATERIAL")
              .map((reward) => (
                <RewardCard
                  key={reward.id}
                  {...reward}
                  userPoints={userPoints}
                  onRedeem={() => console.log("Redeem", reward.id)}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="membership" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rewards
              .filter((r) => r.category === "MEMBERSHIP")
              .map((reward) => (
                <RewardCard
                  key={reward.id}
                  {...reward}
                  userPoints={userPoints}
                  onRedeem={() => console.log("Redeem", reward.id)}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Points History */}
      {session && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Lịch sử điểm gần đây
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pointsHistory.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b py-2 last:border-0"
                >
                  <div>
                    <p className="font-medium">{item.action}</p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                  <span className="font-semibold text-green-600">
                    +{item.points} điểm
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
