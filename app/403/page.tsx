import Link from "next/link"

import { ArrowLeft, Home, ShieldX } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-md space-y-6 p-8 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-100 p-4">
            <ShieldX className="h-16 w-16 text-red-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">403</h1>
          <h2 className="text-2xl font-semibold text-gray-700">
            Không có quyền truy cập
          </h2>
          <p className="text-gray-600">
            Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị
            viên nếu bạn cho rằng đây là lỗi.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </Button>
          </Link>
          <Link href="/">
            <Button className="gap-2 bg-golden hover:bg-golden/90">
              <Home className="h-4 w-4" />
              Trang chủ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
