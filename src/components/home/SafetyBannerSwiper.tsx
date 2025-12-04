'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';

const SAFETY_BANNERS = [
    {
        id: 1,
        image: '/images/safety-1.jpg',
        alt: '安全保障 - 正版授权',
    },
    {
        id: 2,
        image: '/images/safety-2.jpg',
        alt: '安全保障 - 无广告',
    },
    {
        id: 3,
        image: '/images/safety-3.jpg',
        alt: '安全保障 - 儿童友好',
    },
];

export default function SafetyBannerSwiper() {
    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    className="rounded-2xl overflow-hidden shadow-xl pb-12"
                >
                    {SAFETY_BANNERS.map((banner) => (
                        <SwiperSlide key={banner.id}>
                            <div className="relative w-full aspect-[21/9]">
                                <Image
                                    src={banner.image}
                                    alt={banner.alt}
                                    fill
                                    className="object-cover"
                                    priority={banner.id === 1}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
