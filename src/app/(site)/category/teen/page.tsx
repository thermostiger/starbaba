import Link from 'next/link';
import { Suspense } from 'react';
import { getResourcesByStage } from '@/lib/cms';
import NewResourcesGrid from '@/components/home/NewResourcesGrid';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const metadata = {
    title: '青少年英语',
    description: '适合7-15岁青少年的英语进阶资源，包括分级阅读、原版小说、演讲等',
};

export default async function TeenPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const pageSize = 24; // 3 rows * 8 columns
    const { data: resources, total } = await getResourcesByStage('青少年', currentPage, pageSize);
    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section - 100px height with mature colors */}
            <div className="h-[100px] bg-gradient-to-r from-blue-100 via-indigo-100 to-violet-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">青少年英语</h1>
                    <p className="text-sm text-indigo-500 mt-1 font-medium">进阶提升，拓展视野</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-4">
                <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg" />}>
                    <div className="mt-4">
                        <NewResourcesGrid
                            resources={resources}
                            rows={3}
                            cardWidth="180px"
                            cardHeight="230px"
                            hideHeader={true}
                        />
                    </div>
                </Suspense>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-4 mt-12 mb-8">
                    <Button variant="outline" size="icon" disabled={currentPage <= 1} asChild={currentPage > 1}>
                        {currentPage > 1 ? (
                            <Link href={`/category/teen?page=${currentPage - 1}`}>
                                <ChevronLeft className="h-4 w-4" />
                            </Link>
                        ) : (
                            <span><ChevronLeft className="h-4 w-4" /></span>
                        )}
                    </Button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                        // Simple pagination logic: show all for now or limit if too many
                        if (totalPages > 7 && Math.abs(currentPage - p) > 2 && p !== 1 && p !== totalPages) {
                            if (Math.abs(currentPage - p) === 3) return <span key={p} className="text-muted-foreground">...</span>;
                            return null;
                        }
                        return (
                            <Button
                                key={p}
                                variant={currentPage === p ? "default" : "outline"}
                                className={currentPage === p ? "bg-indigo-500 hover:bg-indigo-600" : ""}
                                asChild
                            >
                                <Link href={`/category/teen?page=${p}`}>
                                    {p}
                                </Link>
                            </Button>
                        );
                    })}

                    <Button variant="outline" size="icon" disabled={currentPage >= totalPages} asChild={currentPage < totalPages}>
                        {currentPage < totalPages ? (
                            <Link href={`/category/teen?page=${currentPage + 1}`}>
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        ) : (
                            <span><ChevronRight className="h-4 w-4" /></span>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
