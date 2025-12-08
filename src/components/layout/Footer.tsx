import Link from 'next/link';
import { Mail, MessageCircle, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 mt-16 border-t border-gray-200">
            {/* Top accent bar */}
            <div className="h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500"></div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* 1. Brand & About */}
                    <div className="md:col-span-1 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center shadow-md">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
                                星爸英语
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-600">
                            专注于为3-12岁儿童提供优质英语学习资源，让孩子在快乐中学习英语。
                        </p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            <span>Made with</span>
                            <Heart className="w-3 h-3 text-red-400 fill-red-400" />
                            <span>for kids</span>
                        </div>
                    </div>

                    {/* 2. Quick Navigation */}
                    <div>
                        <h3 className="text-gray-900 font-bold text-sm mb-4 flex items-center gap-2">
                            <span className="w-1 h-4 bg-gradient-to-b from-orange-400 to-amber-500 rounded-full"></span>
                            快速导航
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/" className="text-gray-600 hover:text-orange-500 transition-colors inline-flex items-center gap-1.5 group">
                                    <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-orange-400 transition-colors"></span>
                                    首页
                                </Link>
                            </li>
                            <li>
                                <Link href="/documentary" className="text-gray-600 hover:text-orange-500 transition-colors inline-flex items-center gap-1.5 group">
                                    <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-orange-400 transition-colors"></span>
                                    纪录片
                                </Link>
                            </li>
                            <li>
                                <Link href="/vip" className="text-gray-600 hover:text-orange-500 transition-colors inline-flex items-center gap-1.5 group">
                                    <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-orange-400 transition-colors"></span>
                                    VIP会员
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-600 hover:text-orange-500 transition-colors inline-flex items-center gap-1.5 group">
                                    <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-orange-400 transition-colors"></span>
                                    关于我们
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 3. Resource Categories */}
                    <div>
                        <h3 className="text-gray-900 font-bold text-sm mb-4 flex items-center gap-2">
                            <span className="w-1 h-4 bg-gradient-to-b from-orange-400 to-amber-500 rounded-full"></span>
                            资源分类
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/category/enlightenment" className="text-gray-600 hover:text-orange-500 transition-colors inline-flex items-center gap-1.5 group">
                                    <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-orange-400 transition-colors"></span>
                                    启蒙英语
                                </Link>
                            </li>
                            <li>
                                <Link href="/category/teen" className="text-gray-600 hover:text-orange-500 transition-colors inline-flex items-center gap-1.5 group">
                                    <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-orange-400 transition-colors"></span>
                                    青少年英语
                                </Link>
                            </li>
                            <li>
                                <Link href="/category/animation" className="text-gray-600 hover:text-orange-500 transition-colors inline-flex items-center gap-1.5 group">
                                    <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-orange-400 transition-colors"></span>
                                    英语动画
                                </Link>
                            </li>
                            <li>
                                <Link href="/category/songs" className="text-gray-600 hover:text-orange-500 transition-colors inline-flex items-center gap-1.5 group">
                                    <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-orange-400 transition-colors"></span>
                                    英语儿歌
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 4. Contact */}
                    <div>
                        <h3 className="text-gray-900 font-bold text-sm mb-4 flex items-center gap-2">
                            <span className="w-1 h-4 bg-gradient-to-b from-orange-400 to-amber-500 rounded-full"></span>
                            联系我们
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-2 text-sm text-gray-600">
                                <Mail className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
                                <a href="mailto:contact@xingbaenglish.com" className="hover:text-orange-500 transition-colors break-all">
                                    contact@xingbaenglish.com
                                </a>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-600">
                                <MessageCircle className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                                <span>星爸微信：xingbaba</span>
                            </div>

                            {/* QR Code */}
                            <div className="bg-white p-3 rounded-xl inline-block shadow-md border border-gray-100 mt-4">
                                <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center text-[10px] text-gray-400 text-center border border-dashed border-gray-200 rounded-lg">
                                    <MessageCircle className="w-5 h-5 mb-1 text-gray-300" />
                                    <span>扫码加微信</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-6 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                        <div>
                            © {new Date().getFullYear()} StarDad-English. All rights reserved.
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/privacy" className="hover:text-orange-500 transition-colors">隐私政策</Link>
                            <span className="text-gray-300">|</span>
                            <Link href="/terms" className="hover:text-orange-500 transition-colors">服务条款</Link>
                            <span className="text-gray-300">|</span>
                            <Link href="/sitemap" className="hover:text-orange-500 transition-colors">网站地图</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
