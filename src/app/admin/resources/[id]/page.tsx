'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { resourcesAPI } from '@/lib/admin-api'

export default function EditResourcePage() {
    const router = useRouter()
    const params = useParams()
    const id = params.id as string

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'animation',
        stage: 'enlightenment',
        price: 0,
        vipPrice: 0,
        duration: '',
        isEnglishAudio: false,
        isHot: false,
        content: '',
        downloadLinks: {
            baidu: '',
            aliyun: '',
            quark: '',
        },
    })

    useEffect(() => {
        loadResource()
    }, [id])

    async function loadResource() {
        try {
            setLoading(true)
            const response = await resourcesAPI.get(id)
            const resource = response.doc
            setFormData({
                title: resource.title || '',
                description: resource.description || '',
                category: resource.category || 'animation',
                stage: resource.stage || 'enlightenment',
                price: resource.price || 0,
                vipPrice: resource.vipPrice || 0,
                duration: resource.duration || '',
                isEnglishAudio: resource.isEnglishAudio || false,
                isHot: resource.isHot || false,
                content: resource.content || '',
                downloadLinks: resource.downloadLinks || { baidu: '', aliyun: '', quark: '' },
            })
        } catch (error) {
            console.error('Failed to load resource:', error)
            alert('加载资源失败')
        } finally {
            setLoading(false)
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        try {
            setSaving(true)
            await resourcesAPI.update(id, formData)
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
                {/* Same form fields as new resource page */}
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
                        描述 *
                    </label>
                    <textarea
                        required
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                            <option value="animation">动画</option>
                            <option value="picture-book">绘本</option>
                            <option value="song">儿歌</option>
                            <option value="course">课程</option>
                            <option value="game">游戏</option>
                            <option value="other">其他</option>
                        </select>
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

                <div className="grid grid-cols-3 gap-4">
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
                            VIP 价格 (元)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={formData.vipPrice}
                            onChange={(e) => setFormData({ ...formData, vipPrice: parseFloat(e.target.value) })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            时长
                        </label>
                        <input
                            type="text"
                            placeholder="例如: 30分钟"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
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
                        详细内容
                    </label>
                    <textarea
                        rows={6}
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="资源的详细介绍..."
                    />
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
