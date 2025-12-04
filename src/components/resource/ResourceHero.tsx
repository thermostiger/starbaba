import Image from 'next/image';
import { Resource } from '@/types';

interface ResourceHeroProps {
    resource: Resource;
}

export default function ResourceHero({ resource }: ResourceHeroProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Cover Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                    src={resource.coverImage}
                    alt={resource.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                />
            </div>

            {/* Right: Info */}
            <div className="flex flex-col justify-center">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 w-fit">
                    {resource.stage}
                </div>

                <h1 className="text-4xl font-bold mb-4">{resource.title}</h1>

                <p className="text-lg text-muted-foreground mb-6">
                    {resource.description}
                </p>

                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                    <div className="flex items-baseline gap-4">
                        <div>
                            <div className="text-sm text-muted-foreground">单买价格</div>
                            <div className="text-3xl font-bold text-primary">¥{resource.price}</div>
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground">VIP会员价</div>
                            <div className="text-2xl font-bold text-secondary">
                                {resource.vipPrice === 0 ? '免费' : `¥${resource.vipPrice}`}
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        开通VIP会员即可免费获取全站资源，无限制下载
                    </p>
                </div>
            </div>
        </div>
    );
}
