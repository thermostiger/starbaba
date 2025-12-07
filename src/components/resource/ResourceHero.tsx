import Image from 'next/image';
import { Resource } from '@/types';
import { Sparkles, Clock, Users } from 'lucide-react';

interface ResourceHeroProps {
    resource: Resource;
}

export default function ResourceHero({ resource }: ResourceHeroProps) {
    return (
        <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-16 overflow-hidden">
            {/* Animated gradient orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-10 items-start">
                    {/* Left: Cover Image with modern styling */}
                    <div className="w-full lg:w-auto shrink-0">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                            <div className="relative w-full lg:w-[280px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                                <Image
                                    src={resource.coverImage}
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-lg mb-4">
                            <Sparkles className="w-4 h-4" />
                            <span>{resource.category || '精选资源'}</span>
                        </div>

                        <h1 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                            {resource.title}
                        </h1>

                        {/* Info cards row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {/* Pricing Card - Glassmorphism style */}
                            <div className="backdrop-blur-xl bg-white/70 rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white text-lg">💰</span>
                                    </div>
                                    <span className="font-semibold text-gray-700">价格方案</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">普通用户</span>
                                        <span className="font-bold text-lg bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                                            ¥{resource.price}
                                        </span>
                                    </div>
                                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">VIP会员</span>
                                        <span className="font-bold text-lg bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                                            免费
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Info Card - Glassmorphism style */}
                            <div className="backdrop-blur-xl bg-white/70 rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white text-lg">ℹ️</span>
                                    </div>
                                    <span className="font-semibold text-gray-700">资源信息</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <Clock className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                        <div className="flex-1">
                                            <div className="text-xs text-gray-500 mb-0.5">有效期</div>
                                            <div className="text-sm font-medium text-gray-700">永久有效</div>
                                        </div>
                                    </div>
                                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                                    <div className="flex items-start gap-3">
                                        <Users className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                                        <div className="flex-1">
                                            <div className="text-xs text-gray-500 mb-0.5">适合年龄</div>
                                            <div className="text-sm font-medium text-gray-700">2-15岁</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed">
                            {resource.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
