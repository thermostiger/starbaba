import Link from 'next/link';
import { Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 mt-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {/* 1. Brand & About */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                星爸英语
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
                            专注于为3-12岁儿童提供优质英语学习资源，包括动画、绘本、儿歌、纪录片等，让孩子在快乐中学习英语。
                        </p>
                        <div className="text-xs text-slate-500 pt-2">
                            &copy; {new Date().getFullYear()} StarDad-English. All rights reserved.
                        </div>
                    </div>

                    {/* 2. Navigation & Resources (Combined) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-white font-bold text-base mb-3">快速导航</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/" className="hover:text-primary transition-colors">首页</Link></li>
                                <li><Link href="/documentary" className="hover:text-primary transition-colors">纪录片</Link></li>
                                <li><Link href="/vip" className="hover:text-primary transition-colors">VIP会员</Link></li>
                                <li><Link href="/about" className="hover:text-primary transition-colors">关于我们</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-base mb-3">资源分类</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/category/animation" className="hover:text-primary transition-colors">英语动画</Link></li>
                                <li><Link href="/category/songs" className="hover:text-primary transition-colors">英语儿歌</Link></li>
                                <li><Link href="/category/teen" className="hover:text-primary transition-colors">青少年英语</Link></li>
                                <li><Link href="/category/enlightenment" className="hover:text-primary transition-colors">启蒙英语</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* 3. Contact */}
                    <div className="flex flex-col md:items-end space-y-4">
                        <div className="text-right">
                            <h3 className="text-white font-bold text-base mb-3">联系我们</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-end space-x-2">
                                    <Mail className="h-4 w-4" />
                                    <a href="mailto:contact@xingbaenglish.com" className="hover:text-primary transition-colors">
                                        contact@xingbaenglish.com
                                    </a>
                                </div>
                                <div className="flex items-center justify-end space-x-2">
                                    <MessageCircle className="h-4 w-4" />
                                    <span>星爸微信：xingbaba</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-1.5 rounded-lg inline-block w-24 h-24 relative shadow-lg">
                            {/* Placeholder for QR Code */}
                            <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-[10px] text-slate-400 text-center border border-dashed border-slate-300 rounded">
                                <span>扫码加微信</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
