import Image from 'next/image';
import { Resource } from '@/types';
import { Sparkles, Clock, Info } from 'lucide-react';

interface ResourceHeroProps {
    resource: Resource;
}

export default function ResourceHero({ resource }: ResourceHeroProps) {
    return (
        <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-4 overflow-hidden">
            {/* Animated gradient orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    {/* Left: Cover Image with modern styling */}
                    <div className="w-full lg:w-auto shrink-0">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                            <div className="relative w-full lg:w-[200px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                                <Image
                                    src={resource.cover_image || '/images/oxford.jpg'}
                                    alt={resource.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="flex-1 min-w-0">
                        {/* Category badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-semibold rounded-full shadow-lg mb-3">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{resource.category || '精选资源'}</span>
                        </div>

                        <h1 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                            {resource.title}
                        </h1>

                        {/* Info cards row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {/* Highlights Card - Glassmorphism style */}
                            <div className="h-full backdrop-blur-xl bg-white/60 rounded-2xl p-5 shadow-sm border border-white/40 hover:shadow-md hover:bg-white/80 transition-all duration-300 group/card">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center shadow-sm group-hover/card:scale-110 transition-transform duration-300">
                                        <Sparkles className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="font-bold text-gray-800 text-base">资源亮点</span>
                                </div>
                                <div className="space-y-2.5">
                                    {(resource.highlights ? resource.highlights.split('\n').filter(h => h.trim()) : [
                                        '高清画质，流畅播放',
                                        '中英双语字幕可选',
                                        '永久有效，随时观看'
                                    ]).slice(0, 4).map((highlight, index) => (
                                        <div key={index} className="flex items-start gap-2.5 text-sm text-gray-600/90 leading-relaxed">
                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0"></div>
                                            <span>{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Info Card - Glassmorphism style */}
                            <div className="h-full backdrop-blur-xl bg-white/60 rounded-2xl p-5 shadow-sm border border-white/40 hover:shadow-md hover:bg-white/80 transition-all duration-300 group/card">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center shadow-sm group-hover/card:scale-110 transition-transform duration-300">
                                        <Info className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="font-bold text-gray-800 text-base">资源信息</span>
                                </div>
                                <div className="space-y-2.5">
                                    {(resource.resource_info ? resource.resource_info.split('\n').filter(i => i.trim()) : ['永久有效 · 2-15岁']).slice(0, 4).map((info, index) => (
                                        <div key={index} className="flex items-center gap-2.5">
                                            <Clock className="w-4 h-4 text-blue-500/80 shrink-0" />
                                            <span className="text-sm text-gray-600/90 font-medium">{info}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
