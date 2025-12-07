import Link from 'next/link';
import { Suspense } from 'react';
import { getResourcesByStage } from '@/lib/cms';
import NewResourcesGrid from '@/components/home/NewResourcesGrid';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const metadata = {
    title: '启蒙英语',
    description: '适合0-6岁儿童的英语启蒙资源，包括动画、儿歌、绘本等',
};

export default async function EnlightenmentPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const pageSize = 24; // 3 rows * 8 columns
    const { data: resources, total } = await getResourcesByStage('启蒙', currentPage, pageSize);
    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section - 100px height with gentle colors */}
            <div className="h-[100px] bg-gradient-to-r from-yellow-100 via-orange-100 to-pink-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-orange-600">启蒙英语</h1>
                    <p className="text-sm text-orange-400 mt-1">快乐启蒙，趣味学习</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg" />}>
                    <div className="mt-8">
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
                            <Link href={`/category/enlightenment?page=${currentPage - 1}`}>
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
                                className={currentPage === p ? "bg-orange-500 hover:bg-orange-600" : ""}
                                asChild
                            >
                                <Link href={`/category/enlightenment?page=${p}`}>
                                    {p}
                                </Link>
                            </Button>
                        );
                    })}

                    <Button variant="outline" size="icon" disabled={currentPage >= totalPages} asChild={currentPage < totalPages}>
                        {currentPage < totalPages ? (
                            <Link href={`/category/enlightenment?page=${currentPage + 1}`}>
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
