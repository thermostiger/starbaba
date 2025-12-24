import CategoryLayout from '@/components/resources/CategoryLayout';

export const metadata = {
    title: '少儿英语 - K12书架',
    description: '适合7-12岁小学生的进阶英语资源',
};

export default async function ChildrenPage() {
    let initialResources = [];
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/admin/resources?assignedPage=少儿英语&limit=12&isPublished=true`, { cache: 'no-store' });
        const data = await res.json();
        initialResources = data.docs || [];
    } catch (e) { console.warn("Fetch failed"); }

    const featuredResource = initialResources.length > 0 ? initialResources[0] : undefined;

    return (
        <CategoryLayout
            title="少儿英语进阶"
            subtitle="适合 7-12 岁 · 桥梁书 · 初章书 · 核心词汇"
            category="少儿英语"
            initialResources={initialResources}
            featuredResource={featuredResource}
            filters={[
                { label: '分级阅读', value: 'graded_readers' },
                { label: '桥梁书/章节书', value: 'chapter_books' },
                { label: '原版教材', value: 'textbooks' },
                { label: '语法与词汇', value: 'grammar_vocab' }
            ]}
            cardVariant="portrait"
        />
    );
}
