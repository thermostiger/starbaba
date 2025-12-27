import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Star, Gift } from 'lucide-react';
import Image from 'next/image';
import { Resource } from '@/types';

interface ResourceSidebarProps {
    resource: Resource;
}

export default function ResourceSidebar({ resource }: ResourceSidebarProps) {
    return (
        <div className="lg:sticky lg:top-24 space-y-4">
            {/* VIP Membership Card - Warm educational theme */}
            <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/30 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-200/30 rounded-full translate-y-12 -translate-x-12"></div>

                <CardContent className="relative p-5">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-md">
                            <Star className="w-6 h-6 text-white fill-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-800">VIP会员特权</h3>
                            <p className="text-xs text-gray-600 mt-0.5">全站资源畅享无限</p>
                        </div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 mb-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                            <span>海量优质资源免费下载</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                            <span>持续更新，永久有效</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                            <span>专属客服优先支持</span>
                        </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-md h-11 rounded-xl">
                        立即开通VIP
                    </Button>
                </CardContent>
            </Card>



            {/* Gift Card - Special offer */}
            <Card className="border border-purple-100 shadow-md bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Gift className="w-5 h-5 text-purple-500" />
                        <h4 className="font-semibold text-gray-800 text-sm">限时优惠</h4>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                        开通VIP会员，即可免费获取全站所有资源，更有专属客服为您服务！
                    </p>
                </CardContent>
            </Card>

            {/* Contact Card - Friendly style */}
            <Card className="border border-gray-200 shadow-md bg-white">
                <CardContent className="p-5">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-green-500" />
                        联系客服
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <div className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                                <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                                    <MessageCircle className="h-3.5 w-3.5 text-green-600" />
                                </div>
                                微信客服
                            </div>
                            <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                                <Image
                                    src="/images/wechat-qr.png"
                                    alt="微信客服二维码"
                                    fill
                                    sizes="200px"
                                    className="object-contain p-3"
                                />
                            </div>
                        </div>


                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
