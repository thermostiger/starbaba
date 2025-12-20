'use client';

import { useState } from 'react';
import { Search, Sparkles, BookOpen, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const HOT_SEARCHES = ['Peppa Pig', '牛津树', '自然拼读', '英语儿歌', 'BBC纪录片'];

export default function HeroSection() {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    return (
        <section className="relative w-full overflow-hidden bg-[#FFFBF5]">
            {/* Elaborate Background with Premium Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] bg-gradient-to-br from-orange-200/40 via-yellow-100/40 to-transparent rounded-full filter blur-[100px] animate-pulse-slow" />
                <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] bg-gradient-to-bl from-blue-200/40 via-purple-100/40 to-transparent rounded-full filter blur-[100px] animate-pulse-slow animation-delay-2000" />
            </div>

            {/* Decorative Floating Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-[10%] opacity-20 animate-float-slow">
                    <Star className="w-12 h-12 text-orange-400 fill-orange-200" />
                </div>
                <div className="absolute bottom-32 right-[15%] opacity-20 animate-float">
                    <BookOpen className="w-16 h-16 text-blue-400 fill-blue-100" />
                </div>
                <div className="absolute top-32 right-[20%] opacity-15 animate-float-reverse">
                    <Sparkles className="w-10 h-10 text-yellow-500" />
                </div>
            </div>

            <div className="relative px-4 pt-16 pb-20 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col items-center text-center">
                {/* Badge */}
                <div className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium text-orange-600 bg-orange-100/80 backdrop-blur-sm rounded-full border border-orange-200 shadow-sm animate-fade-in-up">
                    <span className="flex w-2 h-2 mr-2 bg-orange-500 rounded-full animate-pulse" />
                    每日更新 · 严选精品资源
                </div>

                {/* Main Headlines */}
                <h1 className="text-4xl xs:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 animate-fade-in-up animation-delay-100 text-balance">
                    <span className="block mb-2">汇聚全球资源</span>
                    <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent transform hover:scale-105 transition-transform cursor-default inline-block">
                        陪伴孩子快乐成长
                    </span>
                </h1>

                <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-8 animate-fade-in-up animation-delay-200 text-balance leading-relaxed">
                    精选海量绘本、儿歌、动画与纪录片
                    <br className="hidden sm:block" />
                    让每一次陪伴都充满成长的惊喜
                </p>

                {/* Search Interaction */}
                <div className="w-full max-w-2xl relative animate-fade-in-up animation-delay-300 z-10">
                    <div className={`relative group transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
                        <div className={`absolute -inset-1 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500 ${isFocused ? 'opacity-50' : ''}`} />
                        <div className="relative flex items-center bg-white rounded-xl shadow-xl shadow-orange-500/10 border border-slate-100">
                            <div className="pl-5 text-slate-400">
                                <Search className="w-6 h-6" />
                            </div>
                            <Input
                                type="text"
                                placeholder="搜索海量资源：如 Peppa Pig, 牛津树..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                                className="w-full h-16 px-4 bg-transparent border-none text-lg placeholder:text-slate-400 focus:ring-0 focus-visible:ring-0 rounded-xl"
                            />
                            <div className="pr-2">
                                <Button size="lg" className="h-12 px-8 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                                    搜索
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Hot Search Tags */}
                    <div className="mt-6 flex flex-wrap justify-center items-center gap-2 text-sm text-slate-500">
                        <span className="mr-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Hot Trend:</span>
                        {HOT_SEARCHES.map((term, index) => (
                            <button
                                key={term}
                                onClick={() => setQuery(term)}
                                className="px-3 py-1 bg-white/60 hover:bg-white border border-transparent hover:border-orange-200 rounded-full transition-all duration-200 hover:shadow-md hover:text-orange-600"
                                style={{ animationDelay: `${400 + index * 50}ms` }}
                            >
                                {term}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
