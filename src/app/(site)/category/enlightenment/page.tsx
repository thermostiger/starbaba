import { Suspense } from 'react';
import { getResourcesByStage } from '@/lib/cms';
import NewResourcesGrid from '@/components/home/NewResourcesGrid';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const metadata = {
    title: '启蒙英语',
    description: '适合0-6岁儿童的英语启蒙资源，包括动画、儿歌、绘本等',
};

export default async function EnlightenmentPage() {
    const resources = await getResourcesByStage('启蒙', 24);

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
                    <NewResourcesGrid resources={resources} rows={3} />
                </Suspense>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-4 mt-12 mb-8">
                    <Button variant="outline" size="icon" disabled>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="default" className="bg-orange-500 hover:bg-orange-600">1</Button>
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
