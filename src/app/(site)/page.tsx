import { Suspense } from 'react';
import HeroHotSwiper from '@/components/home/HeroHotSwiper';
import GlobalSearch from '@/components/home/GlobalSearch';
import NewResourcesGrid from '@/components/home/NewResourcesGrid';
import MembershipPlans from '@/components/home/MembershipPlans';
import DocumentaryGrid from '@/components/home/DocumentaryGrid';
import SafetyBannerSwiper from '@/components/home/SafetyBannerSwiper';
import { getHotResources, getNewResources, getDocumentaries } from '@/lib/cms';

export const metadata = {
    title: '首页',
};

export default async function HomePage() {
    // Fetch data server-side
    const hotResources = await getHotResources(8);
    const newResources = await getNewResources(16);
    const documentaries = await getDocumentaries(6);

    return (
        <>
            <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
                <HeroHotSwiper resources={hotResources} />
            </Suspense>

            <GlobalSearch />

            <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
                <NewResourcesGrid resources={newResources} rows={2} />
            </Suspense>

            <MembershipPlans />

            <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
                <DocumentaryGrid documentaries={documentaries} />
            </Suspense>

            <SafetyBannerSwiper />
        </>
    );
}
