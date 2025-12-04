import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Resource } from '@/types';

interface RelatedResourcesProps {
    resources: Resource[];
}

export default function RelatedResources({ resources }: RelatedResourcesProps) {
    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">相关推荐</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {resources.map((resource) => (
                    <Link key={resource.id} href={`/resource/${resource.id}`}>
                        <Card className="group overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer">
                            <div className="relative aspect-[3/4]">
                                <Image
                                    src={resource.coverImage}
                                    alt={resource.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <CardContent className="p-3">
                                <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                    {resource.title}
                                </h3>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs text-muted-foreground">{resource.stage}</span>
                                    <span className="text-xs font-bold text-primary">¥{resource.price}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
