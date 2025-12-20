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

export default function Header() {
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const pathname = usePathname();

    // Mock user for demonstration - set to null to show logged out state
    const user: {
        name: string;
        id: string;
        avatar: string;
        isVip: boolean;
        vipExpireDate: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } | null = (null as any);

    const isActive = (path: string) => pathname === path;

    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Logo with badge style */}
                <Link href="/" className="flex items-center gap-3 shrink-0 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all group-hover:scale-105">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
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
                                ? 'text-orange-600 bg-orange-50'
                                : link.highlight
                                    ? 'text-amber-600 hover:text-amber-700 hover:bg-amber-50'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            <span className="flex items-center gap-1.5">
                                {link.highlight && <Crown className="w-3.5 h-3.5 text-amber-500" />}
                                {link.label}
                            </span>
                            {isActive(link.href) && (
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full"></span>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    {/* Search Box */}
                    <div className="hidden md:flex items-center">
                        {isSearchExpanded ? (
                            <div className="relative w-56">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    type="search"
                                    placeholder="搜索资源..."
                                    className="pl-9 h-9 bg-gray-50 border-gray-200 rounded-full focus:bg-white focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                                    autoFocus
                                    onBlur={() => setIsSearchExpanded(false)}
                                />
                            </div>
                        ) : (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsSearchExpanded(true)}
                                className="h-9 w-9 rounded-full hover:bg-gray-100 text-gray-600"
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
                                    <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-offset-2 ring-transparent hover:ring-orange-100 transition-all">
                                        <Avatar className="h-9 w-9 border-2 border-orange-200">
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback className="bg-gradient-to-br from-orange-400 to-amber-500 text-white">VIP</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80" align="end">
                                    <div className="flex justify-between space-x-4">
                                        <Avatar className="h-12 w-12 border-2 border-orange-200">
                                            <AvatarImage src={user.avatar} />
                                            <AvatarFallback className="bg-gradient-to-br from-orange-400 to-amber-500 text-white">VIP</AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1 flex-1">
                                            <h4 className="text-sm font-semibold flex items-center">
                                                {user.name}
                                                {user.isVip && <Crown className="w-3 h-3 ml-1 text-amber-500 fill-amber-500" />}
                                            </h4>
                                            <p className="text-xs text-muted-foreground">
                                                ID: {user.id}
                                            </p>
                                            <div className="flex items-center pt-2">
                                                <span className="text-xs text-muted-foreground">
                                                    VIP有效期至：{user.vipExpireDate}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 mt-4">
                                                <Button variant="outline" size="sm" className="w-full text-xs rounded-lg">
                                                    <BookOpen className="w-3 h-3 mr-1" />
                                                    我的课程
                                                </Button>
                                                <Button variant="outline" size="sm" className="w-full text-xs rounded-lg">
                                                    <Settings className="w-3 h-3 mr-1" />
                                                    账号设置
                                                </Button>
                                            </div>
                                            <Button variant="ghost" size="sm" className="w-full text-xs mt-1 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg">
                                                <LogOut className="w-3 h-3 mr-1" />
                                                退出登录
                                            </Button>
                                        </div>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        ) : (
                            <div className="hidden md:flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    className="text-sm font-medium text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg"
                                    asChild
                                >
                                    <Link href="/register">注册</Link>
                                </Button>
                                <Button
                                    className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all rounded-lg"
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
                            <Button variant="ghost" size="icon" className="md:hidden h-9 w-9 rounded-lg">
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
