import Image from 'next/image';
import { Resource } from '@/types';

interface ResourceHeroProps {
    resource: Resource;
}

export default function ResourceHero({ resource }: ResourceHeroProps) {
    return (
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-9 overflow-hidden">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-red-500/10"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Left: Cover Image */}
                    <div className="w-full md:w-[220px] shrink-0">
                        <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl ring-2 ring-white/10 hover:ring-orange-500/50 transition-all duration-300">
                            <Image
                                src={resource.coverImage}
                                alt={resource.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="flex-1 min-w-0">
                        <h1 className="text-xl md:text-2xl font-bold mb-5 leading-tight text-white/95">
                            {resource.title}
                        </h1>

                        <div className="flex flex-col md:flex-row gap-4 items-start">
                            {/* Pricing Box - 25% width */}
                            <div className="w-full md:w-1/4 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 backdrop-blur-sm border border-white/10">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                                        <div className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-orange-500"></span>
                                            <span className="text-xs text-gray-300">普通</span>
                                        </div>
                                        <span className="font-bold text-sm bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">{resource.price}元</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-red-400 to-orange-500"></span>
                                            <span className="text-xs text-gray-300">会员</span>
                                        </div>
                                        <span className="font-bold text-sm bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">免费</span>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Info - Right side */}
                            <div className="flex-1 flex flex-col gap-3 text-sm text-gray-300">
                                <div className="flex items-start gap-2">
                                    <span className="text-gray-500 whitespace-nowrap">有效期:</span>
                                    <span>购买后永久有效</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-gray-500 whitespace-nowrap">适合年龄:</span>
                                    <span>2-15岁</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
