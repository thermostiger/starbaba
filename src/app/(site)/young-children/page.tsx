import CategoryLayout from '@/components/resources/CategoryLayout';

export const metadata = {
    title: '幼儿英语 - K12书架',
    description: '适合3-6岁幼儿的英语启蒙资源',
};

async function getInitialResources() {
    // In a real Server Component, we could import DB logic directly.
    // However, since we are using an internal API, we need an absolute URL.
    // For simplicity in this setup without complex absolute URL handling for server-side fetch to localhost,
    // we can use a client-side fetch wrapper or assume the CategoryLayout handles initial fetch if data is empty.
    // BUT user asked for "Server Components for initial data".
    // Let's assume we can fetch from the deployed URL or handling it gracefully.
    // Actually, for this specific environment where we can't easily guess the localhost port/domain for server-side fetching,
    // we might just pass empty and let the client hydrate, OR better: 
    // Just instantiate the client component and let IT fetch initial data if "initialResources" is empty.
    // BUT to strictly follow "Server Components for initial data", I should try.
    // Let's rely on standard Next.js patterns.
    // Since I cannot guarantee the absolute URL (http://localhost:3000) works in this constrained environment for server-side fetching,
    // I will try to use the `CategoryLayout`'s client-side fetching for the "Digital Library" experience which is often better with skeletons anyway.
    // WAIT! User specifically asked: "Next.js Server Components for initial data".
    // I must stick to that. 
    // Since I don't have a direct DB client exported for Server Components in this codebase context easily found (Supabase client usually requires setup),
    // I will mock the "getInitialResources" to return `undefined` and allow the Client Component to fetch immediately on mount if no data is passed,
    // or better, I will assume the user has configured `process.env.NEXT_PUBLIC_SITE_URL`.

    // For now, I will update the page to use CategoryLayout.
    return [];
}

export default async function YoungChildrenPage() {
    // Attempting to fetch data
    let initialResources = [];
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/admin/resources?assignedPage=幼儿英语&limit=12&isPublished=true`, { cache: 'no-store' });
        const data = await res.json();
        initialResources = data.docs || [];
    } catch (e) {
        console.warn("Server fetch failed, falling back to client fetch", e);
    }

    // Featured Resource (Mock logic: take the first one or a specific one)
    const featuredResource = initialResources.length > 0 ? initialResources[0] : undefined;
    const remainingResources = initialResources.length > 0 ? initialResources.slice(1) : [];

    return (
        <CategoryLayout
            title="幼儿英语启蒙"
            subtitle="适合 3-6 岁 · 磨耳朵 · 语感培养 · 自然拼读"
            category="幼儿英语"
            initialResources={initialResources}
            featuredResource={featuredResource}
            filters={[
                { label: '磨耳朵儿歌', value: 'nursery_rhymes' },
                { label: '启蒙动画', value: 'cartoons' },
                { label: '绘本 PDF', value: 'picture_books' },
                { label: '自然拼读', value: 'phonics' }
            ]}
            cardVariant="portrait"
        />
    );
}
