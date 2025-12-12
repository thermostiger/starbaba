import { requireAdmin } from '@/lib/admin-auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Get the current pathname
    const headersList = await headers()
    const pathname = headersList.get('x-pathname') || headersList.get('referer') || ''

    // Skip authentication check for login page
    const isLoginPage = pathname.includes('/admin/login')

    if (!isLoginPage) {
        await requireAdmin()
    }

    // If it's the login page, render without the admin layout
    if (isLoginPage) {
        return children
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold text-gray-900">管理后台</h1>
                        <p className="text-sm text-gray-500 mt-1">Starbaba Admin</p>
                    </div>

                    <nav className="px-3 space-y-1">
                        <a
                            href="/admin"
                            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            仪表盘
                        </a>

                        <a
                            href="/admin/resources"
                            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            资源管理
                        </a>

                        <a
                            href="/admin/documentaries"
                            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                            </svg>
                            纪录片管理
                        </a>

                        <a
                            href="/admin/users"
                            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            用户管理
                        </a>

                        <a
                            href="/admin/orders"
                            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            订单管理
                        </a>

                        <a
                            href="/admin/memberships"
                            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            会员套餐
                        </a>
                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1">
                    <div className="border-b border-gray-200 bg-white">
                        <div className="px-6 py-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">管理控制台</h2>
                            <div className="flex items-center space-x-4">
                                <a href="/" className="text-sm text-gray-600 hover:text-gray-900">
                                    返回前台
                                </a>
                                <form action="/api/auth/signout" method="post">
                                    <button
                                        type="submit"
                                        className="text-sm text-red-600 hover:text-red-700"
                                    >
                                        退出登录
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
