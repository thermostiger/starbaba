import { Check, HelpCircle, ShieldCheck, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
    title: 'VIP会员 - K12书架',
    description: '每天不到 3 毛钱，给孩子一座搬不完的牛津图书馆。解锁全站 5000+ 原版资源。',
};

export default function VIPPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* 1. Hero Section */}
            <header className="bg-gradient-to-br from-slate-900 via-blue-900 to-amber-700 text-white py-20 px-4 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                        解锁 K12Shelf全部海量精选原版资源
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 font-medium">
                        每天不到 3 毛钱，把国际学校的图书馆搬回家。
                    </p>
                </div>
            </header>

            {/* 2. Pricing Cards Container (The Core) */}
            <section className="max-w-6xl mx-auto px-4 -mt-10 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start justify-center max-w-4xl mx-auto">

                    {/* Card A: The Anchor (Yearly) */}
                    <div className="bg-white rounded-2xl p-8 border-[3px] border-blue-200 shadow-sm flex flex-col relative order-2 md:order-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">年度会员</h3>
                        <p className="text-slate-500 text-sm mb-6">解锁全站权限，畅享一年无忧下载</p>

                        <div className="mb-6 flex items-baseline">
                            <span className="text-4xl font-bold text-slate-900">¥99</span>
                            <span className="text-slate-500 ml-2">/ 年</span>
                        </div>

                        <Button
                            className="w-full bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800 font-bold py-6 text-lg rounded-xl mb-8 transition-colors"
                            asChild
                        >
                            <Link href="https://mbd.pub/o/YOUR_LINK_HERE" target="_blank">
                                选择年度计划
                            </Link>
                        </Button>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-blue-600 shrink-0" />
                                <span className="text-slate-600">解锁全站隐藏资源</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-blue-600 shrink-0" />
                                <span className="text-slate-600">支持主流网盘下载</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-blue-600 shrink-0" />
                                <span className="text-slate-600">365天 有效期</span>
                            </div>
                        </div>
                    </div>

                    {/* Card B: The Winner (Lifetime) */}
                    <div className="bg-white rounded-2xl p-8 ring-4 ring-amber-400 shadow-xl flex flex-col relative order-1 md:order-2 transform md:scale-105 z-10">
                        {/* Badge */}
                        <div className="absolute -top-5 right-8 bg-amber-400 text-blue-900 text-sm font-bold px-4 py-1.5 rounded-full shadow-md flex items-center gap-1">
                            <Crown className="w-4 h-4 fill-current" />
                            80% 用户选择
                        </div>

                        <h3 className="text-xl font-bold text-blue-900 mb-2">终身会员</h3>
                        <p className="text-blue-600/80 text-sm mb-6 font-medium">👑 超值首选 · 终身有效 · 包含所有后续更新</p>

                        <div className="mb-6 flex items-baseline">
                            <span className="text-5xl font-extrabold text-blue-900">¥199</span>
                            <span className="text-slate-500 ml-2">/ 永久</span>
                        </div>

                        <Button
                            className="w-full bg-amber-400 text-blue-900 hover:bg-amber-500 font-bold py-6 text-lg rounded-xl mb-8 shadow-lg shadow-amber-400/30 transition-all hover:scale-[1.02]"
                            asChild
                        >
                            <Link href="https://mbd.pub/o/YOUR_LINK_HERE" target="_blank">
                                立即开通终身会员
                            </Link>
                        </Button>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
                                <span className="text-slate-700 font-medium">包含年度会员所有权益</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
                                <span className="text-slate-700 font-medium">账号永久有效，无续费烦恼</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
                                <span className="text-slate-700 font-medium">免费享受未来新增资源、新功能</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
                                <span className="text-slate-700 font-medium">优先响应资源求助</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>


        </div>
    );
}
