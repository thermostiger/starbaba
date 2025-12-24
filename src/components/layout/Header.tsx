'use client';

import Link from 'next/link';
import { Search, Menu, User, Crown, LogOut, Settings, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';
import MobileNav from './MobileNav';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();

    // Map session user to display format
    const user = session?.user ? {
        name: session.user.name || 'User',
        id: session.user.id || 'ID',
        avatar: session.user.image || '',
        // @ts-expect-error - custom session fields
        isVip: session.user.isVip || false,
        // @ts-expect-error - custom session fields
        vipExpireDate: session.user.vipExpireDate || '',
    } : null;

    const isActive = (path: string) => pathname === path;

    return (
        <header className="sticky top-0 z-50 w-full bg-blue-900/95 backdrop-blur-md border-b border-blue-800 shadow-lg text-white">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Logo with badge style */}
                <Link href="/" className="flex items-center gap-3 shrink-0 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all group-hover:scale-105">
                        <Sparkles className="w-5 h-5 text-blue-900" />
                    </div>
                    <div className="text-xl font-bold text-white tracking-tight">
                        星爸英语
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-1 shrink-0">
                    {[
                        { href: '/', label: '首页' },
                        { href: '/young-children', label: '幼儿英语' },
                        { href: '/children', label: '少儿英语' },
                        { href: '/teenagers', label: '青少年英语' },
                        { href: '/documentaries', label: '原声科普' },
                        { href: '/vip', label: 'VIP会员', highlight: true },
                        { href: '/about', label: '关于' },
                    ].map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all ${isActive(link.href)
                                ? 'text-white bg-white/10'
                                : link.highlight
                                    ? 'text-amber-400 hover:text-amber-300 hover:bg-white/5'
                                    : 'text-blue-100 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <span className="flex items-center gap-1.5">
                                {link.highlight && <Crown className="w-3.5 h-3.5 text-amber-400" />}
                                {link.label}
                            </span>
                            {isActive(link.href) && (
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-amber-400 rounded-full"></span>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    {/* Search Box */}
                    <div className="hidden md:flex items-center">
                        {isSearchExpanded ? (
                            <div className="relative w-56">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-300" />
                                <Input
                                    type="search"
                                    placeholder="搜索资源..."
                                    className="pl-9 h-9 bg-blue-950/50 border-blue-700 text-white placeholder:text-blue-400 rounded-full focus:bg-blue-950 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                                    autoFocus
                                    onBlur={() => setIsSearchExpanded(false)}
                                />
                            </div>
                        ) : (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsSearchExpanded(true)}
                                className="h-9 w-9 rounded-full hover:bg-white/10 text-blue-100 hover:text-white"
                            >
                                <Search className="h-4 w-4" />
                            </Button>
                        )}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3 shrink-0">
                        {/* User Profile with Hover Card */}
                        {user ? (
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-offset-2 ring-offset-blue-900 ring-transparent hover:ring-amber-400/50 transition-all">
                                        <Avatar className="h-9 w-9 border-2 border-blue-700">
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback className="bg-blue-800 text-amber-400 text-xs font-bold ring-1 ring-blue-700">
                                                {user.name?.[0]?.toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80 p-0 overflow-hidden border border-blue-100/20 shadow-xl bg-white/95 backdrop-blur-xl" align="end">
                                    {/* Header Gradient Background */}
                                    <div className="h-20 bg-gradient-to-br from-blue-900 to-blue-950 relative">
                                        <div className="absolute inset-0 bg-white/5" />
                                        <div className="absolute top-4 right-4">
                                            {user.isVip && (
                                                <span className="px-2 py-1 rounded-full bg-amber-500/20 backdrop-blur-md text-xs font-medium text-amber-400 ring-1 ring-amber-400/30 flex items-center gap-1">
                                                    <Crown className="w-3 h-3" /> VIP会员
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="px-5 pb-5 -mt-10 relative">
                                        <div className="flex justify-between items-end mb-4">
                                            <Avatar className="h-20 w-20 border-4 border-white shadow-lg ring-1 ring-black/5">
                                                <AvatarImage src={user.avatar} />
                                                <AvatarFallback className="bg-blue-50 text-blue-900 text-xl font-bold">
                                                    {user.name?.[0]?.toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>

                                        <div className="space-y-1 mb-5">
                                            <h4 className="text-lg font-bold text-gray-900 flex items-center">
                                                {user.name}
                                            </h4>
                                            <p className="text-xs text-gray-500 font-mono">
                                                ID: {user.id}
                                            </p>
                                        </div>

                                        {user.isVip ? (
                                            <div className="flex items-center gap-2 mb-6 p-3 rounded-lg bg-amber-50 border border-amber-100">
                                                <Crown className="w-4 h-4 text-amber-600" />
                                                <span className="text-xs text-amber-800 font-medium">
                                                    VIP有效期至：{user.vipExpireDate}
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="mb-6">
                                                <Button size="sm" className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-blue-950 font-bold shadow-md" asChild>
                                                    <Link href="/vip">
                                                        <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                                                        升级为VIP会员
                                                    </Link>
                                                </Button>
                                            </div>
                                        )}

                                        <div className="space-y-2">
                                            <Link href="/user" className="flex items-center gap-3 w-full p-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors group">
                                                <User className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                                个人中心
                                            </Link>
                                            <Link href="/user/orders" className="flex items-center gap-3 w-full p-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors group">
                                                <BookOpen className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                                我的订单
                                            </Link>
                                            <button
                                                onClick={() => signOut({ callbackUrl: '/' })}
                                                className="flex items-center gap-3 w-full p-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
                                            >
                                                <LogOut className="w-4 h-4 text-red-500 group-hover:text-red-600" />
                                                退出登录
                                            </button>
                                        </div>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        ) : (
                            <div className="hidden md:flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    className="text-sm font-medium text-blue-100 hover:text-white hover:bg-white/10 rounded-lg"
                                    asChild
                                >
                                    <Link href="/register">注册</Link>
                                </Button>
                                <Button
                                    className="bg-amber-400 hover:bg-amber-500 text-blue-950 text-sm font-bold shadow-md hover:shadow-lg transition-all rounded-lg"
                                    asChild
                                >
                                    <Link href="/login">
                                        <User className="mr-1.5 h-4 w-4" />
                                        登录
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden h-9 w-9 rounded-lg text-white hover:bg-white/10">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <MobileNav />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
