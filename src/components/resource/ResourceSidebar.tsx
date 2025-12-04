'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Users } from 'lucide-react';
import Image from 'next/image';
import { Resource } from '@/types';

interface ResourceSidebarProps {
    resource: Resource;
}

export default function ResourceSidebar({ resource }: ResourceSidebarProps) {
    return (
        <div className="lg:sticky lg:top-24 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>购买此资源</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <div className="text-sm text-muted-foreground mb-1">单买价格</div>
                        <div className="text-2xl font-bold text-primary">¥{resource.price}</div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                        立即购买
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                        或
                    </div>

                    <Button variant="outline" className="w-full">
                        开通VIP免费获取
                    </Button>
                </CardContent>
            </Card>

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
