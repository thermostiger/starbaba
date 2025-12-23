import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Resource } from '@/types';

interface NewResourcesGridProps {
    resources: Resource[];
    rows?: number;
    cardWidth?: string;
    cardHeight?: string;
    hideHeader?: boolean;
}

export default function NewResourcesGrid({ resources, rows = 2, cardWidth, cardHeight, hideHeader = false }: NewResourcesGridProps) {
    const displayResources = resources.slice(0, rows * 6);

    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                {!hideHeader && (
                    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-cyan-100">
                        <div className="p-2 bg-cyan-100 rounded-xl">
                            <span className="text-2xl">✨</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">最新资源</h2>
                            <p className="text-sm text-slate-500 mt-1">每日更新的精选绘本</p>
                        </div>
                    </div>
                )}

                <div className={cardWidth ? "flex flex-wrap gap-4 justify-center" : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"}>
                    {displayResources.map((resource) => (
                        <Link
                            key={resource.id}
                            href={`/resources/${resource.id}`}
                            className={cardWidth ? "flex-shrink-0 block h-full" : "block h-full"}
                            style={cardWidth ? { width: cardWidth } : undefined}
                        >
                            <div className="relative group h-full">
                                <Card className="relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer h-full flex flex-col border border-cyan-100/50 shadow-sm rounded-2xl bg-white" style={cardHeight ? { height: cardHeight } : undefined}>
                                    <div className="relative w-full aspect-[3/2]">
                                        <Image
                                            src={resource.cover_image}
                                            alt={resource.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-cyan-500 text-white text-[10px] font-bold rounded-full shadow-sm">
                                            NEW
                                        </div>
                                    </div>
                                    <CardContent className="p-3 flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="text-xs text-cyan-600 mb-1 font-medium">{resource.resource_info}</div>
                                            <h3 className="font-bold text-sm line-clamp-2 group-hover:text-cyan-600 transition-colors mb-1">
                                                {resource.title}
                                            </h3>
                                        </div>
                                        <div className="flex items-center justify-between mt-1 pt-2 border-t border-slate-50">
                                            <span className="text-xs text-slate-400">{resource.category}</span>
                                            {resource.is_vip ? (
                                                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-lg border border-purple-200">
                                                    VIP
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg border border-green-200">
                                                    免费
                                                </span>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
