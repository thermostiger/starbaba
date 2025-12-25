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

    const categories = [
        {
            title: '启蒙',
            subtitle: '0-6岁',
            icon: '👶',
            href: '/preschool',
            color: 'from-pink-500/10 to-rose-500/10',
            borderColor: 'border-rose-100',
            iconBg: 'bg-rose-50'
        },
        {
            title: '少儿',
            subtitle: '7-12岁',
            icon: '👦',
            href: '/kids',
            color: 'from-blue-500/10 to-indigo-500/10',
            borderColor: 'border-blue-100',
            iconBg: 'bg-blue-50'
        },
        {
            title: '少年',
            subtitle: '13-18岁',
            icon: '🎓',
            href: '/teens',
            color: 'from-amber-500/10 to-orange-500/10',
            borderColor: 'border-amber-100',
            iconBg: 'bg-amber-50'
        },
        {
            title: '科普',
            subtitle: '全年龄',
            icon: '🔭',
            href: '/science',
            color: 'from-emerald-500/10 to-teal-500/10',
            borderColor: 'border-emerald-100',
            iconBg: 'bg-emerald-50'
        }
    ];

    return (
        <section className="relative w-full overflow-hidden bg-white">
            {/* Elegant Background Gradients - Reduced intensity */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-50/50 rounded-full filter blur-[100px]" />
                <div className="absolute top-[10%] -right-[15%] w-[40%] h-[40%] bg-amber-50/40 rounded-full filter blur-[100px]" />
            </div>

            <div className="relative px-4 pt-12 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col items-center text-center">
                {/* Compact Content */}
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 animate-fade-in-up">
                    <span className="bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
                        专注 K12 英语原版资源
                    </span>
                </h1>

                <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-500 mb-8 animate-fade-in-up animation-delay-100">
                    海量绘本、儿歌、动画与纪录片，让英语学习更加简单、高效。
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
                    <div className="mt-4 flex flex-wrap justify-center gap-3">
                        {HOT_SEARCHES.map((term) => (
                            <button
                                key={term}
                                onClick={() => {
                                    setQuery(term);
                                    window.location.href = `/search?q=${encodeURIComponent(term)}`;
                                }}
                                className="text-xs text-slate-500 hover:text-blue-600 transition-colors"
                            >
                                #{term}
                            </button>
                        ))}
                    </div>
                </div>

                {/* AGE-BASED NAVIGATION CARDS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl animate-fade-in-up animation-delay-300">
                    {categories.map((cat) => (
                        <Link
                            key={cat.title}
                            href={cat.href}
                            className={`group relative overflow-hidden p-4 rounded-2xl border ${cat.borderColor} bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1 block`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                            <div className="relative z-10 flex flex-col items-center gap-2">
                                <div className={`w-12 h-12 ${cat.iconBg} rounded-xl flex items-center justify-center text-2xl shadow-inner`}>
                                    {cat.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">{cat.title}</h3>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-tight">{cat.subtitle}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
