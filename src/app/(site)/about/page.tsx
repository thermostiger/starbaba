
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
                    让优质教育不再是特权
                </h1>
                <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
                    打破地域、经济与阶层的界限。K12Shelf，致力于让每一个家庭都能以极低的成本，平等触达优质的英语原版教育资源。
                </p>
            </div>

            {/* Story */}
            <div className="prose max-w-none mb-16">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900">看见差距，为了改变</h2>
                    <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                        <p>
                            教育的起跑线从未真正对齐。
                        </p>
                        <p>
                            受限于地域发展、家庭经济和社会资源的差异，教育鸿沟真实而残酷地存在着。在资源丰富的地区，孩子们可能早早便开始用英文探讨世界历史；而在更多的地方，许多孩子仍在为获取最基础的优质学习材料而犹豫。这不是天赋的差异，而是<strong>接触机会（Access）</strong>的差异。
                        </p>
                        <p>
                            我们深信，语言是连接世界的桥梁，不应成为阶层的壁垒。无论身处繁华都市还是偏远角落，无论家庭收入高低，每个孩子都应享有平等接触地道英语环境的权利。
                        </p>
                        <p>
                            这就是 K12Shelf 存在的意义。我们希望用优质的内容抹平信息的落差，让每一个渴望成长的孩子，都有机会通过英语这扇窗，自由地探索更大的世界。
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
                    <p className="text-slate-600">打破课堂边界。依托持续扩充的百科级资源库，在获取知识的同时，全面提升独立思考与核心竞争力。</p>
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
