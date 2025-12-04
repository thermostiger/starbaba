import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import ResourceHero from '@/components/resource/ResourceHero';
import ResourceSidebar from '@/components/resource/ResourceSidebar';
import RelatedResources from '@/components/resource/RelatedResources';
import { getResourceById, getRelatedResources } from '@/lib/cms';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const resource = await getResourceById(id);

    if (!resource) {
        return {
            title: '资源未找到',
        };
    }

    return {
        title: resource.title,
        description: resource.description,
        openGraph: {
            title: resource.title,
            description: resource.description,
            images: [resource.coverImage],
        },
    };
}

export default async function ResourcePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const resource = await getResourceById(id);

    if (!resource) {
        notFound();
    }

    const relatedResources = await getRelatedResources(id, 4);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <ResourceHero resource={resource} />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-12">
                {/* Sidebar */}
                <div className="lg:col-span-1 order-2 lg:order-1">
                    <ResourceSidebar resource={resource} />
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 order-1 lg:order-2">
                    {/* Rich Content */}
                    <div className="prose max-w-none mb-8">
                        <h2>资源详情</h2>
                        {resource.content ? (
                            <div dangerouslySetInnerHTML={{ __html: resource.content }} />
                        ) : (
                            <p>{resource.description}</p>
                        )}
                    </div>

                    {/* Related Resources */}
                    <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg" />}>
                        <RelatedResources resources={relatedResources} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
