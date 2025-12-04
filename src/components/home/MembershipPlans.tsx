import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { MembershipPlan } from '@/types';

const PLANS: MembershipPlan[] = [
    {
        id: 'intro',
        name: '会员介绍',
        duration: '',
        price: 0,
        features: [
            '无限制访问全部资源',
            '每周更新优质内容',
            '专属客服支持',
            '高清无水印下载',
        ],
    },
    {
        id: 'trial',
        name: '3天体验',
        duration: '3天',
        price: 9.9,
        features: [
            '体验全部VIP功能',
            '无限制浏览',
            '高清下载',
        ],
    },
    {
        id: 'annual',
        name: '年度会员',
        duration: '365天',
        price: 299,
        originalPrice: 599,
        features: [
            '全年无限制访问',
            '每周持续更新',
            '专属客服',
            '高清无水印',
        ],
        highlighted: true,
    },
    {
        id: 'lifetime',
        name: '永久会员',
        duration: '永久',
        price: 599,
        originalPrice: 999,
        features: [
            '终身无限访问',
            '所有未来更新',
            '优先客服',
            '独家资源',
        ],
    },
];

export default function MembershipPlans() {
    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">会员权益</h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
                    {/* First Column: Text Description */}
                    <div className="flex flex-col justify-center text-left space-y-4 p-4">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            加入本站VIP会员
                        </h3>
                        <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
                            <p>
                                本站所有资源都在夸克网盘、阿里云盘或百度网盘，支持单份购买或会员下载专享。
                            </p>
                            <p>
                                付费后即在资源页看到网盘链接和密码，可转存到自己的网盘或下载。部分资源属于会员专属，开通会员性价比更高，更优惠，资源不断更新中。
                            </p>
                            <p className="font-medium text-foreground">
                                有任何问题请加星爸微信：xingbaba
                            </p>
                        </div>
                    </div>

                    {/* Membership Plans */}
                    {PLANS.slice(1).map((plan) => (
                        <Card
                            key={plan.id}
                            className={`relative flex flex-col ${plan.highlighted
                                ? 'border-primary border-2 shadow-xl'
                                : 'hover:shadow-lg'
                                } transition-all duration-300 h-full`}
                        >
                            {plan.highlighted && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-bold z-10 whitespace-nowrap">
                                    最受欢迎
                                </div>
                            )}

                            <CardHeader className="text-center pb-2">
                                <CardTitle>
                                    <div className="text-xl font-bold">{plan.name}</div>
                                    <div className="mt-4 flex items-baseline justify-center">
                                        {plan.originalPrice && (
                                            <span className="text-sm text-muted-foreground line-through mr-2">
                                                ¥{plan.originalPrice}
                                            </span>
                                        )}
                                        <span className="text-3xl font-bold text-primary">
                                            ¥{plan.price}
                                        </span>
                                        <span className="text-sm text-muted-foreground ml-1">
                                            /{plan.duration}
                                        </span>
                                    </div>
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="flex-1 flex flex-col">
                                <ul className="space-y-3 mb-6 flex-1">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    asChild
                                    variant={plan.highlighted ? 'default' : 'outline'}
                                    className={
                                        plan.highlighted
                                            ? 'w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 mt-auto'
                                            : 'w-full mt-auto'
                                    }
                                >
                                    <Link href="/vip">立即开通</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
