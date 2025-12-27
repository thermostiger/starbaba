import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';

export default function MembershipPlans() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-8">
            {/* Card A: Yearly */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col relative w-full max-w-[320px]">
                <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold text-slate-900">年度会员</h3>
                    <div className="flex items-baseline">
                        <span className="text-2xl font-bold text-slate-900">¥99</span>
                        <span className="text-slate-500 text-sm ml-1">/年</span>
                    </div>
                </div>

                {/* Single line features */}
                <div className="text-sm text-gray-500 mt-2 leading-relaxed">
                    解锁全站 • 支持网盘 • 365天有效
                </div>

                <Button
                    className="w-full h-10 bg-blue-100 text-blue-700 hover:bg-blue-200 font-bold mt-4 rounded-lg transition-colors"
                    asChild
                >
                    <Link href="https://mbd.pub/o/YOUR_LINK_HERE" target="_blank">
                        立即订阅
                    </Link>
                </Button>
            </div>

            {/* Card B: Lifetime (Highlight) */}
            <div className="bg-white rounded-2xl p-6 border-2 border-amber-400 shadow-2xl flex flex-col relative overflow-hidden w-full max-w-[340px] transform lg:scale-105 z-10">
                {/* Internal Badge */}
                <div className="absolute top-0 right-0">
                    <div className="bg-amber-400 text-blue-900 text-[10px] font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                        <Crown className="w-3 h-3 fill-current" />
                        超值推荐
                    </div>
                </div>

                <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold text-blue-900">终身会员</h3>
                    <div className="flex items-baseline">
                        <span className="text-2xl font-bold text-blue-900">¥199</span>
                    </div>
                </div>

                {/* Single line features */}
                <div className="text-sm text-gray-500 mt-2 leading-relaxed">
                    所有权益 • 永久有效 • 专属客服 • 优先更新
                </div>

                <Button
                    className="w-full h-10 bg-amber-400 text-blue-900 hover:bg-amber-500 font-bold mt-4 rounded-lg transition-all"
                    asChild
                >
                    <Link href="https://mbd.pub/o/YOUR_LINK_HERE" target="_blank">
                        立即订阅
                    </Link>
                </Button>
            </div>
        </div>
    );
}
