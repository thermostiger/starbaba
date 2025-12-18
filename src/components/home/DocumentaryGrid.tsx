import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Clock, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Documentary } from '@/types';
import { Button } from '@/components/ui/button';

interface DocumentaryGridProps {
    documentaries: Documentary[];
    currentPage?: number;
    totalPages?: number;
    showPagination?: boolean;
}

export default function DocumentaryGrid({ documentaries, currentPage = 1, totalPages = 1, showPagination = true }: DocumentaryGridProps) {
    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-purple-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-xl">
                            <span className="text-2xl">🎬</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">科普纪录片</h2>
                            <p className="text-sm text-slate-500 mt-1">探索世界的奇妙窗口</p>
                        </div>
                    </div>
                    {!showPagination && (
                        <Link href="/documentaries" className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1 transition-colors">
                            查看更多
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </Link>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {documentaries.map((doc) => (
                        <Link key={doc.id} href={`/resource/${doc.id}`} className="block group">
                            <Card className="relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer h-full flex flex-col border border-purple-100/50 shadow-sm rounded-2xl bg-white">
                                {/* Top Image Area - 16:9 Aspect Ratio */}
                                <div className="relative w-full aspect-video">
                                    <Image
                                        src={doc.coverImage}
                                        alt={doc.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                                        <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                            <svg className="w-5 h-5 text-purple-600 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                        </div>
                                    </div>
                                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[10px] rounded font-medium backdrop-blur-sm">
                                        {doc.duration}
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-base mb-1 line-clamp-1 group-hover:text-purple-600 transition-colors">
                                            {doc.title}
                                        </h3>
                                        <p className="text-xs text-slate-500 line-clamp-2 mb-3">{doc.subtitle}</p>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                            {doc.isEnglishAudio && (
                                                <span className="px-1.5 py-0.5 bg-purple-50 text-purple-600 rounded">英文原声</span>
                                            )}
                                        </div>
                                        {/* Optional: Add rating or views here if available */}
                                        {doc.isVip ? (
                                            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-lg border border-purple-200">
                                                VIP
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg border border-green-200">
                                                免费
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                {showPagination && (
                    <div className="flex justify-center items-center gap-4 mt-12">
                        <Button variant="outline" size="icon" disabled={currentPage <= 1} asChild>
                            <Link href={`/documentary?page=${currentPage - 1}`}>
                                <ChevronLeft className="h-4 w-4" />
                            </Link>
                        </Button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                className={currentPage === page ? "bg-primary hover:bg-primary/90" : ""}
                                asChild
                            >
                                <Link href={`/documentary?page=${page}`}>
                                    {page}
                                </Link>
                            </Button>
                        ))}

                        <Button variant="outline" size="icon" disabled={currentPage >= totalPages} asChild>
                            <Link href={`/documentary?page=${currentPage + 1}`}>
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
