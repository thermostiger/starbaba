import Link from 'next/link';
import { Mail, MessageCircle, Sparkles, Heart, Crown, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-slate-950 text-slate-300 border-t border-slate-800/60 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            <div className="absolute -top-[200px] -right-[100px] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 pt-16 pb-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">

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
                            专为3-12岁中国儿童打造的英语原版资源库。我们精选全球优质原版教材、绘本、动画和纪录片，帮助孩子建立纯正的英语思维，让学习变回探索世界的快乐旅程。
                        </p>

                        <div className="flex items-center gap-2 pt-2">
                            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400 font-medium">
                                专注原版阅读
                            </span>
                            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400 font-medium">
                                科学分级体系
                            </span>
                        </div>
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
                                    className="flex items-center gap-3 text-slate-400 hover:text-amber-400 transition-all group"
                                    title="浏览适合学龄前儿童的英语启蒙资源"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-amber-400 transition-colors"></span>
                                    <span>幼儿英语 (Preschool)</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/kids"
                                    className="flex items-center gap-3 text-slate-400 hover:text-amber-400 transition-all group"
                                    title="浏览适合少儿阶段的英语进阶资源"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-amber-400 transition-colors"></span>
                                    <span>少儿英语 (Kids)</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/teens"
                                    className="flex items-center gap-3 text-slate-400 hover:text-amber-400 transition-all group"
                                    title="浏览适合青少年的高阶英语内容"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-amber-400 transition-colors"></span>
                                    <span>青少年英语 (Teens)</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/science"
                                    className="flex items-center gap-3 text-slate-400 hover:text-amber-400 transition-all group"
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
                                <Link href="/vip" className="flex items-center gap-2 text-amber-400/90 hover:text-amber-400 font-medium transition-colors group">
                                    <Crown className="w-4 h-4" />
                                    <span>VIP会员权益</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2 group">
                                    <span>关于我们</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/sitemap" className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2 group">
                                    <span>网站地图</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Column 4: Contact & Social (3 cols) */}
                    <div className="lg:col-span-3 space-y-6">
                        <h3 className="text-white font-bold text-base flex items-center gap-2">
                            <span className="w-1 h-4 bg-amber-400 rounded-full"></span>
                            联系与交流
                        </h3>

                        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 hover:border-slate-700 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="bg-white p-1 rounded-lg shrink-0">
                                    <div className="w-20 h-20 bg-slate-100 flex flex-col items-center justify-center text-[10px] text-slate-400 text-center border border-dashed border-slate-300 rounded">
                                        <div className="w-full h-full flex items-center justify-center">
                                            <MessageCircle className="w-6 h-6 text-slate-300" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-white flex items-center gap-2">
                                        <MessageCircle className="w-4 h-4 text-green-500" />
                                        <span>官方微信客服</span>
                                    </div>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        添加微信 <span className="text-amber-400 font-mono font-bold select-all">xingbaba</span><br />
                                        获取专属学习规划建议
                                    </p>
                                    <div className="pt-1">
                                        <a href="mailto:contact@xingbaenglish.com" className="text-xs text-slate-500 hover:text-amber-400 transition-colors flex items-center gap-1.5">
                                            <Mail className="w-3.5 h-3.5" />
                                            contact@xingbaenglish.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                        <span>&copy; {currentYear} K12书架 (StarDad English). All rights reserved.</span>
                        <span className="hidden md:inline text-slate-700">|</span>
                        <div className="flex items-center gap-1">
                            <span>Made with</span>
                            <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
                            <span>for kids</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-amber-400 transition-colors">隐私政策</Link>
                        <Link href="/terms" className="hover:text-amber-400 transition-colors">服务条款</Link>
                        <Link href="/copyright" className="hover:text-amber-400 transition-colors">版权声明</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
