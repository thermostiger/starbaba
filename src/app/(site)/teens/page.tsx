import CategoryLayout from '@/components/resources/CategoryLayout';

export const metadata = {
    title: '青少年英语 - K12书架',
    description: '适合13-18岁中学生的沉浸式英语资源',
};

export default async function TeenagersPage() {
    let initialResources = [];
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/admin/resources?assignedPage=青少年英语&limit=12&isPublished=true`, { cache: 'no-store' });
        const data = await res.json();
        initialResources = data.docs || [];
    } catch (e) { console.warn("Fetch failed"); }

    const featuredResource = initialResources.length > 0 ? initialResources[0] : undefined;

    return (
        <CategoryLayout
            title="青少年英语"
            subtitle="适合 13-18 岁 · 原版小说 · 深度阅读 · 独立思考"
            category="青少年英语"
            initialResources={initialResources}
            featuredResource={featuredResource}
            filters={[
                { label: '原版小说', value: 'novels' },
                { label: '剑桥考级', value: 'exams' },
                { label: '学术英语', value: 'academic' },
                { label: '青少美剧', value: 'tv_series' }
            ]}
            cardVariant="portrait"
        />
    );
}
