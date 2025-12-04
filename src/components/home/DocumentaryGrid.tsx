import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Clock, Volume2 } from 'lucide-react';
import { Documentary } from '@/types';

interface DocumentaryGridProps {
    documentaries: Documentary[];
}

export default function DocumentaryGrid({ documentaries }: DocumentaryGridProps) {
    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">科普纪录片专区</h2>
                    <Link href="/documentary" className="text-primary hover:underline">
                        查看更多 →
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {documentaries.map((doc) => (
                        <Link key={doc.id} href={`/resource/${doc.id}`}>
                            <Card className="group overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer">
                                <div className="flex flex-col sm:flex-row">
                                    {/* Left: Image */}
                                    <div className="relative w-full sm:w-2/5 aspect-video sm:aspect-auto">
                                        <Image
                                            src={doc.coverImage}
                                            alt={doc.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Right: Content */}
                                    <div className="flex-1 p-6">
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                            {doc.title}
                                        </h3>
                                        <p className="text-muted-foreground mb-4">{doc.subtitle}</p>

                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            {doc.isEnglishAudio && (
                                                <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded">
                                                    <Volume2 className="h-4 w-4" />
                                                    <span>英文原声</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                <span>{doc.duration}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
