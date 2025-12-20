'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { resourcesAPI } from '@/lib/admin-api'
import dynamic from 'next/dynamic'

const TiptapEditor = dynamic(() => import('@/components/TiptapEditor'), { ssr: false })

export default function EditResourcePage() {
    const router = useRouter()
    const params = useParams()
    const id = params.id as string

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploadingCover, setUploadingCover] = useState(false)
    const [coverImageUrl, setCoverImageUrl] = useState('')
    const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null)

    // State matching NewResourcePage
    const [formData, setFormData] = useState({
        title: '',
        highlights: '',
        resourceInfo: '',
        category: '',
        assignedPage: '',
        price: 0,
        isWeeklyHot: false,
        isNew: false,
        content: '',
        coverImage: '',
        resourceUrl: '',
    })

    useEffect(() => {
        async function loadResource() {
            try {
                setLoading(true)
                console.log('Loading resource:', id)
                const response = await resourcesAPI.get(id)
                console.log('Resource loaded:', response)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const resource = response.doc as any

                setCoverImageUrl(resource.coverImage || '')

                setFormData({
                    title: resource.title || '',
                    highlights: resource.highlights || '',
                    resourceInfo: resource.resourceInfo || '',
                    category: resource.category || '',
                    assignedPage: resource.assignedPage || '',
                    price: resource.price || 0,
                    isWeeklyHot: !!resource.isWeeklyHot,
                    isNew: !!resource.isNew,
                    content: resource.content || '',
                    coverImage: resource.coverImage || '',
                    resourceUrl: resource.resourceUrl || '',
                })
            } catch (error) {
                console.error('Failed to load resource:', error)
                alert('加载资源失败：' + (error as Error).message)
            } finally {
                setLoading(false)
            }
        }
        loadResource()
    }, [id])

    async function handleCoverImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            setUploadingCover(true)

            // Upload original image
            const formData = new FormData()
            formData.append('file', file)

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Upload failed')
            }

            const result = await response.json()
            setCoverImageUrl(result.url)
            setFormData(prev => ({ ...prev, coverImage: result.url }))
        } catch (error) {
            console.error('Cover image upload error:', error)
            alert('封面上传失败：' + (error as Error).message)
        } finally {
            setUploadingCover(false)
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        try {
            setSaving(true)

            const payload = {
                title: formData.title,
                highlights: formData.highlights,
                resourceInfo: formData.resourceInfo,
                category: formData.category,
                assignedPage: formData.assignedPage,
                price: formData.price,
                isWeeklyHot: formData.isWeeklyHot,
                isNew: formData.isNew,
                content: formData.content,
                coverImage: formData.coverImage,
                resourceUrl: formData.resourceUrl,
            }

            await resourcesAPI.update(id, payload)
            alert('保存成功')
            router.push('/admin/resources')
        } catch (error) {
            console.error('Failed to update resource:', error)
            alert('保存失败：' + (error as Error).message)
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 mt-4">加载中...</p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">编辑资源</h1>
                <p className="text-gray-600 mt-1">修改资源信息</p>
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
                        封面图片
                    </label>
                    <div className="flex items-start space-x-4">
                        {coverImageUrl && (
                            <div className="flex-shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={coverImageUrl}
                                    alt="封面预览"
                                    className="w-[200px] h-auto object-cover rounded-lg border-2 border-gray-300"
                                    onLoad={(e) => {
                                        const img = e.target as HTMLImageElement
                                        setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight })
                                    }}
                                />
                                {imageDimensions && (
                                    <p className="mt-1 text-xs text-gray-500 text-center">
                                        {imageDimensions.width} x {imageDimensions.height}
                                    </p>
                                )}
                            </div>
                        )}
                        <div className="flex-1">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleCoverImageUpload}
                                disabled={uploadingCover}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
                            />
                            <p className="mt-2 text-sm text-gray-500">
                                {uploadingCover ? '上传中...' : '支持jpg, png格式，显示原图长宽'}
                            </p>
                        </div>
                    </div>
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
                            分类 *
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">请选择分类</option>
                            <option value="幼儿英语启蒙">幼儿英语启蒙</option>
                            <option value="少儿英语基础">少儿英语基础</option>
                            <option value="青少年英语进阶">青少年英语进阶</option>
                            <option value="科普纪录片">科普纪录片</option>
                            <option value="TED演讲">TED演讲</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            所属页面 *
                        </label>
                        <select
                            required
                            value={formData.assignedPage}
                            onChange={(e) => setFormData({ ...formData, assignedPage: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">请选择所属页面</option>
                            <option value="幼儿英语">幼儿英语</option>
                            <option value="少儿英语">少儿英语</option>
                            <option value="青少年英语">青少年英语</option>
                            <option value="科普纪录片">科普纪录片</option>
                        </select>
                    </div>

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
                </div>

                <div className="flex items-center space-x-6">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={formData.isWeeklyHot}
                            onChange={(e) => setFormData({ ...formData, isWeeklyHot: e.target.checked })}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">本周热门</span>
                    </label>

                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={formData.isNew}
                            onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">最新资源</span>
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

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        资源地址
                    </label>
                    <textarea
                        rows={3}
                        value={formData.resourceUrl}
                        onChange={(e) => setFormData({ ...formData, resourceUrl: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="资源下载或访问地址...&#10;支持多行输入，每行一个链接"
                    />
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
                        disabled={saving}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? '保存中...' : '保存修改'}
                    </button>
                </div>
            </form>
        </div>
    )
}
