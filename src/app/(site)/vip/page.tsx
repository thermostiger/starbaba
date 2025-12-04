import MembershipPlans from '@/components/home/MembershipPlans';
import { Check, Star, Zap } from 'lucide-react';

export const metadata = {
    title: 'VIP会员权益',
    description: '开通VIP会员，无限制访问全站优质英语学习资源',
};

export default function VIPPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    VIP会员权益
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    一次开通，全站资源无限制访问，让孩子的英语学习之路更轻松
                </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4">
                        <Star className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">海量资源</h3>
                    <p className="text-muted-foreground">
                        10000+ 优质英语学习资源，涵盖动画、绘本、儿歌、课程等
                    </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-4">
                        <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">持续更新</h3>
                    <p className="text-muted-foreground">
                        每周更新最新优质内容，紧跟英语教育前沿
                    </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
                        <Check className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">专属服务</h3>
                    <p className="text-muted-foreground">
                        VIP专属客服，一对一解答学习疑问
                    </p>
                </div>
            </div>

            {/* Pricing Plans */}
            <MembershipPlans />

            {/* FAQ Section */}
            <div className="mt-20">
                <h2 className="text-3xl font-bold text-center mb-12">常见问题</h2>
                <div className="max-w-3xl mx-auto space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h3 className="font-bold text-lg mb-2">VIP会员可以下载资源吗？</h3>
                        <p className="text-muted-foreground">
                            可以。VIP会员享有高清无水印下载权限，支持离线学习。
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h3 className="font-bold text-lg mb-2">会员到期后还能访问已下载的资源吗？</h3>
                        <p className="text-muted-foreground">
                            可以。已下载的资源永久保存在您的设备上，会员到期后仍可使用。
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h3 className="font-bold text-lg mb-2">支持哪些支付方式？</h3>
                        <p className="text-muted-foreground">
                            支持微信支付、支付宝、银行卡等多种支付方式。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
