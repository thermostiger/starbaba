import { Suspense } from 'react';
import { getResourcesByStage } from '@/lib/cms';
import NewResourcesGrid from '@/components/home/NewResourcesGrid';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const metadata = {
    title: '青少年英语',
    description: '适合7-15岁青少年的英语进阶资源，包括分级阅读、原版小说、演讲等',
};

export default async function TeenPage() {
    const resources = await getResourcesByStage('青少年', 24);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section - 100px height with mature colors */}
            <div className="h-[100px] bg-gradient-to-r from-blue-100 via-indigo-100 to-violet-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-indigo-600">青少年英语</h1>
                    <p className="text-sm text-indigo-400 mt-1">进阶提升，拓展视野</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg" />}>
                    <NewResourcesGrid resources={resources} rows={3} />
                </Suspense>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-4 mt-12 mb-8">
                    <Button variant="outline" size="icon" disabled>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="default" className="bg-indigo-500 hover:bg-indigo-600">1</Button>
                    <Button variant="outline">2</Button>
                    <Button variant="outline">3</Button>
                    <span className="text-muted-foreground">...</span>
                    <Button variant="outline">10</Button>
                    <Button variant="outline" size="icon">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
