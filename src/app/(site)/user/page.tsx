'use client';

import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Crown, Mail, Calendar, User as UserIcon, ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UserDashboard() {
    const { data: session } = useSession();
    const router = useRouter();

    if (!session?.user) {
        // Redirection should ideally be handled by middleware or HOC, but for now:
        if (typeof window !== 'undefined') {
            router.push('/login');
        }
        return null;
    }

    const { user } = session;
    // @ts-expect-error - custom session properties
    const isVip = user.isVip;
    // @ts-expect-error - custom session properties
    const vipExpireDate = user.vipExpireDate;

    return (
        <div className="space-y-6">
            {/* Header / Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        欢迎回来，{user.name}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        这里是您的个人中心，管理您的账户和学习进度
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button onClick={() => router.push('/')} variant="outline">
                        前往首页
                    </Button>
                    {!isVip && (
                        <Button className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white shadow-md">
                            <Crown className="w-4 h-4 mr-2" />
                            开通VIP
                        </Button>
                    )}
                </div>
            </div>

            {/* Profile & VIP Status Cards */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Profile Card */}
                <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <UserIcon className="w-5 h-5 text-orange-500" />
                            个人信息
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4 mb-6">
                            <Avatar className="w-16 h-16 border-4 border-white shadow-md">
                                <AvatarImage src={user.image || ''} />
                                <AvatarFallback className="bg-orange-100 text-orange-600 text-xl font-bold">
                                    {user.name?.[0]?.toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold text-lg">{user.name}</h3>
                                <p className="text-sm text-gray-500">ID: {user.id}</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span>注册时间：{new Date().toLocaleDateString()}</span> {/* Ideally from DB */}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* VIP Card */}
                <Card className="border-none shadow-sm relative overflow-hidden group">
                    <div className={cn(
                        "absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20",
                        isVip
                            ? "bg-gradient-to-br from-amber-200 via-yellow-100 to-orange-100"
                            : "bg-gradient-to-br from-gray-200 via-gray-100 to-slate-100"
                    )} />
                    <CardHeader className="pb-4 relative">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Crown className={cn("w-5 h-5", isVip ? "text-amber-500" : "text-gray-400")} />
                            会员状态
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="relative">
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                            {isVip ? (
                                <>
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-orange-50 flex items-center justify-center mb-4 shadow-inner">
                                        <Crown className="w-8 h-8 text-amber-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-amber-900">尊贵VIP会员</h3>
                                    <p className="text-sm text-amber-700 mt-2">
                                        有效期至：{new Date(vipExpireDate).toLocaleDateString()}
                                    </p>
                                    <Button className="mt-6 w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg shadow-amber-500/20">
                                        续费会员
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                        <UserIcon className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-700">普通用户</h3>
                                    <p className="text-sm text-gray-500 mt-2">
                                        升级VIP，畅享海量优质资源
                                    </p>
                                    <Button asChild className="mt-6 w-full bg-gray-900 text-white hover:bg-gray-800 shadow-lg">
                                        <Link href="/vip">
                                            立即升级VIP <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions / Recent (Placeholder) */}
            <div className="grid gap-6 md:grid-cols-3">
                <Link href="/user/orders" className="block group">
                    <Card className="h-full hover:shadow-md transition-all border-none shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50/50">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">我的订单</h3>
                                <p className="text-sm text-gray-500">查看购买记录</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ShoppingBag className="w-5 h-5 text-blue-500" />
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/vip" className="block group">
                    <Card className="h-full hover:shadow-md transition-all border-none shadow-sm bg-gradient-to-br from-amber-50 to-orange-50/50">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">会员中心</h3>
                                <p className="text-sm text-gray-500">查看会员权益</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Sparkles className="w-5 h-5 text-amber-500" />
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    );
}

function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ');
}
