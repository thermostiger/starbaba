import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import NewResourcesGrid from '@/components/home/NewResourcesGrid';
import { getNewResources } from '@/lib/cms';

const CATEGORIES = {
    'animation': { name: '英语动画', description: '精选优质英语动画片，寓教于乐' },
    'books': { name: '分级绘本', description: '经典分级阅读绘本，循序渐进' },
    'songs': { name: '英语儿歌', description: '朗朗上口的英语儿歌，培养语感' },
    'courses': { name: '在线课程', description: '系统化英语学习课程' },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const category = CATEGORIES[slug as keyof typeof CATEGORIES];

    if (!category) {
        return { title: '分类未找到' };
    }

    return {
        title: category.name,
        description: category.description,
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const category = CATEGORIES[slug as keyof typeof CATEGORIES];

    if (!category) {
        notFound();
    }

    const resources = await getNewResources(24);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
                <p className="text-lg text-muted-foreground">{category.description}</p>
            </div>

            <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg" />}>
                <NewResourcesGrid resources={resources} rows={3} />
            </Suspense>
        </div>
    );
}

export async function generateStaticParams() {
    return Object.keys(CATEGORIES).map((slug) => ({
        slug,
    }));
}
