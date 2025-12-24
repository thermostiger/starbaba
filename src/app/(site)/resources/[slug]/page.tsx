import { createClient } from '@/lib/supabase/server';
import { getResourceById } from '@/lib/cms';
import { notFound } from 'next/navigation';
import ResourceHero from '@/components/resource/ResourceHero';
import ResourceSidebar from '@/components/resource/ResourceSidebar';
import NewResourcesGrid from '@/components/home/NewResourcesGrid';
import { getResourcesByStage } from '@/lib/cms';
import Link from 'next/link';
import { Home, ChevronRight, FileText, HelpCircle } from 'lucide-react';
import { Resource } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Try to fetch from DB first using secure view
    const supabase = await createClient();
    const { data: dbResource } = await supabase
        .from('resources_view')
        .select('*')
        .eq('slug', slug)
        .single();

    // Use dbResource if found, otherwise fallback to mock (assuming mock might support slug or we fallback to ID lookup logic for legacy mock data which is risky but ok for dev)
    // For now, if not in DB, we attempt to find by slug in mocks (need to update fetch logic or just assume DB is primary)
    // Note: getResourceById currently expects ID. We might need a getResourceBySlug.
    const resource = dbResource ? dbResource as unknown as Resource : null; // await getResourceBySlug(slug)

    if (!resource) {
        return {
            title: '资源未找到',
        };
    }

    return {
        title: resource.title,
        description: resource.resource_info,
        openGraph: {
            title: resource.title,
            description: resource.resource_info,
            images: [resource.cover_image],
        },
    };
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const supabase = await createClient();

    // 1. 优先查询安全视图 (Secure View) by SLUG
    const { data: dbData, error } = await supabase
        .from('resources_view')
        .select('*')
        .eq('slug', slug)
        .single();

    let resource: Resource | null = null;

    if (dbData) {
        resource = {
            ...dbData,
            // 确保兼容性映射
            resourceUrl: dbData.download_url || '',
            is_unlocked: dbData.is_unlocked ?? false,
            price: dbData.price ?? 0,
            vipPrice: 0,
        } as Resource;
    } else {
        // 2. 如果数据库没找到, 尝试获取 Mock 数据
        // Since we don't have getResourceBySlug yet, and legacy mocks used IDs...
        // We will try to see if the slug LOOKS like an ID (numeric) or just fail for mocks that don't satisfy the slug.
        // Or better: Assume for this task we primarily care about DB resources having proper slugs.
        // For fallback, we might check if 'slug' matches an ID in mock data?
        // Let's implement a simple fallback: if numeric, try getResourceById?
        if (/^\d+$/.test(slug)) {
            console.log('Slug looks like ID, trying fallback fetch...');
            resource = await getResourceById(slug);
        } else {
            // Try to find mock by checking if any mock has this slug (mock data might not have slug field populated yet)
            console.log('Resource not found in DB by slug.');
        }
    }

    if (!resource) {
        notFound();
    }

    const pageToStage: Record<string, string> = {
        '幼儿英语': '启蒙',
        '少儿英语': '进阶',
        '青少年英语': '青少年',
        '科普纪录片': '全年龄',
    };
    const stage = resource.assigned_page ? (pageToStage[resource.assigned_page] || '启蒙') : '启蒙';

    // Fetch related resources only for non-documentary resources
    const isDocumentary = slug.startsWith('d');
    const relatedResources = isDocumentary
        ? []
        : (await getResourcesByStage(stage, 1, 4)).data;

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
                            <Link href={`/category/${stage === '启蒙' ? 'enlightenment' : 'teen'}`} className="hover:text-primary">
                                {stage}英语
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

                                {(resource.is_vip || resource.download_url) && (
                                    <div className="mt-8 pt-8 border-t border-gray-100">
                                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                            <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
                                            资源地址
                                        </h3>
                                        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                            {/* Logic: If we have download_url, it is unlocked (or free). If we don't, and it is VIP, then it is locked. */}
                                            {resource.download_url ? (
                                                <>
                                                    {resource.download_url.split('\n').map((line, index) => (
                                                        <div key={index} className="break-all">
                                                            {line.match(/https?:\/\/[^\s]+/) ? (
                                                                <a
                                                                    href={line.match(/https?:\/\/[^\s]+/)![0]}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-600 hover:text-blue-700 hover:underline"
                                                                >
                                                                    {line}
                                                                </a>
                                                            ) : (
                                                                <span className="text-gray-700">{line}</span>
                                                            )}
                                                        </div>
                                                    ))}

                                                    {resource.extraction_code && (
                                                        <div className="mt-2 p-2 bg-blue-50 text-blue-700 text-sm rounded flex items-center gap-2">
                                                            <span>提取码:</span>
                                                            <span className="font-mono font-bold select-all">{resource.extraction_code}</span>
                                                        </div>
                                                    )}

                                                    <p className="text-xs text-gray-500 mt-4 pt-2 border-t border-gray-200">
                                                        提示：如果有提取码，请一同复制。链接失效请联系客服。
                                                    </p>
                                                </>
                                            ) : (
                                                // Locked View
                                                <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded border border-gray-200 text-center">
                                                    <div className="text-2xl mb-2">🔒</div>
                                                    <p className="text-gray-600 font-medium mb-1">VIP 资源</p>
                                                    <p className="text-gray-400 text-sm">************************************</p>
                                                    <p className="text-xs text-gray-400 mt-2">（请购买或升级 VIP 会员查看）</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
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
