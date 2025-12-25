import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Resource } from '@/types'
import { Lock, Video, FileText, Star } from 'lucide-react'

interface FeaturedCardProps {
    resource: Resource
    className?: string
}

export default function FeaturedCard({ resource, className = '' }: FeaturedCardProps) {
    const isFree = resource.is_free === true

    return (
        <Link href={`/resources/${resource.slug || resource.id}`} className={`block h-full group ${className}`}>
            <Card className="h-full flex flex-col overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-white group-hover:-translate-y-2 rounded-2xl border-slate-100 relative group">
                {/* 1. Large Image Area */}
                <div className="relative w-full h-full min-h-[300px] md:min-h-0 md:flex-1 bg-slate-100 overflow-hidden">
                    <Image
                        src={resource.cover_image || '/images/oxford.jpg'}
                        alt={resource.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />

                    {/* Rich Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Featured Tag */}
                    <div className="absolute top-4 left-4 z-20">
                        <div className="bg-amber-400 text-blue-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce-subtle">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>主编力荐</span>
                        </div>
                    </div>

                    {/* Content Over Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                {isFree ? (
                                    <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded">免费资源</span>
                                ) : (
                                    <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded flex items-center gap-1">
                                        VIP <Lock className="w-2.5 h-2.5" />
                                    </span>
                                )}
                                <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded">
                                    {resource.category || '精选'}
                                </span>
                            </div>

                            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight line-clamp-2 drop-shadow-md">
                                {resource.title}
                            </h3>

                            <p className="text-slate-200 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                {resource.resource_info || '深度解析原版英文资源的魅力，助力孩子英语启蒙与进阶。'}
                            </p>

                            <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/10">
                                <div className="flex items-center gap-2 text-white/80 text-xs">
                                    <div className="p-1 rounded-full bg-white/10">
                                        {resource.category?.includes('视频') ? <Video className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
                                    </div>
                                    <span>优质内容</span>
                                </div>
                                <span className="text-amber-400 text-sm font-bold group-hover:translate-x-1 transition-transform">
                                    立即查看 →
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    )
}
