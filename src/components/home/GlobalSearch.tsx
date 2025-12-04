'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const HOT_SEARCHES = ['Peppa Pig', '牛津树', '自然拼读', '英语儿歌', 'BBC纪录片'];

export default function GlobalSearch() {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    return (
        <section className="py-12 bg-white">
            <div className="max-w-3xl mx-auto px-4">
                <div className="relative">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="搜绘本、儿歌、语法、听力…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                            className="pl-12 pr-4 py-6 text-lg rounded-xl border-2 focus:border-primary shadow-lg"
                        />
                    </div>

                    {/* Hot Searches Dropdown */}
                    {isFocused && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border p-4 z-10">
                            <div className="text-sm text-muted-foreground mb-2">热门搜索</div>
                            <div className="flex flex-wrap gap-2">
                                {HOT_SEARCHES.map((term) => (
                                    <button
                                        key={term}
                                        className="px-3 py-1 bg-muted hover:bg-primary hover:text-white rounded-full text-sm transition-colors"
                                        onClick={() => setQuery(term)}
                                    >
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
