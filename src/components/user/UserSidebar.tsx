'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, ShoppingBag, Crown, Film, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';

const MENU_ITEMS = [
    {
        icon: User,
        label: '个人中心',
        href: '/user',
    },
    {
        icon: ShoppingBag,
        label: '我的订单',
        href: '/user/orders',
    },
    {
        icon: Crown,
        label: 'VIP会员',
        href: '/vip',
    },
    {
        icon: Film,
        label: '观看历史', // Placeholder for future feature, or link to documentaries
        href: '/user/history',
    },
];

export default function UserSidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <div className="w-full md:w-64 shrink-0 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">用户菜单</h3>
                </div>
                <nav className="p-2 space-y-1">
                    {MENU_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all",
                                isActive(item.href)
                                    ? "bg-orange-50 text-orange-600 shadow-sm"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <item.icon className={cn(
                                "w-5 h-5",
                                isActive(item.href) ? "text-orange-500" : "text-gray-400"
                            )} />
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="p-2 border-t border-gray-100">
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        退出登录
                    </button>
                </div>
            </div>
        </div>
    );
}
