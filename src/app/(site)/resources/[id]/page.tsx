import { getResourceById } from '@/lib/cms';
import { notFound } from 'next/navigation';
import ResourceHero from '@/components/resource/ResourceHero';
import ResourceSidebar from '@/components/resource/ResourceSidebar';
import NewResourcesGrid from '@/components/home/NewResourcesGrid';
import { getResourcesByStage } from '@/lib/cms';
import Link from 'next/link';
import { Home, ChevronRight, FileText, HelpCircle } from 'lucide-react';

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

    // Fetch related resources only for non-documentary resources
    const isDocumentary = id.startsWith('d');
    const relatedResources = isDocumentary
        ? []
        : (await getResourcesByStage(resource.stage, 1, 4)).data;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Full Width Hero */}
            <ResourceHero resource={resource} />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Sidebar (1 col) */}
                    <div className="lg:col-span-1 order-2 lg:order-1">
                        <ResourceSidebar resource={resource} />
                    </div>

                    {/* Right Content (3 cols) */}
                    <div className="lg:col-span-3 order-1 lg:order-2 space-y-8">
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Link href="/" className="hover:text-primary flex items-center gap-1">
                                <Home className="w-4 h-4" />
                                首页
                            </Link>
                            <ChevronRight className="w-4 h-4" />
                            <Link href={`/category/${resource.stage === '启蒙' ? 'enlightenment' : 'teen'}`} className="hover:text-primary">
                                {resource.stage}英语
                            </Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-gray-900 truncate max-w-[200px]">{resource.title}</span>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                            <div className="flex border-b">
                                <button className="flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 border-blue-500 text-blue-600 bg-blue-50/50">
                                    <FileText className="w-4 h-4" />
                                    详情介绍
                                </button>
                                <button className="flex items-center gap-2 px-6 py-4 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                                    <HelpCircle className="w-4 h-4" />
                                    常见问题
                                </button>
                            </div>

                            <div className="p-8">
                                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: resource.content || '<p>暂无详细介绍</p>' }} />
                            </div>
                        </div>

                        {/* Related Resources */}
                        <div>
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                                相关推荐
                            </h3>
                            <NewResourcesGrid
                                resources={relatedResources}
                                rows={1}
                                cardWidth="180px"
                                cardHeight="230px"
                                hideHeader={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
