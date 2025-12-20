import { Suspense } from 'react';
import HeroHotSection from '@/components/home/HeroHotSection';
import HeroSection from '@/components/home/HeroSection';
import NewResourcesGrid from '@/components/home/NewResourcesGrid';
import MembershipPlans from '@/components/home/MembershipPlans';
import DocumentaryGrid from '@/components/home/DocumentaryGrid';
import { getHotResources, getNewResources, getDocumentaries } from '@/lib/cms';

export const metadata = {
    title: '首页',
};

export default async function HomePage() {
    // Fetch data server-side
    const hotResources = await getHotResources(10);
    const newResources = await getNewResources(16);
    const { data: documentaries } = await getDocumentaries(1, 8);

    return (
        <>
            <HeroSection />

            <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
                <HeroHotSection resources={hotResources} />
            </Suspense>

            <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
                <NewResourcesGrid resources={newResources} rows={2} />
            </Suspense>

            <MembershipPlans />

            <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
                <DocumentaryGrid documentaries={documentaries} showPagination={false} />
            </Suspense>
        </>
    );
}
