'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';

export default function MobileNav() {
    return (
        <div className="flex flex-col space-y-4 mt-8">
            <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">
                首页
            </Link>
            <Link href="/preschool" className="text-lg font-medium hover:text-primary transition-colors">
                幼儿英语
            </Link>
            <Link href="/kids" className="text-lg font-medium hover:text-primary transition-colors">
                少儿英语
            </Link>
            <Link href="/teens" className="text-lg font-medium hover:text-primary transition-colors">
                青少年英语
            </Link>
            <Link href="/science" className="text-lg font-medium hover:text-primary transition-colors">
                原声科普
            </Link>
            <Link href="/vip" className="text-lg font-medium hover:text-primary transition-colors flex items-center">
                <Crown className="w-5 h-5 mr-2 text-yellow-500" />
                VIP会员
            </Link>
            <Link href="/about" className="text-lg font-medium hover:text-primary transition-colors">
                关于
            </Link>
            <div className="pt-8">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    登录 / 注册
                </Button>
            </div>
        </div>
    );
}
