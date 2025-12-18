'use client'

import { useEffect, useState } from 'react'
import ResourceCard from './ResourceCard'

import { Resource } from '@/types'

interface ResourceGridProps {
    assignedPage: string
    title: string
    subtitle: string
    gradientFrom: string
    gradientTo: string
}

export default function ResourceGrid({ assignedPage, title, subtitle, gradientFrom, gradientTo }: ResourceGridProps) {
    const [resources, setResources] = useState<Resource[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        async function fetchResources() {
            try {
                setLoading(true)
                const response = await fetch(`/api/admin/resources?assignedPage=${encodeURIComponent(assignedPage)}&page=${currentPage}&limit=10&isPublished=true`)
                const data = await response.json()
                setResources(data.docs || [])
                setTotalPages(data.totalPages || 1)
            } catch (error) {
                console.error('Failed to fetch resources:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchResources()
    }, [assignedPage, currentPage])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className={`h-[100px] bg-gradient-to-r ${gradientFrom} ${gradientTo} flex items-center justify-center`}>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">{title}</h1>
                        <p className="text-sm mt-1 font-medium">{subtitle}</p>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-lg" />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className={`h-[100px] bg-gradient-to-r ${gradientFrom} ${gradientTo} flex items-center justify-center`}>
                <div className="text-center">
                    <h1 className="text-3xl font-bold">{title}</h1>
                    <p className="text-sm mt-1 font-medium">{subtitle}</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {resources.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">暂无资源</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                            {resources.map((resource) => (
                                <ResourceCard key={resource.id} resource={resource} />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex justify-center gap-2 mt-8">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    上一页
                                </button>
                                <span className="px-4 py-2 bg-white border border-gray-300 rounded-lg">
                                    {currentPage} / {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    下一页
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
