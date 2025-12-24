import Link from 'next/link';
import { Mail, MessageCircle, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative bg-blue-950 text-slate-300 mt-0 border-t border-blue-900/50">
            {/* Top accent bar */}
            <div className="h-0.5 bg-gradient-to-r from-blue-600 via-amber-400 to-blue-600"></div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* 1. Brand & About (Span 4 columns) */}
                    <div className="lg:col-span-4 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-amber-900/20">
                                <Sparkles className="w-5 h-5 text-blue-950" />
                            </div>
                            <div className="text-xl font-bold text-white tracking-tight">
                                K12书架
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
                            专注于为3-12岁儿童提供优质英语学习资源，让孩子在快乐中学习英语。
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                            <span>Made with</span>
                            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                            <span>for kids</span>
                        </div>
                    </div>

                    {/* 2. Links Section (Nav & Categories combined in a wider area - Span 5 columns) */}
                    <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                        {/* Quick Navigation */}
                        <div>
                            <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                                <span className="w-1 h-3 bg-amber-400 rounded-full"></span>
                                快速导航
                            </h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="/" className="text-slate-400 hover:text-amber-400 transition-colors inline-flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-amber-400 transition-colors"></span>
                                        首页
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/documentary" className="text-slate-400 hover:text-amber-400 transition-colors inline-flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-amber-400 transition-colors"></span>
                                        纪录片
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/vip" className="text-slate-400 hover:text-amber-400 transition-colors inline-flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-amber-400 transition-colors"></span>
                                        VIP会员
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" className="text-slate-400 hover:text-amber-400 transition-colors inline-flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-amber-400 transition-colors"></span>
                                        关于我们
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Resource Categories */}
                        <div>
                            <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                                <span className="w-1 h-3 bg-amber-400 rounded-full"></span>
                                资源分类
                            </h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="/preschool" className="text-slate-400 hover:text-amber-400 transition-colors inline-flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-amber-400 transition-colors"></span>
                                        启蒙英语
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/teens" className="text-slate-400 hover:text-amber-400 transition-colors inline-flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-amber-400 transition-colors"></span>
                                        青少年英语
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/kids" className="text-slate-400 hover:text-amber-400 transition-colors inline-flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-amber-400 transition-colors"></span>
                                        少儿英语
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/science" className="text-slate-400 hover:text-amber-400 transition-colors inline-flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-amber-400 transition-colors"></span>
                                        科普纪录片
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* 3. Contact & QR (Span 3 columns) - Compact Side-by-Side */}
                    <div className="lg:col-span-3">
                        <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                            <span className="w-1 h-3 bg-amber-400 rounded-full"></span>
                            联系我们
                        </h3>
                        <div className="flex flex-row items-center gap-4">
                            {/* Text Info */}
                            <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                                    <a href="mailto:contact@xingbaenglish.com" className="hover:text-amber-400 transition-colors text-xs">
                                        contact@...
                                    </a>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <MessageCircle className="h-4 w-4 text-green-400 shrink-0" />
                                    <span className="text-xs">星爸微信：xingbaba</span>
                                </div>
                            </div>

                            {/* QR Code - Side by Side */}
                            <div className="bg-white p-1.5 rounded-lg shadow-md border border-slate-100 shrink-0 opacity-90 hover:opacity-100 transition-opacity">
                                <div className="w-16 h-16 bg-slate-50 flex flex-col items-center justify-center text-[9px] text-slate-400 text-center border border-dashed border-slate-300 rounded">
                                    <MessageCircle className="w-4 h-4 mb-0.5 text-slate-300" />
                                    <span>扫码加微信</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar - Minimal vertical padding */}
                <div className="mt-6 pt-4 border-t border-blue-900/50">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                        <div>
                            © {new Date().getFullYear()} StarDad-English. All rights reserved.
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/privacy" className="hover:text-amber-400 transition-colors">隐私政策</Link>
                            <span className="text-slate-800">|</span>
                            <Link href="/terms" className="hover:text-amber-400 transition-colors">服务条款</Link>
                            <span className="text-slate-800">|</span>
                            <Link href="/sitemap" className="hover:text-amber-400 transition-colors">网站地图</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
