
import { Mail, MessageCircle, Heart, Globe, BookOpen, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: '关于我们 - K12Shelf',
    description: 'K12Shelf - 专为中国儿童打造的英语原版资源库',
};

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Hero */}
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    关于 K12Shelf
                </h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                    我们精选全球优质教材、绘本、动画和纪录片，帮助孩子建立纯正的英语思维，让学习变回探索世界的快乐旅程。
                </p>
            </div>

            {/* Story */}
            <div className="prose max-w-none mb-16">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900">我们的初衷</h2>
                    <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                        <p>
                            K12Shelf 的故事始于一群“挑剔”的父母。在陪伴孩子学习英语的过程中，我们发现通过互联网获取资源虽然容易，但要找到真正适合不同年龄段、不仅有趣而且内容严谨的原版素材，却往往如大海捞针。
                        </p>
                        <p>
                            太多的劣质动画充斥屏幕，太多的碎片化教材让家长无所适从。我们深信，孩子的童年时间最宝贵，每一次观看、每一次阅读都不应被辜负。
                        </p>
                        <p>
                            因此，我们创立了 K12Shelf。不仅仅是一个资源库，更是一个为您过滤杂质、留存精华的“过滤器”。我们坚持“原版主义”，相信最好的语言学习方式不是死记硬背，而是沉浸在生动的故事、地道的表达和广阔的人文科学知识中。
                        </p>
                        <p>
                            我们希望，通过这些精心整理的全球顶级资源，不仅能帮助孩子掌握一门语言，更能为他们打开通向世界的窗户，培养终身受益的国际视野与批判性思维。
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Globe className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-slate-900">激发英文本能</h3>
                    <p className="text-slate-600">无需刻意坚持，让内容本身成为吸引力。无论处于哪个阶段，每个人都能在这里找到沉浸英语的理由。</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 text-center">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-slate-900">无界探索成长</h3>
                    <p className="text-slate-600">拒绝单一枯燥。从兴趣出发，在自己喜欢的主题中自由漫游，在未知的领域里发现惊喜，拓宽认知边界。</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-slate-900">赋能思维进阶</h3>
                    <p className="text-slate-600">打破课堂边界。依托持续扩充的百科级资源库，在获取知识的同时，全面提升批判性思维与核心竞争力。</p>
                </div>
            </div>

            {/* Educational Philosophy - New Section */}
            <div className="mb-16">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-8 text-center text-slate-900">我们的教育理念</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-blue-700 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                    习得 &gt; 学得 (Acquisition vs Learning)
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    我们推崇克拉申（Stephen Krashen）的二语习得理论。语言不应该是痛苦的背诵和语法分析，而应该是通过大量“可理解性输入（Comprehensible Input）”自然习得的结果。
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-amber-700 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                    i + 1原则
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    学习材料的难度应该略高于孩子当前的水平（i），但又在可理解范围内（+1）。我们科学的分级体系正是基于此，确保孩子既有成就感，又有挑战性。
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-green-700 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                    兴趣第一 (Interest First)
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    没有兴趣的坚持是痛苦的。我们深挖动画、电影、纪录片等孩子天然喜爱的形式，让英语成为孩子探索世界的工具，而不是学科负担。
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-purple-700 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                    长期主义 (Long-termism)
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    语言学习是一场马拉松。我们反对速成论，主张通过日积月累的浸润，培养孩子终身受益的英语思维能力和文化包容力。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact */}
            <div className="bg-slate-900 text-white rounded-2xl p-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-800/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <h2 className="text-3xl font-bold mb-6 relative z-10">联系我们</h2>
                <div className="space-y-4 relative z-10">
                    <p className="text-slate-300 mb-6">
                        无论您是想推荐优秀资源，还是有任何使用建议，都欢迎随时与我们联系。
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <Mail className="w-5 h-5 text-blue-400" />
                            <a href="mailto:k12shelf@outlook.com" className="hover:text-blue-400 transition-colors font-medium">
                                k12shelf@outlook.com
                            </a>
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <MessageCircle className="w-5 h-5 text-green-400" />
                            <span className="font-medium">微信客服：k12shelf</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
