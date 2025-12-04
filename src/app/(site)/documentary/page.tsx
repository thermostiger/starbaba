import { Suspense } from 'react';
import { getDocumentaries } from '@/lib/cms';
import DocumentaryGrid from '@/components/home/DocumentaryGrid';

export const metadata = {
    title: '纪录片专区',
    description: 'BBC自然纪录片、科学纪录片，英文原声，适合儿童英语学习',
};

export default async function DocumentaryPage() {
    const documentaries = await getDocumentaries(20);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">科普纪录片专区</h1>
                <p className="text-lg text-muted-foreground">
                    精选BBC等优质纪录片，英文原声，开拓视野，提升英语听力
                </p>
            </div>

            <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg" />}>
                <DocumentaryGrid documentaries={documentaries} />
            </Suspense>
        </div>
    );
}
