import { Suspense } from 'react';
import HeroSection from '@/components/home/HeroSection';
import ResourceCard from '@/components/resources/ResourceCard';
import FeaturedCard from '@/components/resources/FeaturedCard';
import MembershipPlans from '@/components/home/MembershipPlans';
import ValueProposition from '@/components/home/ValueProposition';
import { getHotResources, getNewResources, getResourcesBySearch } from '@/lib/cms';
import { Check } from 'lucide-react';

export const metadata = {
    title: '首页 - K12书架 | 全球严选英文原版资源',
};

export default async function HomePage() {
    // Fetch data for all sections
    const editorPicks = await getHotResources(7); // 1 featured + 6 standard = 7
    const classicReaders = await getResourcesBySearch('分级阅读', 5);
    const scienceResources = await getResourcesBySearch('科普', 5);
    const newResources = await getNewResources(10);

    return (
        <main className="flex flex-col gap-0">
            {/* Section 1: Hero & Category Nav */}
            <HeroSection />

            {/* Section 2: Editor's Weekly Picks (Bento Style) */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-3 mb-10 pb-4 border-b border-slate-100">
                        <div className="p-2 bg-amber-50 rounded-xl">
                            <span className="text-2xl">✨</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">本周推荐</h2>
                            <p className="text-sm text-slate-500 mt-1">为您精心挑选的优质学习资源</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5">
                        {editorPicks.length > 0 && (
                            <>
                                {/* Large Featured Card (2x2) */}
                                <div className="col-span-2 row-span-2">
                                    <FeaturedCard resource={editorPicks[0]} className="h-full" />
                                </div>
                                {/* Remaining 6 Small Cards */}
                                {editorPicks.slice(1).map((resource) => (
                                    <ResourceCard key={resource.id} resource={resource} />
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Section 3: Themed Shelves */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 space-y-16">
                    {/* Shelf A: Classic Graded Readers */}
                    <div>
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-blue-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-xl">
                                    <span className="text-2xl">📚</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">经典分级阅读</h2>
                                    <p className="text-sm text-slate-500 mt-1">牛津树、培生、I Can Read等经典教材</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                            {classicReaders.map((resource) => (
                                <ResourceCard key={resource.id} resource={resource} />
                            ))}
                        </div>
                    </div>

                    {/* Shelf B: Science & Documentaries (Renamed from Cartoons) */}
                    <div>
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-indigo-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-100 rounded-xl">
                                    <span className="text-2xl">🔭</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">精品原声科普</h2>
                                    <p className="text-sm text-slate-500 mt-1">原汁原味的英语环境，快乐开启双语思维</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                            {scienceResources.map((resource) => (
                                <ResourceCard key={resource.id} resource={resource} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: New Arrivals */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-3 mb-10 pb-4 border-b border-cyan-100">
                        <div className="p-2 bg-cyan-50 rounded-xl">
                            <span className="text-2xl">🆕</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">最新上架</h2>
                            <p className="text-sm text-slate-500 mt-1">每日更新，紧跟全球优质教育资源</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                        {newResources.map((resource) => (
                            <ResourceCard key={resource.id} resource={resource} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 5: Value Proposition */}
            <ValueProposition />

            {/* Section 6: Membership CTA Section (Dark Section) */}
            <section className="py-10 bg-blue-900 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Left Column: Marketing Text (40%) */}
                        <div className="lg:w-[40%] text-white space-y-6">
                            <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight">
                                助力高效备考，<br />解锁全部资源
                            </h2>
                            <p className="text-blue-100 text-lg font-light">
                                灵活方案任选，一次付费，长久受益。
                            </p>
                            <ul className="space-y-3">
                                {[
                                    '全站资源无限制极速下载',
                                    '优先获取独家更新内容',
                                    '尊享VIP专属客服支持'
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <div className="p-1 bg-white/10 rounded-full">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Column: Pricing Cards (60%) */}
                        <div className="lg:w-[60%] w-full">
                            <MembershipPlans />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
