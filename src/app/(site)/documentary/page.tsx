import { Suspense } from 'react';
import { getDocumentaries } from '@/lib/cms';
import DocumentaryGrid from '@/components/home/DocumentaryGrid';

export const metadata = {
    title: '纪录片专区',
    description: 'BBC自然纪录片、科学纪录片，英文原声，适合儿童英语学习',
};

export default async function DocumentaryPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const { data: documentaries, total } = await getDocumentaries(currentPage, 12);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section - 100px height with documentary theme colors */}
            <div className="h-[100px] bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">科普纪录片专区</h1>
                    <p className="text-sm text-emerald-500 mt-1 font-medium">精选BBC优质纪录片，开拓视野，提升听力</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-4">
                <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg" />}>
                    <DocumentaryGrid
                        documentaries={documentaries}
                        currentPage={currentPage}
                        totalPages={Math.ceil(total / 12)}
                    />
                </Suspense>
            </div>
        </div>
    );
}
