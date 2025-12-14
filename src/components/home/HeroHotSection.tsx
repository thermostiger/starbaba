'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Resource } from '@/types';

interface HeroHotSectionProps {
    resources: Resource[];
}

export default function HeroHotSection({ resources }: HeroHotSectionProps) {
    return (
        <section className="py-12 bg-gradient-to-b from-orange-50/50 to-white relative overflow-hidden">
            {/* Subtle decorative background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-orange-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl shadow-sm">
                            <span className="text-2xl">🔥</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">本周热门资源</h2>
                            <p className="text-sm text-slate-500 mt-1">大家都爱看的优质内容</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {resources.map((resource) => (
                        <Link key={resource.id} href={`/resource/${resource.id}`}>
                            <Card className="h-full border border-orange-100 bg-white/60 backdrop-blur-md hover:bg-white hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 rounded-2xl overflow-hidden group">
                                <div className="relative aspect-[4/3] w-full overflow-hidden">
                                    <Image
                                        src={resource.coverImage}
                                        alt={resource.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute top-3 left-3">
                                        <span className="px-3 py-1 bg-white/95 backdrop-blur shadow-sm text-orange-600 text-xs font-bold rounded-full">
                                            {resource.stage}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-slate-800 text-lg mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
                                        {resource.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-auto">
                                        <div className="flex -space-x-2">
                                            {[...Array(3)].map((_, i) => (
                                                <div key={i} className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] text-slate-400">
                                                    ✨
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-xs text-slate-500 font-medium">3200+ 人已下载</span>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
