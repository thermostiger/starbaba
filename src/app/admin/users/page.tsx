'use client'

import { useState, useEffect } from 'react'
import { usersAPI } from '@/lib/admin-api'

export default function UsersPage() {
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        loadUsers()
    }, [page])

    async function loadUsers() {
        try {
            setLoading(true)
            const response = await usersAPI.list({ page, limit: 20 })
            setUsers(response.docs || [])
            setTotalPages(response.totalPages || 1)
        } catch (error) {
            console.error('Failed to load users:', error)
            alert('加载用户失败')
        } finally {
            setLoading(false)
        }
    }

    async function toggleVIP(userId: string, currentRole: string) {
        const newRole = currentRole === 'vip' ? 'user' : 'vip'

        try {
            await usersAPI.update(userId, { role: newRole })
            alert(`已${newRole === 'vip' ? '升级为' : '取消'} VIP`)
            loadUsers()
        } catch (error) {
            console.error('Failed to update user:', error)
            alert('操作失败')
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">用户管理</h1>
                <p className="text-gray-600 mt-1">管理所有注册用户</p>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600 mt-4">加载中...</p>
                </div>
            ) : (
                <>
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        用户名
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        邮箱
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        角色
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        注册时间
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        操作
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                            暂无用户
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.name || '未设置'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs font-medium rounded ${user.role === 'admin' ? 'bg-red-100 text-red-800' :
                                                        user.role === 'vip' ? 'bg-purple-100 text-purple-800' :
                                                            'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {user.role === 'admin' ? '管理员' : user.role === 'vip' ? 'VIP' : '普通用户'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(user.createdAt).toLocaleDateString('zh-CN')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {user.role !== 'admin' && (
                                                    <button
                                                        onClick={() => toggleVIP(user.id, user.role)}
                                                        className={`${user.role === 'vip'
                                                                ? 'text-gray-600 hover:text-gray-900'
                                                                : 'text-purple-600 hover:text-purple-900'
                                                            }`}
                                                    >
                                                        {user.role === 'vip' ? '取消 VIP' : '升级 VIP'}
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-center space-x-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                上一页
                            </button>
                            <span className="text-sm text-gray-600">
                                第 {page} / {totalPages} 页
                            </span>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                下一页
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
