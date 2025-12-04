'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function AnnouncementBar() {
    const [isVisible, setIsVisible] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted || !isVisible) return null;

    return (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 relative">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex-1 text-center text-sm md:text-base">
                    🎉 新用户专享：前100名注册即送3天VIP体验！
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="ml-4 hover:bg-white/20 rounded-full p-1 transition-colors"
                    aria-label="关闭公告"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
