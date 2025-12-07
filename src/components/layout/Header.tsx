'use client';

import Link from 'next/link';
import { Search, Menu, User, Crown, LogOut, Settings, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
    } | null = null;

    const isActive = (path: string) => pathname === path;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-t-4 border-t-orange-500 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 shrink-0 group">
                    <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                        星爸英语
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8 shrink-0">
                    {[
                        { href: '/', label: '首页' },
                        { href: '/category/enlightenment', label: '启蒙英语' },
                        { href: '/category/teen', label: '青少年英语' },
                        { href: '/documentary', label: '纪录片' },
                        { href: '/vip', label: 'VIP', icon: <Crown className="w-4 h-4 mr-1 text-yellow-500" /> },
                        { href: '/about', label: '关于星爸' },
                    ].map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`group relative text-sm font-medium transition-colors py-2 ${isActive(link.href) ? 'text-orange-600 font-bold' : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <span className="flex items-center">
                                {link.icon}
                                {link.label}
                            </span>
                            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-transform duration-300 ease-out origin-left ${isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                }`} />
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    {/* Search Box - Moved to the left of buttons */}
                    <div className="hidden md:flex items-center justify-end transition-all duration-300 ease-in-out" style={{ width: isSearchExpanded ? '200px' : '40px' }}>
                        {isSearchExpanded ? (
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="搜索..."
                                    className="pl-9 h-9 bg-gray-50 focus:bg-white transition-colors w-full rounded-full border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                                    autoFocus
                                    onBlur={() => setIsSearchExpanded(false)}
                                />
                            </div>
                        ) : (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsSearchExpanded(true)}
                                className="hover:bg-gray-100 rounded-full text-gray-600"
                            >
                                <Search className="h-5 w-5" />
                            </Button>
                        )}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-4 shrink-0">
                        {/* User Profile with Hover Card */}
                        {user ? (
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-offset-2 ring-transparent hover:ring-orange-100 transition-all">
                                        <Avatar className="h-9 w-9 border border-gray-200">
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback>VIP</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80" align="end">
                                    <div className="flex justify-between space-x-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={user.avatar} />
                                            <AvatarFallback>VIP</AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1 flex-1">
                                            <h4 className="text-sm font-semibold flex items-center">
                                                {user.name}
                                                {user.isVip && <Crown className="w-3 h-3 ml-1 text-yellow-500 fill-yellow-500" />}
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
                                                <Button variant="outline" size="sm" className="w-full text-xs">
                                                    <BookOpen className="w-3 h-3 mr-1" />
                                                    我的课程
                                                </Button>
                                                <Button variant="outline" size="sm" className="w-full text-xs">
                                                    <Settings className="w-3 h-3 mr-1" />
                                                    账号设置
                                                </Button>
                                            </div>
                                            <Button variant="ghost" size="sm" className="w-full text-xs mt-1 text-red-500 hover:text-red-600 hover:bg-red-50">
                                                <LogOut className="w-3 h-3 mr-1" />
                                                退出登录
                                            </Button>
                                        </div>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        ) : (
                            <div className="hidden md:flex items-center gap-3">
                                <Button variant="ghost" className="text-sm font-medium hover:text-primary hover:bg-orange-50" asChild>
                                    <Link href="/register">注册</Link>
                                </Button>
                                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-sm font-medium shadow-md hover:shadow-lg transition-all" asChild>
                                    <Link href="/login">
                                        <User className="mr-2 h-4 w-4" />
                                        登录
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
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
