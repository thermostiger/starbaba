'use client';

import { Resource } from '@/types';
import ResourceCard from '@/components/resources/ResourceCard';

interface HeroHotSectionProps {
    resources: Resource[];
}

export default function HeroHotSection({ resources }: HeroHotSectionProps) {
    return (
        <section className="py-12 bg-gradient-to-b from-blue-50/50 to-white relative overflow-hidden">
            {/* Subtle decorative background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-blue-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-100">
                            <span className="text-2xl">🔥</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">本周推荐</h2>
                            <p className="text-sm text-slate-500 mt-1">为您精心挑选的优质学习资源</p>
                        </div>
                    </div>
                </div>

                {/* 
                   Update Grid Layout:
                   Mobile: grid-cols-2 gap-3
                   Desktop: grid-cols-5 (lg:grid-cols-5)
                */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 auto-rows-min">
                    {resources.map((resource) => (
                        <ResourceCard key={resource.id} resource={resource} />
                    ))}
                </div>
            </div>
        </section>
    );
}
