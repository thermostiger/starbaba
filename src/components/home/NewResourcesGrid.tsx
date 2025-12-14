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
    const displayResources = resources.slice(0, rows * 8);

    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                {!hideHeader && (
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold">最新资源</h2>
                    </div>
                )}

                <div className={cardWidth ? "flex flex-wrap gap-4 justify-center" : "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4"}>
                    {displayResources.map((resource) => (
                        <Link
                            key={resource.id}
                            href={`/resource/${resource.id}`}
                            className={cardWidth ? "flex-shrink-0" : ""}
                            style={cardWidth ? { width: cardWidth } : undefined}
                        >
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                                <Card className="relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer h-full flex flex-col border-0 shadow-none" style={cardHeight ? { height: cardHeight } : undefined}>
                                    <div className="relative w-full" style={{ height: cardHeight ? '65%' : 'auto', aspectRatio: cardHeight ? undefined : '3/4' }}>
                                        <Image
                                            src={resource.coverImage}
                                            alt={resource.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <CardContent className="p-2 flex-1 flex flex-col justify-between bg-white/95 backdrop-blur-sm">
                                        <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                            {resource.title}
                                        </h3>
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="text-xs text-muted-foreground">{resource.stage}</span>
                                            {resource.vipPrice === 0 ? (
                                                <span className="text-xs font-bold text-primary">VIP</span>
                                            ) : (
                                                <span className="text-xs font-bold text-primary">¥{resource.price}</span>
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
