import type { Metadata } from "next"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "User dashboard",
}

export default async function DashboardPage() {
  const session = await auth()

  // Get some stats for the dashboard
  const [userCount] = await Promise.all([prisma.user.count()])

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Total Users
          </h3>
          <p className="mt-2 text-3xl font-bold">{userCount}</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Your Role
          </h3>
          <p className="mt-2 text-3xl font-bold">{session?.user.role}</p>
        </div>
      </div>
    </div>
  )
}
