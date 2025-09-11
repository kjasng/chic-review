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
  const [userCount, postCount, recentPosts] = await Promise.all([
    prisma.user.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.post.findMany({
      where: { published: true },
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    }),
  ])

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
            Published Posts
          </h3>
          <p className="mt-2 text-3xl font-bold">{postCount}</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Your Role
          </h3>
          <p className="mt-2 text-3xl font-bold">{session?.user.role}</p>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="rounded-lg bg-white shadow dark:bg-gray-800">
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <h2 className="text-xl font-semibold">Recent Posts</h2>
        </div>
        <div className="p-6">
          {recentPosts.length > 0 ? (
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="border-b border-gray-200 pb-4 last:border-0 dark:border-gray-700"
                >
                  <h3 className="font-semibold">{post.title}</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    By {post.author.name || post.author.email} •{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  {post.content && (
                    <p className="mt-2 line-clamp-2 text-gray-700 dark:text-gray-300">
                      {post.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No posts available
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
