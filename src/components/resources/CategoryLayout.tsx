'use client';

import { useState, useEffect } from 'react';
import { Resource } from '@/types';
import ResourceCard from './ResourceCard';
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { MOCK_RESOURCES } from '@/lib/mockData';

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
    cardVariant = 'portrait' // Deprecated prop kept for compatibility but unused
}: CategoryLayoutProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Get params from URL
    const currentFilterValue = searchParams.get('sub_category') || 'all';
    const currentPageVal = Number(searchParams.get('page')) || 1;

    // Use Mock Data if initialResources is empty AND we are on the first page/default filter
    // This allows SSR pass-through if real data exists, but falls back to mock if not.
    // However, if we are Client-Side navigating, we might want to refetch.
    // For simplicity: If initial pass is empty, we set MOCK. 
    // Effect will override this if fetch returns real data or different data.
    // Use Mock Data if initialResources is empty AND we are on the first page/default filter
    // Also Pad with Mock Data if fetched initialResources > 0 but < 12 items
    let effectiveInitialResources = initialResources;

    if (effectiveInitialResources.length === 0 && currentPageVal === 1 && currentFilterValue === 'all') {
        effectiveInitialResources = MOCK_RESOURCES.slice(0, 12);
    } else if (effectiveInitialResources.length > 0 && effectiveInitialResources.length < 12) {
        const needed = 12 - effectiveInitialResources.length;
        const mocksToAdd = MOCK_RESOURCES.slice(0, needed).map((m, i) => ({
            ...m,
            id: `mock-padded-init-${i}` // Stable-ish ID
        }));
        effectiveInitialResources = [...effectiveInitialResources, ...mocksToAdd];
    }

    const [resources, setResources] = useState<Resource[]>(effectiveInitialResources);
    const [activeFilter, setActiveFilter] = useState(currentFilterValue);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    // Sync state with URL param changes
    useEffect(() => {
        setActiveFilter(currentFilterValue);
    }, [currentFilterValue]);

    // Fetch data when Filter or Page changes
    useEffect(() => {
        const fetchResources = async () => {
            setLoading(true);
            try {
                const filterQuery = activeFilter !== 'all' ? `&resource_info=${activeFilter}` : '';
                // Limit 12 = 3 full rows in 5-col grid (1 featured 2x2 + 11 normal)
                const res = await fetch(`/api/admin/resources?assignedPage=${category}&page=${currentPageVal}&limit=12&isPublished=true${filterQuery}`);
                const data = await res.json();

                let fetchedResources = data.docs || [];
                let calculatedTotalPages = data.totalPages || 1;

                // Pad with Mock Data if fewer than 12 items
                if (fetchedResources.length > 0 && fetchedResources.length < 12) {
                    const needed = 12 - fetchedResources.length;
                    const mocksToAdd = MOCK_RESOURCES.slice(0, needed).map((m, i) => ({
                        ...m,
                        id: `mock-padded-${Date.now()}-${i}` // Ensure unique keys
                    }));
                    fetchedResources = [...fetchedResources, ...mocksToAdd];
                } else if (fetchedResources.length === 0 && currentPageVal === 1 && activeFilter === 'all') {
                    // Fallback to full mock data if no real data found on default view
                    fetchedResources = MOCK_RESOURCES.slice(0, 12); // Ensure 12 mocks
                    calculatedTotalPages = 1;
                }

                setResources(fetchedResources);
                setTotalPages(calculatedTotalPages);
            } catch (err) {
                console.error(err);
                if (currentPageVal === 1 && activeFilter === 'all') {
                    setResources(MOCK_RESOURCES.slice(0, 12));
                }
            } finally {
                setLoading(false);
            }
        };

        // If we are strictly relying on initialResources from server for the first render, 
        // we might want to skip this fetch if inputs haven't changed.
        // But since we want to handle the "Empty -> Mock" logic seamlessly and "Pagination" logic:
        // We will run this effect. 
        // Optimization: If initialResources was populated and matches params, skip? 
        // For safety/easiness: just fetch. 
        fetchResources();
    }, [activeFilter, category, currentPageVal]);

    const handleFilterClick = (filterValue: string) => {
        const params = new URLSearchParams(searchParams);
        if (filterValue === 'all') {
            params.delete('sub_category');
        } else {
            params.set('sub_category', filterValue);
        }
        params.set('page', '1'); // Reset to page 1
        router.push(`${pathname}?${params.toString()}`);
    };

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
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
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="aspect-[4/3] bg-slate-200 animate-pulse rounded-xl" />
                        ))}
                    </div>
                ) : resources.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="inline-block p-4 rounded-full bg-slate-100 mb-4">
                            <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">暂无相关资源</h3>
                        <p className="text-slate-500">试着切换其他筛选项看看</p>
                    </div>
                ) : (
                    <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 auto-rows-min`}>
                        {resources.map((resource, index) => {
                            // Only first item on first page is featured
                            const isFirst = index === 0 && currentPageVal === 1;
                            return (
                                <ResourceCard
                                    key={resource.id}
                                    resource={resource}
                                    isFeatured={isFirst}
                                    className={isFirst ? 'md:col-span-2 md:row-span-2' : ''}
                                />
                            )
                        })}
                    </div>
                )}

                {/* 4. Pagination (Standard UI) */}
                {!loading && (
                    <div className="mt-12 flex justify-center items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(Math.max(1, currentPageVal - 1))}
                            disabled={currentPageVal === 1}
                            className="bg-white hover:bg-slate-50"
                        >
                            上一页
                        </Button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1).map(p => {
                                // Basic Pagination Logic
                                // If totalPages is 1, just show 1.
                                if (totalPages <= 1 && p === 1) {
                                    return (
                                        <button
                                            key={p}
                                            disabled
                                            className={`w-9 h-9 rounded-lg text-sm font-bold transition-all bg-blue-600 text-white shadow-md`}
                                        >
                                            {p}
                                        </button>
                                    )
                                }

                                if (p === 1 || p === totalPages || (p >= currentPageVal - 1 && p <= currentPageVal + 1)) {
                                    return (
                                        <button
                                            key={p}
                                            onClick={() => handlePageChange(p)}
                                            className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${currentPageVal === p
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 hover:border-blue-200'
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    );
                                } else if (p === currentPageVal - 2 || p === currentPageVal + 2) {
                                    return <span key={p} className="text-slate-400 text-xs text-center w-6">...</span>;
                                }
                                return null;
                            })}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(Math.min(totalPages, currentPageVal + 1))}
                            disabled={currentPageVal >= totalPages}
                            className="bg-white hover:bg-slate-50"
                        >
                            下一页
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
