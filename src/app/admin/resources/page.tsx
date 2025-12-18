'use client'

import { useState, useEffect } from 'react'
import { resourcesAPI } from '@/lib/admin-api'
import Link from 'next/link'

export default function ResourcesPage() {
    const [resources, setResources] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        loadResources()
    }, [page])

    async function loadResources() {
        try {
            setLoading(true)
            const response = await resourcesAPI.list({ page, limit: 20 })
            setResources(response.docs || [])
            setTotalPages(response.totalPages || 1)
        } catch (error) {
            console.error('Failed to load resources:', error)
            alert('加载资源失败')
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('确定要删除这个资源吗？')) return

        try {
            await resourcesAPI.delete(id)
            alert('删除成功')
            loadResources()
        } catch (error) {
            console.error('Failed to delete resource:', error)
            alert('删除失败')
        }
    }

    async function handleToggleStatus(resource: any) {
        try {
            const newStatus = !resource.isPublished
            await resourcesAPI.update(resource.id, {
                isPublished: newStatus
            })
            setResources(resources.map(r =>
                r.id === resource.id ? { ...r, isPublished: newStatus } : r
            ))
        } catch (error) {
            console.error('Failed to update status:', error)
            alert('更新状态失败')
        }
    }

    async function handleToggleVip(resource: any) {
        try {
            const newVip = !resource.isVip
            await resourcesAPI.update(resource.id, {
                isVip: newVip
            })
            setResources(resources.map(r =>
                r.id === resource.id ? { ...r, isVip: newVip } : r
            ))
        } catch (error) {
            console.error('Failed to update vip status:', error)
            alert('更新VIP状态失败')
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">资源管理</h1>
                    <p className="text-gray-600 mt-1">管理所有学习资源</p>
                </div>
                <Link
                    href="/admin/resources/new"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    添加资源
                </Link>
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
                                        标题
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        分类
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        阶段
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        价格
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        权限
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        状态
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        操作
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {resources.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                            暂无资源
                                        </td>
                                    </tr>
                                ) : (
                                    resources.map((resource) => (
                                        <tr key={resource.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {resource.title}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                                                    {resource.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {resource.stage}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                ¥{resource.price}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <button
                                                    onClick={() => handleToggleStatus(resource)}
                                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${resource.isPublished !== false ? 'bg-blue-600' : 'bg-gray-200'
                                                        }`}
                                                >
                                                    <span
                                                        aria-hidden="true"
                                                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${resource.isPublished !== false ? 'translate-x-5' : 'translate-x-0'
                                                            }`}
                                                    />
                                                </button>
                                                <span className="ml-2 text-xs text-gray-500">
                                                    {resource.isPublished !== false ? '已上架' : '已下架'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <button
                                                    onClick={() => handleToggleVip(resource)}
                                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 ${resource.isVip ? 'bg-purple-600' : 'bg-green-500'}`}
                                                >
                                                    <span
                                                        aria-hidden="true"
                                                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${resource.isVip ? 'translate-x-5' : 'translate-x-0'}`}
                                                    />
                                                </button>
                                                <span className="ml-2 text-xs text-gray-500">
                                                    {resource.isVip ? 'VIP' : '免费'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                                                <Link
                                                    href={`/admin/resources/${resource.id}`}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    编辑
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(resource.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    删除
                                                </button>
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
