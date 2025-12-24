import { Resource } from '@/types';
import ResourceCard from '@/components/resources/ResourceCard';

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

                <div className={cardWidth ? "flex flex-wrap gap-4 justify-center" : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"}>
                    {displayResources.map((resource) => (
                        <div key={resource.id} className={cardWidth ? "flex-shrink-0" : ""} style={cardWidth ? { width: cardWidth } : undefined}>
                            <ResourceCard resource={resource} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
