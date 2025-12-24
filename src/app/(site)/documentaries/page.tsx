import CategoryLayout from '@/components/resources/CategoryLayout';

export const metadata = {
    title: '原声科普 - K12书架',
    description: 'Discovery, BBC等原声纪录片',
};

export default async function DocumentariesPage() {
    let initialResources = [];
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/admin/resources?assignedPage=原声科普&limit=12&isPublished=true`, { cache: 'no-store' });
        const data = await res.json();
        initialResources = data.docs || [];
    } catch (e) { console.warn("Fetch failed"); }

    const featuredResource = initialResources.length > 0 ? initialResources[0] : undefined;

    return (
        <CategoryLayout
            title="原声科普纪录片"
            subtitle="BBC · Discovery · 国家地理 · 探索世界"
            category="原声科普"
            initialResources={initialResources}
            featuredResource={featuredResource}
            filters={[
                { label: '自然地理', value: 'nature_geo' },
                { label: '历史人文', value: 'history' },
                { label: 'STEM/科技', value: 'stem' },
                { label: 'TED 演讲', value: 'ted' }
            ]}
            cardVariant="landscape"
        />
    );
}
