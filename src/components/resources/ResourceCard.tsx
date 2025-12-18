import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Resource } from '@/types'

interface ResourceCardProps {
    resource: Resource
    showBadges?: boolean
}

export default function ResourceCard({ resource, showBadges = false }: ResourceCardProps) {
    return (
        <Link href={`/resources/${resource.id}`} className="block h-full group">
            <Card className="relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer h-full flex flex-col border border-cyan-100/50 shadow-sm rounded-2xl bg-white">
                {/* Cover Image */}
                <div className="relative w-full aspect-[3/2]">
                    <Image
                        src={resource.coverImage || '/placeholder.png'}
                        alt={resource.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Badges - Top Left */}
                    {showBadges && (
                        <div className="absolute top-2 left-2 flex gap-1">
                            {resource.isWeeklyHot && (
                                <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full shadow-sm">
                                    HOT
                                </span>
                            )}
                            {resource.isNew && (
                                <span className="px-2 py-0.5 bg-cyan-500 text-white text-[10px] font-bold rounded-full shadow-sm">
                                    NEW
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                        <div className="text-xs text-cyan-600 mb-1 font-medium">{resource.stage || resource.category}</div>
                        <h3 className="font-bold text-sm text-slate-900 line-clamp-2 group-hover:text-cyan-600 transition-colors mb-1">
                            {resource.title}
                        </h3>
                    </div>

                    <div className="flex items-center justify-between mt-1 pt-2 border-t border-slate-50">
                        <span className="text-xs text-slate-400">{resource.category}</span>
                        {resource.isVip ? (
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-lg border border-purple-200">
                                VIP
                            </span>
                        ) : (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg border border-green-200">
                                免费
                            </span>
                        )}
                    </div>
                </div>
            </Card>
        </Link>
    )
}
