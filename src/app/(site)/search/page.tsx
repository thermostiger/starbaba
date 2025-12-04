'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    const [query, setQuery] = useState(initialQuery);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto mb-12">
                <h1 className="text-4xl font-bold mb-8 text-center">搜索资源</h1>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="搜绘本、儿歌、语法、听力…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-12 pr-4 py-6 text-lg rounded-xl border-2"
                    />
                    <Button
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500"
                    >
                        搜索
                    </Button>
                </div>
            </div>

            {/* Search Results - Placeholder */}
            <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                    {query ? `搜索 "${query}" 的结果将在此显示` : '请输入关键词开始搜索'}
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                    提示：搜索功能需要连接到实际的CMS后端
                </p>
            </div>
        </div>
    );
}
