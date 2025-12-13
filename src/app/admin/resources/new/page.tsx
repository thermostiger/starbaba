'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { resourcesAPI } from '@/lib/admin-api'
import dynamic from 'next/dynamic'

const TiptapEditor = dynamic(() => import('@/components/TiptapEditor'), { ssr: false })

export default function NewResourcePage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        highlights: '',
        resourceInfo: '',
        category: '',
        stage: 'enlightenment',
        price: 0,
        region: '',
        isEnglishAudio: false,
        isHot: false,
        content: '',
        downloadLinks: {
            baidu: '',
            aliyun: '',
            quark: '',
        },
    })

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        try {
            setLoading(true)

            // Transform downloadLinks from object to array format for Payload
            const downloadLinksArray = []
            if (formData.downloadLinks.baidu) {
                downloadLinksArray.push({
                    platform: 'baidu',
                    url: formData.downloadLinks.baidu,
                })
            }
            if (formData.downloadLinks.aliyun) {
                downloadLinksArray.push({
                    platform: 'aliyun',
                    url: formData.downloadLinks.aliyun,
                })
            }
            if (formData.downloadLinks.quark) {
                downloadLinksArray.push({
                    platform: 'quark',
                    url: formData.downloadLinks.quark,
                })
            }

            const payload = {
                title: formData.title,
                highlights: formData.highlights,
                resourceInfo: formData.resourceInfo,
                category: formData.category,
                stage: formData.stage,
                price: formData.price,
                region: formData.region,
                isEnglishAudio: formData.isEnglishAudio,
                isHot: formData.isHot,
                content: formData.content,
                downloadLinks: downloadLinksArray,
            }

            console.log('Creating resource:', payload.title)
            const result = await resourcesAPI.create(payload)
            console.log('Resource created successfully')
            alert('创建成功')
            router.push('/admin/resources')
        } catch (error) {
            console.error('Failed to create resource:', error)
            alert('创建失败：' + (error as Error).message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">添加新资源</h1>
                <p className="text-gray-600 mt-1">创建一个新的学习资源</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        标题 *
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        资源亮点 *
                    </label>
                    <textarea
                        required
                        rows={4}
                        value={formData.highlights}
                        onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="资源的主要亮点和特色..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        资源信息
                    </label>
                    <textarea
                        rows={3}
                        value={formData.resourceInfo}
                        onChange={(e) => setFormData({ ...formData, resourceInfo: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="资源的基本信息介绍..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            资源类别 *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="例如：动画、绘本、儿歌、课程等"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            适用阶段 *
                        </label>
                        <select
                            value={formData.stage}
                            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="enlightenment">启蒙英语</option>
                            <option value="foundation">基础英语</option>
                            <option value="advanced">进阶英语</option>
                            <option value="teen">青少年英语</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            价格 (元) *
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            required
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            地区/国家
                        </label>
                        <input
                            type="text"
                            placeholder="例如：美国、英国、日本"
                            value={formData.region}
                            onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={formData.isEnglishAudio}
                            onChange={(e) => setFormData({ ...formData, isEnglishAudio: e.target.checked })}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">英文原声</span>
                    </label>

                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={formData.isHot}
                            onChange={(e) => setFormData({ ...formData, isHot: e.target.checked })}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">热门资源</span>
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        详情介绍
                    </label>
                    <TiptapEditor
                        content={formData.content}
                        onChange={(value) => setFormData({ ...formData, content: value })}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        支持富文本编辑，可以插入图片、链接等
                    </p>
                </div>

                <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">下载链接</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                百度网盘
                            </label>
                            <input
                                type="text"
                                value={formData.downloadLinks.baidu}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    downloadLinks: { ...formData.downloadLinks, baidu: e.target.value }
                                })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://pan.baidu.com/..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                阿里云盘
                            </label>
                            <input
                                type="text"
                                value={formData.downloadLinks.aliyun}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    downloadLinks: { ...formData.downloadLinks, aliyun: e.target.value }
                                })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://www.aliyundrive.com/..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                夸克网盘
                            </label>
                            <input
                                type="text"
                                value={formData.downloadLinks.quark}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    downloadLinks: { ...formData.downloadLinks, quark: e.target.value }
                                })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://pan.quark.cn/..."
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        取消
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? '创建中...' : '创建资源'}
                    </button>
                </div>
            </form>
        </div>
    )
}
