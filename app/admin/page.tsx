import { redirect } from "next/navigation"

import {
  AlertCircle,
  Building,
  Gift,
  Star,
  TrendingUp,
  Users,
} from "lucide-react"

import { auth } from "@/lib/auth/auth"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function AdminDashboard() {
  const session = await auth()

  if (!session || session.user.role !== "ADMIN") {
    redirect("/403")
  }

  // Mock stats - replace with actual data fetching
  const stats = {
    totalUsers: 1234,
    totalAccommodations: 56,
    totalReviews: 789,
    totalRedemptions: 234,
    userGrowth: 12.5,
    reviewGrowth: 8.3,
    accommodationGrowth: 5.2,
    redemptionGrowth: 15.8,
  }

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Bảng điều khiển Admin</h1>
        <p className="text-muted-foreground">Quản lý nền tảng Chic Review</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng người dùng
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalUsers.toLocaleString()}
            </div>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+{stats.userGrowth}%</span>
              so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chỗ ở</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalAccommodations}
            </div>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">
                +{stats.accommodationGrowth}%
              </span>
              so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đánh giá</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalReviews.toLocaleString()}
            </div>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+{stats.reviewGrowth}%</span>
              so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đổi thưởng</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRedemptions}</div>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+{stats.redemptionGrowth}%</span>
              so với tháng trước
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Management Tabs */}
      <Tabs defaultValue="accommodations" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="accommodations">Chỗ ở</TabsTrigger>
          <TabsTrigger value="users">Người dùng</TabsTrigger>
          <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
          <TabsTrigger value="rewards">Phần thưởng</TabsTrigger>
          <TabsTrigger value="crawl">Crawl Data</TabsTrigger>
        </TabsList>

        <TabsContent value="accommodations" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Quản lý chỗ ở</h2>
            <Button className="bg-golden hover:bg-golden/90">
              Thêm chỗ ở mới
            </Button>
          </div>
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">
                Danh sách chỗ ở sẽ hiển thị ở đây
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Quản lý người dùng</h2>
            <Button variant="outline">Xuất danh sách</Button>
          </div>
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">
                Danh sách người dùng sẽ hiển thị ở đây
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Quản lý đánh giá</h2>
            <div className="flex gap-2">
              <Button variant="outline">Đánh giá chờ duyệt</Button>
              <Button variant="outline">Đánh giá bị báo cáo</Button>
            </div>
          </div>
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">
                Danh sách đánh giá sẽ hiển thị ở đây
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Quản lý phần thưởng</h2>
            <Button className="bg-golden hover:bg-golden/90">
              Thêm phần thưởng
            </Button>
          </div>
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">
                Danh sách phần thưởng sẽ hiển thị ở đây
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crawl" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Quản lý Crawl Data</h2>
            <Button className="bg-golden hover:bg-golden/90">
              Tạo Job mới
            </Button>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-amber-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Crawl Job Status</p>
                    <p className="text-sm text-muted-foreground">
                      Hệ thống sẽ tự động crawl review từ Facebook, Google,
                      Agoda, và Booking.com
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Danh sách crawl jobs sẽ hiển thị ở đây
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
