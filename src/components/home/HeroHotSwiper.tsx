'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Resource } from '@/types';
import { Mail, MessageCircle, QrCode } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

interface HeroHotSwiperProps {
    resources: Resource[];
}

export default function HeroHotSwiper({ resources }: HeroHotSwiperProps) {
    return (
        <section className="py-12 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
                <div className="absolute top-10 right-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative">
                <div className="flex items-center justify-center mb-8 space-x-2">
                    <span className="text-2xl">🔥</span>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        本周热门资源
                    </h2>
                </div>

                <Swiper
                    modules={[Autoplay, Pagination, EffectCoverflow]}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView="auto"
                    loop={true}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                    className="pb-12 !overflow-visible"
                >
                    {resources.map((resource) => (
                        <SwiperSlide key={resource.id}>
                            <Link href={`/resource/${resource.id}`}>
                                <Card className="group overflow-hidden h-80 relative cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border-0 shadow-md rounded-2xl">
                                    <div className="relative h-full">
                                        <Image
                                            src={resource.coverImage}
                                            alt={resource.title}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                        {/* Content */}
                                        <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                            <div className="inline-block px-2.5 py-1 bg-primary/90 backdrop-blur-sm rounded-lg text-xs font-bold mb-2 shadow-sm">
                                                {resource.stage}
                                            </div>
                                            <h3 className="font-bold text-lg mb-1.5 line-clamp-2 leading-tight group-hover:text-orange-200 transition-colors">
                                                {resource.title}
                                            </h3>
                                            <p className="text-xs text-gray-300 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                                {resource.description}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
