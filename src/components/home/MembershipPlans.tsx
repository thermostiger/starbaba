import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Crown, Gem, Star, Zap, ShieldCheck } from 'lucide-react';
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
        <section className="py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-blue-950 mb-4">选择您的 VIP 方案</h2>
                    <p className="text-lg text-slate-500">
                        一次开通，全站资源无限制下载。支持网盘转存，定期更新。
                        <br />
                        <span className="text-sm opacity-80 inline-block mt-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-medium">已有 5000+ 家长加入我们</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto px-4 md:px-0">
                    {PLANS.map((plan) => {
                        const isGold = plan.theme === 'gold';
                        const isDiamond = plan.theme === 'diamond';

                        return (
                            <Card
                                key={plan.id}
                                className={`relative flex flex-col transition-all duration-300 hover:-translate-y-2
                                    ${isGold ? 'border-amber-300 shadow-2xl shadow-amber-900/10 scale-105 z-10 bg-white' : ''}
                                    ${isDiamond ? 'border-blue-900 bg-blue-950 text-white shadow-2xl shadow-blue-900/20' : 'bg-white hover:shadow-xl hover:shadow-blue-900/5'}
                                    ${plan.theme === 'basic' ? 'border-slate-200' : ''}
                                `}
                            >
                                {isGold && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-1 whitespace-nowrap">
                                        <Crown className="w-3 h-3 fill-current" /> 最多家长选择
                                    </div>
                                )}
                                {isDiamond && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                        Best Value
                                    </div>
                                )}

                                <CardHeader className={`text-center pt-8 pb-4 ${isGold ? 'bg-amber-50/30' : ''}`}>
                                    {/* Inline Icon and Name */}
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        {plan.theme === 'basic' && <div className="p-1.5 rounded-full bg-slate-100"><Zap className="w-5 h-5 text-slate-500" /></div>}
                                        {isGold && <div className="p-1.5 rounded-full bg-amber-100"><Star className="w-6 h-6 text-amber-500 fill-amber-500" /></div>}
                                        {isDiamond && <div className="p-1.5 rounded-full bg-blue-900 border border-blue-800"><Gem className="w-5 h-5 text-amber-400" /></div>}
                                        <div className={`text-xl font-bold ${isDiamond ? 'text-white' : 'text-blue-950'}`}>{plan.name}</div>
                                    </div>

                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className={`text-xl font-bold ${isDiamond ? 'text-blue-200' : 'text-slate-500'}`}>¥</span>
                                        <span className={`text-5xl font-extrabold tracking-tight ${isGold ? 'text-amber-500' : ''} ${isDiamond ? 'text-white' : 'text-blue-950'}`}>
                                            {plan.price}
                                        </span>
                                        {plan.originalPrice && (
                                            <span className={`text-sm line-through ml-2 ${isDiamond ? 'text-blue-400' : 'text-slate-400'}`}>
                                                ¥{plan.originalPrice}
                                            </span>
                                        )}
                                    </div>
                                    <div className={`text-sm mt-1 font-medium ${isDiamond ? 'text-blue-300' : 'text-slate-500'}`}>
                                        有效期: {plan.duration}
                                    </div>
                                </CardHeader>

                                <CardContent className="flex-1 flex flex-col p-6 pt-2">
                                    <div className={`h-px w-full mb-6 ${isDiamond ? 'bg-blue-900' : 'bg-slate-100'}`}></div>
                                    <ul className="space-y-4 flex-1 mb-8 px-2">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${isGold ? 'text-amber-500' :
                                                    isDiamond ? 'text-amber-400' : 'text-blue-300'
                                                    }`} />
                                                <span className={`text-sm ${isDiamond ? 'text-blue-100' : 'text-slate-600'}`}>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        asChild
                                        size="lg"
                                        className={`w-full flex items-center justify-center font-bold h-12 text-base transition-all duration-300 rounded-xl
                                            ${isGold ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xl shadow-amber-500/30' : ''}
                                            ${isDiamond ? 'bg-white text-blue-950 hover:bg-blue-50 hover:shadow-lg' : ''}
                                            ${plan.theme === 'basic' ? 'bg-slate-100 text-slate-900 hover:bg-slate-200' : ''}
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

                <div className="mt-12 text-center bg-blue-50 rounded-xl p-4 inline-block mx-auto border border-blue-100">
                    <p className="text-slate-600 text-sm flex items-center justify-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-green-500" />
                        如有任何支付问题，请联系客服微信: <span className="text-blue-900 font-bold select-all bg-white px-2 py-0.5 rounded border border-blue-200">xingbaba</span>
                    </p>
                </div>
            </div>
        </section>
    );
}
