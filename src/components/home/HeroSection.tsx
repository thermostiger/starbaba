'use client';

import { useState } from 'react';
import { Search, Sparkles, BookOpen, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const HOT_SEARCHES = ['Peppa Pig', '牛津树', '自然拼读', '英语儿歌', 'BBC纪录片'];

export default function HeroSection() {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);



    return (
        <section className="relative w-full overflow-hidden bg-white">
            {/* Elegant Background Gradients - Enhanced for "Star" theme */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

                {/* Intensified blobs */}
                <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-500/40 rounded-full filter blur-[100px] animate-pulse-slow" />
                <div className="absolute top-[10%] -right-[15%] w-[50%] h-[50%] bg-purple-500/40 rounded-full filter blur-[100px] animate-pulse-slow animation-delay-2000" />
                <div className="absolute bottom-[0%] left-[20%] w-[40%] h-[40%] bg-rose-400/30 rounded-full filter blur-[100px] animate-pulse-slow animation-delay-4000" />

                {/* Bottom Fade for smooth transition */}
                <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />

                {/* Decorative Stars */}
                <div className="absolute top-20 left-[15%] text-amber-200/60 animate-bounce-slow">
                    <Star className="w-8 h-8 fill-current" />
                </div>
                <div className="absolute bottom-32 right-[10%] text-blue-200/60 animate-bounce-slow animation-delay-1000">
                    <Star className="w-6 h-6 fill-current" />
                </div>
                <div className="absolute top-40 right-[25%] text-rose-200/40 animate-pulse">
                    <Sparkles className="w-5 h-5" />
                </div>
            </div>

            <div className="relative px-4 pt-12 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col items-center text-center">
                {/* Compact Content */}
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 animate-fade-in-up">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-rose-500 bg-clip-text text-transparent inline-block pb-1">
                        精选英语原版资源
                    </span>
                </h1>

                <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-500 mb-6 animate-fade-in-up animation-delay-100">
                    拒绝滥竽充数，让英语学习更加简单、高效。
                </p>

                {/* Search Box - More Compact */}
                <div className="w-full max-w-2xl relative animate-fade-in-up animation-delay-200 z-20 mb-10">
                    <div className={`relative group transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
                        <div className={`absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-2xl blur-md transition duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}`} />
                        <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-slate-100">
                            <div className="pl-5 text-slate-400">
                                <Search className="w-5 h-5" />
                            </div>
                            <form
                                className="flex-1 flex items-center"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (query.trim()) window.location.href = `/search?q=${encodeURIComponent(query)}`;
                                }}
                            >
                                <Input
                                    type="text"
                                    placeholder="搜索资源：如 Peppa Pig, 牛津树..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                                    className="w-full h-14 px-4 bg-transparent border-none text-base placeholder:text-slate-400 focus:ring-0 focus-visible:ring-0 rounded-xl"
                                />
                                <div className="pr-2">
                                    <Button type="submit" className="h-10 px-6 rounded-lg bg-blue-900 text-white hover:bg-blue-800 transition-colors shadow-sm">
                                        搜索
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Quick Tags */}
                    {/* Quick Tags - Rounded Pills */}
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                        {HOT_SEARCHES.map((term) => (
                            <button
                                key={term}
                                onClick={() => {
                                    setQuery(term);
                                    window.location.href = `/search?q=${encodeURIComponent(term)}`;
                                }}
                                className="px-4 py-1.5 bg-white/80 border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 hover:shadow-sm transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
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
