import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth/auth'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='flex'>
        {/* Sidebar */}
        <aside className='min-h-screen w-64 border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'>
          <div className='p-4'>
            <h2 className='text-xl font-bold'>Dashboard</h2>
            <nav className='mt-8 space-y-2'>
              <a
                href='/dashboard'
                className='block rounded px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700'
              >
                Overview
              </a>
              <a
                href='/profile'
                className='block rounded px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700'
              >
                Profile
              </a>
              <a
                href='/settings'
                className='block rounded px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700'
              >
                Settings
              </a>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className='flex-1'>
          <header className='border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'>
            <div className='flex items-center justify-between px-6 py-4'>
              <h1 className='text-2xl font-semibold'>
                Welcome, {session.user.name || session.user.email}
              </h1>
              <div className='flex items-center gap-4'>
                <span className='text-sm text-gray-600 dark:text-gray-400'>
                  Role: {session.user.role}
                </span>
                <form
                  action={async () => {
                    'use server'
                    const { signOut } = await import('@/lib/auth/auth')
                    await signOut()
                  }}
                >
                  <button className='rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600'>
                    Sign Out
                  </button>
                </form>
              </div>
            </div>
          </header>
          <div className='p-6'>{children}</div>
        </main>
      </div>
    </div>
  )
}
