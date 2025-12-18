import { requireAdmin } from '@/lib/admin-auth'
import { pool } from '@/lib/db'

async function getStats() {
    try {
        const [
            resourceResult,
            userResult,
            orderResult,
            vipResult
        ] = await Promise.all([
            pool.query('SELECT COUNT(*) FROM resources'),
            pool.query('SELECT COUNT(*) FROM users'),
            pool.query('SELECT COUNT(*) FROM orders'),
            pool.query("SELECT COUNT(*) FROM users WHERE role = 'vip'")
        ])

        return {
            resources: parseInt(resourceResult.rows[0].count),
            users: parseInt(userResult.rows[0].count),
            orders: parseInt(orderResult.rows[0].count),
            vips: parseInt(vipResult.rows[0].count)
        }
    } catch (error) {
        console.error('Failed to fetch admin stats:', error)
        return {
            resources: 0,
            users: 0,
            orders: 0,
            vips: 0
        }
    }
}

export default async function AdminDashboard() {
    await requireAdmin()
    const stats = await getStats()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">仪表盘</h1>
                <p className="text-gray-600 mt-2">欢迎使用 Starbaba 管理后台</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">总资源数</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.resources}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">总用户数</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.users}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">总订单数</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.orders}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">VIP 用户</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.vips}</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">快捷操作</h3>
                    <div className="space-y-3">
                        <a
                            href="/admin/resources/new"
                            className="block px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="text-sm font-medium text-gray-900">添加新资源</span>
                            </div>
                        </a>

                        <a
                            href="/admin/documentaries/new"
                            className="block px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                        >
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="text-sm font-medium text-gray-900">添加新纪录片</span>
                            </div>
                        </a>

                        <a
                            href="/admin/memberships/new"
                            className="block px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                        >
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="text-sm font-medium text-gray-900">添加会员套餐</span>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">系统信息</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">数据库</span>
                            <span className="text-gray-900 font-medium">Supabase PostgreSQL</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">存储</span>
                            <span className="text-gray-900 font-medium">AWS S3</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">支付</span>
                            <span className="text-gray-900 font-medium">微信 + 支付宝（沙箱）</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">版本</span>
                            <span className="text-gray-900 font-medium">v1.0.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
