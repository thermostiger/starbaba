import { Resource } from '@/types';

export const MOCK_RESOURCES: Resource[] = Array.from({ length: 15 }).map((_, i) => ({
    id: `mock-${i}`,
    title: `示例资源: 这是一个非常有趣的英语启蒙资源 ${i + 1}`,
    cover_image: i % 2 === 0
        ? 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop'
        : 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop',
    category: '英语启蒙',
    resource_info: i % 3 === 0 ? '绘本 PDF' : '原版动画',
    price: 0,
    vipPrice: 0,
    description: '这是一个示例描述，用于展示卡片样式。当没有真实数据时显示此内容。',
    is_vip: i % 3 !== 0,
    is_free: i % 3 === 0,
    is_weekly_hot: i === 0 || i === 4,
    is_new: i === 1 || i === 5,
    created_at: new Date().toISOString(),
    is_published: true,
}));
