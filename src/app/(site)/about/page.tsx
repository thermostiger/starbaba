
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
                    <p className="text-lg text-slate-600 leading-relaxed mb-4">
                        K12Shelf 诞生于一个简单的愿望：让中国的孩子们能够更便捷地接触到世界一流的英语学习资源。
                    </p>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        在这个信息爆炸的时代，找到资源并不难，难的是筛选出真正适合孩子、高质量且体系化的内容。我们致力于做“减法”，为您和孩子精选最值得阅读和观看的原版内容，节省您的筛选时间，让陪伴更加纯粹。
                    </p>
                </div>
            </div>

            {/* Mission */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Globe className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-slate-900">全球视野</h3>
                    <p className="text-slate-600">汇聚全球顶级出版社与制作机构的优质资源</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 text-center">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-slate-900">严选内容</h3>
                    <p className="text-slate-600">每一份资源都经过精心筛选，确保教育价值</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-slate-900">快乐启蒙</h3>
                    <p className="text-slate-600">让兴趣成为最好的老师，在探索中自然习得</p>
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
