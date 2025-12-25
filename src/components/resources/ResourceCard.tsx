import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Resource } from '@/types'
import { Lock, Video, FileText } from 'lucide-react'

interface ResourceCardProps {
    resource: Resource
    showBadges?: boolean
    isFeatured?: boolean
    className?: string
}

export default function ResourceCard({ resource, showBadges = true, isFeatured = false, className = '' }: ResourceCardProps) {
    // Logic for status badge
    // If is_free === true: Green badge "免费 (Free)"
    // If is_free === false: Gray badge "VIP" + Lock Icon
    const isFree = resource.is_free === true

    return (
        <Link href={`/resources/${resource.slug || resource.id}`} className={`block h-full group ${className}`}>
            <Card className={`h-full flex flex-col overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white group-hover:-translate-y-1 rounded-xl border-slate-100`}>

                {/* 1. Image Area: Aspect [4/3] (Landscape) */}
                <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
                    <Image
                        src={resource.cover_image || '/images/oxford.jpg'}
                        alt={resource.title}
                        fill
                        className={`object-cover transition-transform duration-700 group-hover:scale-105 ${resource.category?.includes('书籍') || resource.category?.includes('book') ? 'object-contain p-2 bg-slate-50' : 'object-cover'}`}
                    />

                    {/* Gradient Overlay for subtle depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Featured Badge - Top Right */}
                    {isFeatured && (
                        <div className="absolute top-0 right-0 z-20">
                            <div className="bg-amber-400 text-blue-900 text-[10px] font-bold px-2 py-1 rounded-bl-lg shadow-sm flex items-center gap-1">
                                <span className="text-xs">★</span> 严选推荐
                            </div>
                        </div>
                    )}

                    {/* Top Left Badges (Hot/New) */}


                    {/* Media Type Icon - Bottom Right */}
                    <div className="absolute bottom-2 right-2 z-10">
                        {resource.category?.includes('视频') || resource.resource_info?.includes('动画') ? (
                            <div className="bg-black/40 backdrop-blur-sm p-1 rounded-full text-white">
                                <Video className="w-3 h-3" />
                            </div>
                        ) : (
                            <div className="bg-black/40 backdrop-blur-sm p-1 rounded-full text-white">
                                <FileText className="w-3 h-3" />
                            </div>
                        )}
                    </div>
                </div>

                {/* 2. Text Area: Compact Design (approx 35% visual weight) */}
                <div className="p-3 flex-1 flex flex-col justify-between gap-2">
                    {/* Title: max 2 lines, tight leading */}
                    <h3 className="text-sm font-bold text-slate-800 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {resource.title}
                    </h3>

                    {/* 3. Status/Footer Logic */}
                    <div className="flex items-center justify-between pt-1">
                        {isFree ? (
                            <div className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                                免费
                            </div>
                        ) : (
                            <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-bold">
                                <span>VIP</span>
                                <Lock className="w-2.5 h-2.5" />
                            </div>
                        )}

                        {/* Optional: view count or similar if needed, keeping it clean for now */}
                    </div>
                </div>
            </Card>
        </Link>
    )
}
