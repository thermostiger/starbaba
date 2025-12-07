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
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">科普纪录片专区</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                    {documentaries.map((doc) => (
                        <Link key={doc.id} href={`/resource/${doc.id}`} className="w-full max-w-[250px]">
                            <Card className="group overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer h-[250px] flex flex-col">
                                {/* Top 50%: Image */}
                                <div className="relative h-1/2 w-full">
                                    <Image
                                        src={doc.coverImage}
                                        alt={doc.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Bottom 50%: Content */}
                                <div className="h-1/2 p-4 flex flex-col justify-between bg-white">
                                    <div>
                                        <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors line-clamp-1">
                                            {doc.title}
                                        </h3>
                                        <p className="text-xs text-muted-foreground line-clamp-2">{doc.subtitle}</p>
                                    </div>

                                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                                        {doc.isEnglishAudio && (
                                            <div className="flex items-center gap-1 text-primary">
                                                <Volume2 className="h-3 w-3" />
                                                <span>英文</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            <span>{doc.duration}</span>
                                        </div>
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
