import Link from 'next/link'

interface Resource {
    id: string
    title: string
    highlights: string
    category: string
    price: number
    coverImage?: string
    isWeeklyHot?: boolean
    isNew?: boolean
}

interface ResourceCardProps {
    resource: Resource
}

export default function ResourceCard({ resource }: ResourceCardProps) {
    return (
        <Link href={`/resources/${resource.id}`} className="group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {/* Cover Image */}
                <div className="relative h-48 bg-gradient-to-br from-orange-100 to-amber-100">
                    {resource.coverImage ? (
                        <img
                            src={resource.coverImage}
                            alt={resource.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <span className="text-sm">暂无封面</span>
                        </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-2 right-2 flex gap-2">
                        {resource.isWeeklyHot && (
                            <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                                热门
                            </span>
                        )}
                        {resource.isNew && (
                            <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                                最新
                            </span>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {resource.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
                        {resource.highlights}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {resource.category}
                        </span>
                        <span className="text-lg font-bold text-orange-600">
                            ¥{resource.price}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
