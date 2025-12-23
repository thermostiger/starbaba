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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {resources.map((resource) => (
                        <Link key={resource.id} href={`/resources/${resource.id}`} className="block h-full">
                            <Card className="relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer h-full flex flex-col border border-cyan-100/50 shadow-sm rounded-2xl bg-white">
                                <div className="relative w-full aspect-[3/2]">
                                    <Image
                                        src={resource.cover_image}
                                        alt={resource.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full shadow-sm">
                                        HOT
                                    </div>
                                </div>
                                <div className="p-3 flex-1 flex flex-col justify-between">
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
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
