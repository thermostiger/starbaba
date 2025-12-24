'use client';

import { useState, useEffect } from 'react';
import { Resource } from '@/types';
import ResourceCard from './ResourceCard';
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Image from 'next/image';

interface FilterOption {
    label: string;
    value: string;
}

interface CategoryLayoutProps {
    title: string;
    subtitle: string;
    category: string; // Used for API fetching as assignedPage
    initialResources: Resource[];
    featuredResource?: Resource;
    filters: FilterOption[];
    cardVariant?: 'portrait' | 'landscape';
}

export default function CategoryLayout({
    title,
    subtitle,
    category,
    initialResources = [],
    featuredResource,
    filters = [],
    cardVariant = 'portrait'
}: CategoryLayoutProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Get initial filter from URL or default to 'all'
    const currentFilterValue = searchParams.get('sub_category') || 'all';

    const [resources, setResources] = useState<Resource[]>(initialResources);
    const [activeFilter, setActiveFilter] = useState(currentFilterValue);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // Sync state with URL param changes (e.g. back button)
    useEffect(() => {
        setActiveFilter(currentFilterValue);
    }, [currentFilterValue]);

    // Refetch when activeFilter changes (except on initial mount if data is already passed)
    // Actually, distinct from initial load, we might need to fetch if the *URL* filter is different from "All" 
    // and initialResources might be just "All" data or pre-filtered?
    // Assuming initialResources matches the initial URL state is tricky without Server Component passing filtered data.
    // For simplicity: unique fetch on filter change.
    useEffect(() => {
        const fetchFiltered = async () => {
            // Note: If initialResources are populated and we are on 'all' (default), we might skip first fetch?
            // But if user lands on ?sub_category=phonics, we need to ensure we show phonics.
            // We'll rely on client-side fetch for filtering for now to ensure consistency.
            setPage(1);
            setResources([]);
            setHasMore(true);
            try {
                const filterQuery = activeFilter !== 'all' ? `&resource_info=${activeFilter}` : '';
                // Note: User requested filter value for DB filtering. 
                // We assume 'activeFilter' (the english key) is what the backend expects or data contains?
                // Or should we use the Label? The user prompt said: "value (for URL query param or DB filtering)"
                // So we use the value.

                const res = await fetch(`/api/admin/resources?assignedPage=${category}&page=1&limit=12&isPublished=true${filterQuery}`);
                const data = await res.json();
                setResources(data.docs || []);
                if (data.totalPages <= 1) setHasMore(false);
            } catch (err) {
                console.error(err);
            }
        };

        fetchFiltered();
    }, [activeFilter, category]);


    const handleLoadMore = async () => {
        setLoadingMore(true);
        const nextPage = page + 1;
        try {
            const filterQuery = activeFilter !== 'all' ? `&resource_info=${activeFilter}` : '';
            const res = await fetch(`/api/admin/resources?assignedPage=${category}&page=${nextPage}&limit=12&isPublished=true${filterQuery}`);
            const data = await res.json();

            if (data.docs && data.docs.length > 0) {
                setResources(prev => [...prev, ...data.docs]);
                setPage(nextPage);
                if (data.page >= data.totalPages) setHasMore(false);
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingMore(false);
        }
    };

    const handleFilterClick = (filterValue: string) => {
        const params = new URLSearchParams(searchParams);
        if (filterValue === 'all') {
            params.delete('sub_category');
        } else {
            params.set('sub_category', filterValue);
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* 1. Page Header (Hero Section) - Compact */}
            <div className="bg-blue-50 border-b border-blue-100 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 py-8 md:py-10 relative z-10">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-4">
                        <div className="text-center md:text-left">
                            <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">{title}</h1>
                            <p className="text-sm md:text-base text-blue-600/80">{subtitle}</p>
                        </div>

                        {/* Stats / Trust Badges */}
                        <div className="flex items-center gap-3 text-xs text-blue-500 font-medium bg-white/50 px-3 py-1.5 rounded-full backdrop-blur-sm border border-blue-100">
                            <span className="flex items-center"><CheckBadge /> 原版引进</span>
                            <span className="w-px h-3 bg-blue-200"></span>
                            <span className="flex items-center"><CheckBadge /> 每日更新</span>
                        </div>
                    </div>
                </div>

                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-100/50 to-transparent pointer-events-none" />
            </div>

            {/* 2. Filter Bar (Sticky) */}
            <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-3 overflow-x-auto py-3 scrollbar-hide">
                        <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <button
                            onClick={() => handleFilterClick('all')}
                            className={`px-3.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${activeFilter === 'all'
                                    ? 'bg-blue-800 text-white shadow-md'
                                    : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700'
                                }`}
                        >
                            全部
                        </button>
                        {filters.map(filter => (
                            <button
                                key={filter.value}
                                onClick={() => handleFilterClick(filter.value)}
                                className={`px-3.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${activeFilter === filter.value
                                        ? 'bg-blue-800 text-white shadow-md'
                                        : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700'
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. The Resource Grid */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                {resources.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="inline-block p-4 rounded-full bg-slate-100 mb-4">
                            <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">暂无相关资源</h3>
                        <p className="text-slate-500">试着切换其他筛选项看看</p>
                    </div>
                ) : (
                    <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8`}>
                        {resources.map(resource => (
                            <ResourceCard
                                key={resource.id}
                                resource={resource}
                                variant={cardVariant}
                                isFeatured={featuredResource && resource.id === featuredResource.id}
                            />
                        ))}
                    </div>
                )}

                {/* 4. Pagination / Load More */}
                {hasMore && resources.length > 0 && (
                    <div className="mt-16 text-center">
                        <Button
                            onClick={handleLoadMore}
                            disabled={loadingMore}
                            variant="secondary"
                            className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-8 py-6 rounded-xl font-medium text-base w-full md:w-auto min-w-[200px]"
                        >
                            {loadingMore ? '加载中...' : '加载更多资源'}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

function CheckBadge() {
    return (
        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2" />
    )
}
