import { createClient } from '@/lib/supabase/server';
import { getResourceById } from '@/lib/cms';
import { notFound } from 'next/navigation';
import ResourceHero from '@/components/resource/ResourceHero';
import ResourceSidebar from '@/components/resource/ResourceSidebar';
import NewResourcesGrid from '@/components/home/NewResourcesGrid';
import { getResourcesByStage } from '@/lib/cms';
import Link from 'next/link';
import { Home, ChevronRight, FileText, HelpCircle, Lock } from 'lucide-react';
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

import { createClient as createAdminClient } from '@supabase/supabase-js';
import { auth } from '@/auth';

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const session = await auth();
    // @ts-expect-error isVip is added in auth.ts
    const isVip = !!session?.user?.isVip;

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

    // Special logic for VIPs: If the view hid the download_url (row level security or view logic), 
    // but the user is VIP, we fetch it with admin privileges.
    if (resource && !resource.download_url && isVip) {
        const adminSupabase = createAdminClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );
        const { data: adminData } = await adminSupabase
            .from('resources')
            .select('download_url, extraction_code')
            .eq('slug', slug)
            .single();

        if (adminData) {
            resource.download_url = adminData.download_url;
            resource.extraction_code = adminData.extraction_code;
        }
    }

    // Define mappings for Breadcrumbs and Routing
    const categoryMap: Record<string, { path: string; label: string }> = {
        '幼儿英语': { path: '/preschool', label: '幼儿英语' },
        '少儿英语': { path: '/kids', label: '少儿英语' },
        '青少年英语': { path: '/teens', label: '青少年英语' },
        '科普纪录片': { path: '/science', label: '科普纪录片' },
    };

    // Define CMS stage mapping (for getResourcesByStage compatibility)
    const stageForCms: Record<string, string> = {
        '幼儿英语': '启蒙',
        '少儿英语': '进阶',
        '青少年英语': '青少年',
        '科普纪录片': '全年龄',
    };

    const assignedPage = resource.assigned_page || '幼儿英语';
    const categoryInfo = categoryMap[assignedPage] || { path: '/preschool', label: '幼儿英语' };
    const cmsStage = stageForCms[assignedPage] || '启蒙';

    // Fetch related resources only for non-documentary resources
    const isDocumentary = slug.startsWith('d');
    const relatedResources = isDocumentary
        ? []
        : (await getResourcesByStage(cmsStage, 1, 4)).data;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Full Width Hero */}
            <ResourceHero resource={resource} />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    {/* Left Sidebar (1 col) -> Now Right due to order-2 */}
                    <div className="lg:col-span-1 order-2 lg:sticky lg:top-28 z-30">
                        <ResourceSidebar resource={resource} />
                    </div>

                    {/* Right Content (3 cols) -> Now Left due to order-1 */}
                    <div className="lg:col-span-3 order-1 space-y-8">
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Link href="/" className="hover:text-primary flex items-center gap-1">
                                <Home className="w-4 h-4" />
                                首页
                            </Link>
                            <ChevronRight className="w-4 h-4" />
                            <Link href={categoryInfo.path} className="hover:text-primary">
                                {categoryInfo.label}
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
                                <div className="prose max-w-none whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: resource.content || '<p>暂无详细介绍</p>' }} />

                                {(resource.is_vip || !resource.is_free || resource.download_url || !session?.user) && (
                                    <div className="mt-8 pt-8 border-t border-gray-100">
                                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                            <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
                                            资源地址
                                        </h3>
                                        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                            {!session?.user ? (
                                                <Link href="/register" className="block relative group overflow-hidden rounded-xl border border-gray-200 hover:border-blue-400 transition-all duration-300">
                                                    <div className="absolute inset-0 bg-gray-50 p-6 select-none filter blur-sm opacity-50">
                                                        <div className="space-y-4">
                                                            {[1, 2, 3].map((i) => (
                                                                <div key={i} className="h-4 bg-gray-200 rounded w-3/4"></div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center bg-white/60 backdrop-blur-sm hover:bg-white/40 transition-colors">
                                                        <div className="w-12 h-12 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                                            <Lock className="w-6 h-6" />
                                                        </div>
                                                        <h3 className="text-lg font-bold text-gray-900 mb-1">请登录后查看</h3>
                                                        <p className="text-sm text-gray-600 mb-4">登录后即可查看资源</p>
                                                        <span className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-full font-medium shadow-lg hover:bg-blue-700 transition-all">
                                                            登录 / 注册
                                                        </span>
                                                    </div>
                                                </Link>
                                            ) : resource.download_url ? (
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
                                                // Locked View
                                                <Link href="/vip" className="block relative group overflow-hidden rounded-xl border border-gray-200 hover:border-blue-400 transition-all duration-300">
                                                    {/* Simulated content background for blur effect */}
                                                    <div className="absolute inset-0 bg-gray-50 p-6 select-none filter blur-sm opacity-50">
                                                        <div className="space-y-4">
                                                            {[1, 2, 3].map((i) => (
                                                                <div key={i} className="h-4 bg-gray-200 rounded w-3/4"></div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Active CTA Overlay */}
                                                    <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center bg-white/60 backdrop-blur-sm hover:bg-white/40 transition-colors">
                                                        <div className="w-16 h-16 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                            <Lock className="w-8 h-8" />
                                                        </div>
                                                        <h3 className="text-xl font-bold text-gray-900 mb-2">VIP 专享资源</h3>
                                                        <p className="text-gray-600 mb-6">解锁K12Shelf全部精选资源</p>
                                                        <span className="inline-flex items-center px-6 py-2.5 bg-blue-900 text-white rounded-full font-medium shadow-lg shadow-blue-900/20 group-hover:bg-blue-800 transition-all transform group-hover:-translate-y-0.5">
                                                            立即解锁
                                                        </span>
                                                    </div>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-8 p-4 bg-gray-50 rounded-lg text-xs text-gray-500 leading-relaxed border border-gray-100">
                                    免责声明： 本站所有资源均收集自互联网，仅供内部学习交流使用，请于下载后 24 小时内删除。本站不承担任何法律责任。如有侵权，请联系 k12shelf@outlook.com，我们将第一时间处理。
                                </div>
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
