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

export default function Header() {
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);

    // Mock user for demonstration
    // Mock user for demonstration - set to null to show logged out state
    const user: {
        name: string;
        id: string;
        avatar: string;
        isVip: boolean;
        vipExpireDate: string;
    } | null = null;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 shrink-0">
                    <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        星爸英语
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6 shrink-0">
                    <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                        首页
                    </Link>
                    <Link href="/category/enlightenment" className="text-sm font-medium hover:text-primary transition-colors">
                        启蒙英语
                    </Link>
                    <Link href="/category/teen" className="text-sm font-medium hover:text-primary transition-colors">
                        青少年英语
                    </Link>
                    <Link href="/documentary" className="text-sm font-medium hover:text-primary transition-colors">
                        纪录片
                    </Link>
                    <Link href="/vip" className="text-sm font-medium hover:text-primary transition-colors flex items-center">
                        <Crown className="w-4 h-4 mr-1 text-yellow-500" />
                        VIP
                    </Link>
                    <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                        关于星爸
                    </Link>
                </nav>

                {/* Search Box */}
                <div className="hidden md:flex items-center justify-end transition-all duration-300 ease-in-out" style={{ width: isSearchExpanded ? '300px' : '40px' }}>
                    {isSearchExpanded ? (
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="搜索资源..."
                                className="pl-9 h-9 bg-muted/50 focus:bg-white transition-colors w-full"
                                autoFocus
                                onBlur={() => setIsSearchExpanded(false)}
                            />
                        </div>
                    ) : (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSearchExpanded(true)}
                            className="hover:bg-muted/50"
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
                                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                                    <Avatar className="h-9 w-9 border-2 border-orange-100">
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
                        <div className="hidden md:flex items-center gap-2">
                            <Button variant="ghost" className="text-sm font-medium">
                                注册
                            </Button>
                            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-sm font-medium">
                                <User className="mr-2 h-4 w-4" />
                                登录
                            </Button>
                        </div>
                    )}

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
