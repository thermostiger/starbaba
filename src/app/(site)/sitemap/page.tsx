
import Link from 'next/link';
import { Home, Compass, Shield, Users, Crown, Mail, FileText, Search, Map } from 'lucide-react';

export const metadata = {
    title: '网站地图 - K12书架',
    description: 'K12书架网站地图 - 快速浏览全站内容',
};

export default function SitemapPage() {
    const siteMapData = [
        {
            title: '核心频道',
            icon: Compass,
            color: 'text-blue-600',
            links: [
                { name: '网站首页', href: '/', desc: 'K12书架首页，最新热门资源' },
                { name: 'VIP会员', href: '/vip', desc: '会员权益与订阅服务' },
                { name: '资源搜索', href: '/search', desc: '快速查找所需资源' },
                { name: '关于我们', href: '/about', desc: '了解我们的故事与使命' },
            ]
        },
        {
            title: '资源分类',
            icon: Users,
            color: 'text-indigo-600',
            links: [
                { name: '幼儿英语 (Preschool)', href: '/preschool', desc: '适合3-6岁，启蒙动画与儿歌' },
                { name: '少儿英语 (Kids)', href: '/kids', desc: '适合7-12岁，分级阅读与教材' },
                { name: '青少年英语 (Teens)', href: '/teens', desc: '适合13-18岁，高阶读物与原著' },
                { name: '原声科普 (Science)', href: '/science', desc: '自然科学与人文历史纪录片' },
            ]
        },
        {
            title: '法律与服务',
            icon: Shield,
            color: 'text-slate-600',
            links: [
                { name: '用户协议', href: '/terms', desc: '服务条款与用户规则' },
                { name: '隐私政策', href: '/privacy', desc: '个人信息保护政策' },
                { name: '免责声明', href: '/disclaimer', desc: '版权声明与免责条款' },
            ]
        },
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            {/* Hero */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-6 text-slate-900 flex items-center justify-center gap-4">
                    <Map className="w-10 h-10 text-amber-500" />
                    网站地图
                </h1>
                <p className="text-xl text-slate-500">
                    全站栏目索引，助您快速找到所需内容
                </p>
            </div>

            {/* Sitemap Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {siteMapData.map((section, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${section.color}`}>
                            <section.icon className="w-6 h-6" />
                            {section.title}
                        </h2>
                        <ul className="space-y-4">
                            {section.links.map((link, linkIdx) => (
                                <li key={linkIdx}>
                                    <Link href={link.href} className="group block">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium text-slate-800 group-hover:text-amber-500 transition-colors">
                                                {link.name}
                                            </span>
                                            <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-amber-500">
                                                →
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500 group-hover:text-slate-600">
                                            {link.desc}
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Contact Info */}
            <div className="mt-16 bg-slate-50 rounded-2xl p-8 border border-slate-200 flex flex-col items-center text-center">
                <h2 className="text-xl font-bold mb-4 text-slate-800">未找到您需要的内容？</h2>
                <p className="text-slate-600 mb-6">
                    您可以尝试使用顶部搜索功能，或者直接联系我们反馈您的需求。
                </p>
                <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                    <Mail className="w-5 h-5" />
                    联系我们
                </Link>
            </div>
        </div>
    );
}
