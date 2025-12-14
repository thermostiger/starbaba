import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Crown, Gem, Star, Zap } from 'lucide-react';
import { MembershipPlan } from '@/types';

const PLANS: (MembershipPlan & { theme: 'basic' | 'gold' | 'diamond' })[] = [
    {
        id: 'trial',
        name: '3天体验会员',
        duration: '3天',
        price: 9.9,
        features: [
            '体验全部VIP功能',
            '无限制浏览',
            '每天可下载5个资源',
        ],
        theme: 'basic',
    },
    {
        id: 'annual',
        name: '年度会员',
        duration: '365天',
        price: 299,
        originalPrice: 599,
        features: [
            '全年无限制免费下载',
            '每周持续更新优质资源',
            '专属微信客服支持',
            '高清无水印原版资源',
        ],
        highlighted: true,
        theme: 'gold',
    },
    {
        id: 'lifetime',
        name: '永久会员',
        duration: '永久',
        price: 599,
        originalPrice: 999,
        features: [
            '终身无限免费下载',
            '包含所有未来更新',
            'VIP专属网盘群组',
            '1对1 专属资源定制',
        ],
        theme: 'diamond',
    },
];

export default function MembershipPlans() {
    return (
        <section className="py-16 bg-gradient-to-b from-white to-slate-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">加入本站VIP会员</h2>
                    <p className="text-lg text-slate-500">
                        一次开通，全站资源无限制下载。支持网盘转存，定期更新。
                        <br />
                        <span className="text-sm opacity-80">已有 5000+ 家长加入我们</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {PLANS.map((plan) => {
                        const isGold = plan.theme === 'gold';
                        const isDiamond = plan.theme === 'diamond';

                        return (
                            <Card
                                key={plan.id}
                                className={`relative flex flex-col transition-all duration-300 hover:-translate-y-2
                                    ${isGold ? 'border-amber-200 shadow-xl shadow-amber-100 scale-105 z-10' : ''}
                                    ${isDiamond ? 'border-zinc-800 bg-zinc-900 text-white shadow-2xl' : 'bg-white hover:shadow-lg'}
                                    ${plan.theme === 'basic' ? 'border-slate-100' : ''}
                                `}
                            >
                                {isGold && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-1 whitespace-nowrap">
                                        <Crown className="w-4 h-4 fill-current" /> 最多家长选择
                                    </div>
                                )}
                                {isDiamond && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                        Limited Offer
                                    </div>
                                )}

                                <CardHeader className={`text-center pt-10 pb-2 ${isGold ? 'bg-gradient-to-b from-amber-50/50 to-transparent' : ''}`}>
                                    <div className="flex justify-center mb-4">
                                        {plan.theme === 'basic' && <div className="p-3 rounded-full bg-slate-100"><Zap className="w-6 h-6 text-slate-500" /></div>}
                                        {isGold && <div className="p-3 rounded-full bg-amber-100"><Star className="w-8 h-8 text-amber-500 fill-amber-500" /></div>}
                                        {isDiamond && <div className="p-3 rounded-full bg-zinc-800 border border-zinc-700"><Gem className="w-8 h-8 text-indigo-400" /></div>}
                                    </div>
                                    <div className={`text-lg font-bold ${isDiamond ? 'text-zinc-100' : 'text-slate-600'}`}>{plan.name}</div>
                                    <div className="mt-2 flex items-baseline justify-center gap-1">
                                        <span className="text-2xl font-bold">¥</span>
                                        <span className={`text-5xl font-extrabold tracking-tight ${isGold ? 'text-amber-600' : ''} ${isDiamond ? 'text-white' : 'text-slate-900'}`}>
                                            {plan.price}
                                        </span>
                                        {plan.originalPrice && (
                                            <span className={`text-sm line-through ml-2 ${isDiamond ? 'text-zinc-500' : 'text-slate-400'}`}>
                                                ¥{plan.originalPrice}
                                            </span>
                                        )}
                                    </div>
                                    <div className={`text-sm mt-2 font-medium ${isDiamond ? 'text-zinc-400' : 'text-slate-500'}`}>
                                        有效期: {plan.duration}
                                    </div>
                                </CardHeader>

                                <CardContent className="flex-1 flex flex-col p-8">
                                    <div className={`h-px w-full mb-8 ${isDiamond ? 'bg-zinc-800' : 'bg-slate-100'}`}></div>
                                    <ul className="space-y-4 flex-1 mb-8">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${isGold ? 'text-amber-500' :
                                                        isDiamond ? 'text-indigo-400' : 'text-slate-400'
                                                    }`} />
                                                <span className={`text-sm ${isDiamond ? 'text-zinc-300' : 'text-slate-600'}`}>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        asChild
                                        size="lg"
                                        className={`w-full font-bold h-12 text-md transition-all duration-300
                                            ${isGold ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/30 border-0' : ''}
                                            ${isDiamond ? 'bg-white text-zinc-900 hover:bg-zinc-100 hover:text-zinc-950' : ''}
                                            ${plan.theme === 'basic' ? 'bg-slate-900 text-white hover:bg-slate-800' : ''}
                                        `}
                                    >
                                        <Link href="/vip">
                                            {isGold ? '立即开通会员' : '选择此方案'}
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-slate-400 text-sm">
                        如有任何支付问题，请联系客服微信: <span className="text-slate-600 font-bold select-all">xingbaba</span>
                    </p>
                </div>
            </div>
        </section>
    );
}
