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
        <section className="py-12 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
                <div className="absolute top-10 right-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative">
                <div className="flex items-center justify-center mb-8 space-x-2">
                    <span className="text-2xl">🔥</span>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        本周热门资源
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {resources.map((resource) => (
                        <Link key={resource.id} href={`/resource/${resource.id}`} className="group block">
                            <Card className="overflow-hidden h-72 relative transition-all duration-300 border-0 shadow-md rounded-2xl group-hover:shadow-xl group-hover:-translate-y-1">
                                <div className="relative h-full w-full">
                                    <Image
                                        src={resource.coverImage}
                                        alt={resource.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                                        <div className="inline-block px-2.5 py-1 bg-primary/90 backdrop-blur-sm rounded-lg text-xs font-bold mb-2 shadow-sm">
                                            {resource.stage}
                                        </div>
                                        <h3 className="font-bold text-lg mb-1 line-clamp-2 leading-tight group-hover:text-orange-200 transition-colors">
                                            {resource.title}
                                        </h3>
                                        <p className="text-xs text-gray-300 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            {resource.description}
                                        </p>
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
