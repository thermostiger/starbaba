import Link from 'next/link';
import { Mail, MessageCircle, Sparkles, Heart, Crown, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-blue-950 text-slate-300 border-t-0 overflow-hidden">
            {/* Top Amber Line Separator */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-900 via-amber-400 to-blue-900 shadow-[0_1px_10px_rgba(251,191,36,0.3)] z-20" />

            {/* Background Decorations */}
            <div className="absolute top-[3px] left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            <div className="absolute -top-[200px] -right-[100px] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 pt-10 pb-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-10">

                    {/* Column 1: Brand & Vision (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="inline-flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-900/20 group-hover:scale-105 transition-transform duration-300">
                                <Sparkles className="w-6 h-6 text-blue-950" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold text-white tracking-tight leading-none group-hover:text-amber-400 transition-colors">K12书架</span>
                                <span className="text-[10px] text-slate-400 tracking-wider">StarDad English</span>
                            </div>
                        </Link>

                        <p className="text-sm leading-7 text-slate-400 max-w-sm">
                            我们精选全球优质教材、绘本、动画和纪录片，帮助孩子建立纯正的英语思维，让学习变回探索世界的快乐旅程。
                        </p>


                    </div>

                    {/* Column 2: Resources Navigation (3 cols) */}
                    <nav className="lg:col-span-3 space-y-6" aria-label="资源导航">
                        <h3 className="text-white font-bold text-base flex items-center gap-2">
                            <span className="w-1 h-4 bg-amber-400 rounded-full"></span>
                            精选资源
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/preschool"
                                    className="flex items-center gap-3 text-sm text-slate-400 hover:text-amber-400 transition-all group"
                                    title="浏览适合学龄前儿童的英语启蒙资源"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-amber-400 transition-colors"></span>
                                    <span>幼儿英语 (Preschool)</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/kids"
                                    className="flex items-center gap-3 text-sm text-slate-400 hover:text-amber-400 transition-all group"
                                    title="浏览适合少儿阶段的英语进阶资源"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-amber-400 transition-colors"></span>
                                    <span>少儿英语 (Kids)</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/teens"
                                    className="flex items-center gap-3 text-sm text-slate-400 hover:text-amber-400 transition-all group"
                                    title="浏览适合青少年的高阶英语内容"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-amber-400 transition-colors"></span>
                                    <span>青少年英语 (Teens)</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/science"
                                    className="flex items-center gap-3 text-sm text-slate-400 hover:text-amber-400 transition-all group"
                                    title="探索自然科学与人文历史原声纪录片"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-amber-400 transition-colors"></span>
                                    <span>原声科普 (Science)</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Column 3: Platform & Support (2 cols) */}
                    <nav className="lg:col-span-2 space-y-6" aria-label="平台服务">
                        <h3 className="text-white font-bold text-base flex items-center gap-2">
                            <span className="w-1 h-4 bg-amber-400 rounded-full"></span>
                            平台服务
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/vip" className="flex items-center gap-2 text-sm text-amber-400/90 hover:text-amber-400 font-medium transition-colors group">
                                    <Crown className="w-4 h-4" />
                                    <span>VIP会员权益</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2 group">
                                    <span>关于我们</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/sitemap" className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2 group">
                                    <span>网站地图</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Column 4: Contact & Social (3 cols) */}
                    <div className="lg:col-span-3 space-y-6">
                        <h3 className="text-white font-bold text-base flex items-center gap-2">
                            <span className="w-1 h-4 bg-amber-400 rounded-full"></span>
                            联系方式
                        </h3>

                        <div className="bg-blue-900/30 rounded-xl p-4 border border-blue-800 hover:border-blue-700 transition-colors">
                            <div className="flex flex-col gap-3">
                                <div className="text-sm text-slate-300 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-800/50 flex items-center justify-center shrink-0">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <span>邮箱:k12shelf@outlook.com</span>
                                </div>
                                <div className="text-sm text-slate-300 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-800/50 flex items-center justify-center shrink-0">
                                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-300 fill-current" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.69 13.93c-4.48 0-8.11-3.23-8.11-7.21S4.21-.49 8.69-.49c4.48 0 8.11 3.23 8.11 7.21 0 4-3.63 7.21-8.11 7.21zm6.98-2.67c0-.23-.03-.46-.07-.69 2.59.57 4.54 2.51 4.54 4.88 0 1.25-.54 2.38-1.41 3.21l.36 1.15-1.57-.86c-.66.23-1.37.36-2.11.36-3.27 0-5.92-2.31-5.92-5.16s2.65-5.16 5.92-5.16h.26z" />
                                        </svg>
                                    </div>
                                    <span>微信:k12shelf</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-blue-900/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                        <span>&copy; {currentYear} K12Shelf. All rights reserved.</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-amber-400 transition-colors">隐私政策</Link>
                        <Link href="/terms" className="hover:text-amber-400 transition-colors">用户协议</Link>
                        <Link href="/disclaimer" className="hover:text-amber-400 transition-colors">免责声明</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
