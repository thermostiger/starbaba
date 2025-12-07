import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Users, CloudDownload } from 'lucide-react';
import Image from 'next/image';
import { Resource } from '@/types';

interface ResourceSidebarProps {
    resource: Resource;
}

export default function ResourceSidebar({ resource }: ResourceSidebarProps) {
    return (
        <div className="lg:sticky lg:top-24 space-y-6">
            {/* Resource Info Card */}
            <Card className="border-t-4 border-t-blue-500 shadow-sm">
                <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                        <CloudDownload className="w-5 h-5 text-blue-500" />
                        资源信息
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-blue-50/50 p-4 rounded-lg space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                <span className="text-gray-600">普通</span>
                            </div>
                            <span className="font-bold text-orange-600">¥{resource.price}元</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                <span className="text-gray-600">年度会员</span>
                            </div>
                            <span className="font-bold text-green-600">免费</span>
                        </div>
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all h-10 text-base font-medium">
                        立即购买
                    </Button>
                </CardContent>
            </Card>

            {/* Contact Cards */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">联系客服</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                            <MessageCircle className="h-4 w-4" />
                            微信客服
                        </div>
                        <div className="relative aspect-square bg-gray-100 rounded-lg">
                            <Image
                                src="/images/wechat-qr.png"
                                alt="微信客服二维码"
                                fill
                                sizes="200px"
                                className="object-contain p-2"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            家长交流群
                        </div>
                        <div className="relative aspect-square bg-gray-100 rounded-lg">
                            <Image
                                src="/images/group-qr.png"
                                alt="家长群二维码"
                                fill
                                className="object-contain p-2"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
