'use client';

import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function UserOrdersPage() {
    return (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 min-h-[400px] flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-blue-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">暂无订单记录</h2>
            <p className="text-gray-500 mb-6 max-w-sm">
                您还没有购买任何资源。去浏览我们的精选资源，发现适合孩子的英语学习材料吧！
            </p>
            <Button asChild>
                <Link href="/">
                    去浏览资源
                </Link>
            </Button>
        </div>
    );
}
