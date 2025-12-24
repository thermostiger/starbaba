import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Resource } from '@/types'
import { FileText, Video, Lock, Unlock } from 'lucide-react'

interface ResourceCardProps {
    resource: Resource
    showBadges?: boolean
    variant?: 'portrait' | 'landscape' | 'standard'
    isFeatured?: boolean
}

export default function ResourceCard({ resource, showBadges = true, variant = 'standard', isFeatured = false }: ResourceCardProps) {
    const aspectRatioMap = {
        portrait: 'aspect-[3/4]',
        landscape: 'aspect-[16/9]',
        standard: 'aspect-[3/2]'
    }

    return (
        <Link href={`/resources/${resource.id}`} className="block h-full group">
            <Card className={`h-full flex flex-col overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white group-hover:-translate-y-1 rounded-xl
                ${isFeatured ? 'border-2 border-amber-400 shadow-md ring-2 ring-amber-100' : 'border-0'}
            `}>
                {/* Cover Image */}
                <div className={`relative w-full ${aspectRatioMap[variant]} bg-slate-100 overflow-hidden`}>
                    <Image
                        src={resource.cover_image || '/placeholder.png'}
                        alt={resource.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Featured Overlay/Badge */}
                    {isFeatured && (
                        <div className="absolute top-0 right-0 z-10">
                            <div className="bg-amber-400 text-blue-900 text-[10px] font-bold px-2 py-1 rounded-bl-lg shadow-sm flex items-center gap-1">
                                <span className="text-xs">★</span> 严选推荐
                            </div>
                        </div>
                    )}

                    {/* Overlay Gradient for Text Readability if needed, or keeping it clean */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Badges - Top Left */}
                    {showBadges && (
                        <div className="absolute top-2 left-2 flex flex-col gap-1.5">
                            {resource.is_weekly_hot && (
                                <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded shadow-sm">
                                    HOT
                                </span>
                            )}
                            {resource.is_new && (
                                <span className="px-2 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded shadow-sm">
                                    NEW
                                </span>
                            )}
                        </div>
                    )}

                    {/* Type Badge - Top Right */}
                    <div className="absolute top-2 right-2">
                        {resource.category?.includes('视频') || resource.resource_info?.includes('动画') ? (
                            <div className="bg-black/50 backdrop-blur-sm p-1.5 rounded-full text-white">
                                <Video className="w-3 h-3" />
                            </div>
                        ) : (
                            <div className="bg-black/50 backdrop-blur-sm p-1.5 rounded-full text-white">
                                <FileText className="w-3 h-3" />
                            </div>
                        )}
                    </div>

                    {/* VIP Lock Status - Bottom Right */}
                    {resource.is_vip && (
                        <div className="absolute bottom-2 right-2">
                            <div className="bg-amber-400/90 text-blue-900 p-1.5 rounded-full shadow-sm">
                                <Lock className="w-3.5 h-3.5" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                {resource.resource_info || resource.category}
                            </span>
                        </div>
                        <h3 className="font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                            {resource.title}
                        </h3>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between">
                        <span className="text-xs text-slate-400">
                            {resource.is_vip ? 'VIP 专享' : '免费资源'}
                        </span>
                        <span className="text-xs text-slate-300">
                            {/* Optional: Add usage count or date here */}
                            点击查看
                        </span>
                    </div>
                </div>
            </Card>
        </Link>
    )
}
