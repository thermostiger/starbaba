import { Resource, Documentary } from '@/types';

// Mock CMS data fetching functions
// In production, these would call the actual CMS API

const MOCK_RESOURCES: Resource[] = [
    {
        id: '1',
        title: 'Peppa Pig 粉红猪小妹全集',
        description: '适合3-6岁英语启蒙',
        coverImage: '/images/peppa.jpg',
        category: '动画',
        stage: '启蒙',
        price: 29.9,
        vipPrice: 0,
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'Oxford Reading Tree 牛津阅读树',
        description: '分级阅读经典教材',
        coverImage: '/images/oxford.jpg',
        category: '绘本',
        stage: '进阶',
        price: 49.9,
        vipPrice: 0,
        createdAt: new Date().toISOString(),
    },
    {
        id: '3',
        title: 'Super Simple Songs 儿歌精选',
        description: '朗朗上口的英语儿歌',
        coverImage: '/images/songs.jpg',
        category: '儿歌',
        stage: '启蒙',
        price: 19.9,
        vipPrice: 0,
        createdAt: new Date().toISOString(),
    },
    {
        id: '4',
        title: 'Phonics 自然拼读课程',
        description: '系统学习发音规则',
        coverImage: '/images/phonics.jpg',
        category: '课程',
        stage: '基础',
        price: 99.9,
        vipPrice: 0,
        createdAt: new Date().toISOString(),
    },
    {
        id: '5',
        title: 'Harry Potter Audiobooks',
        description: '哈利波特原版有声书',
        coverImage: '/images/oxford.jpg', // Placeholder using existing image
        category: '听力',
        stage: '青少年',
        price: 59.9,
        vipPrice: 0,
        createdAt: new Date().toISOString(),
    },
    {
        id: '6',
        title: 'TED Talks for Teens',
        description: '适合青少年的TED演讲',
        coverImage: '/images/planet-earth.jpg', // Placeholder using existing image
        category: '视频',
        stage: '青少年',
        price: 0,
        vipPrice: 0,
        createdAt: new Date().toISOString(),
    },
    {
        id: '7',
        title: 'National Geographic Kids',
        description: '国家地理儿童版',
        coverImage: '/images/africa.jpg', // Placeholder using existing image
        category: '阅读',
        stage: '青少年',
        price: 39.9,
        vipPrice: 0,
        createdAt: new Date().toISOString(),
    },
    {
        id: '8',
        title: 'Magic School Bus',
        description: '神奇校车',
        coverImage: '/images/peppa.jpg', // Placeholder using existing image
        category: '动画',
        stage: '启蒙',
        price: 29.9,
        vipPrice: 0,
        createdAt: new Date().toISOString(),
    }
];

export async function getHotResources(limit: number = 4): Promise<Resource[]> {
    return MOCK_RESOURCES.slice(0, limit);
}

export async function getResourcesByStage(stage: string, limit: number = 16): Promise<Resource[]> {
    const filtered = MOCK_RESOURCES.filter(r => r.stage === stage);

    // Duplicate to fill the limit if needed to simulate more data
    const result = [];
    if (filtered.length === 0) return [];

    while (result.length < limit) {
        if (result.length + filtered.length > limit) {
            result.push(...filtered.slice(0, limit - result.length).map((r, i) => ({ ...r, id: `${r.id}-${result.length + i}` })));
        } else {
            result.push(...filtered.map((r, i) => ({ ...r, id: `${r.id}-${result.length + i}` })));
        }
    }

    return result;
}

export async function getNewResources(limit: number = 16): Promise<Resource[]> {
    const base = await getHotResources(4);
    // Create unique resources by adding suffixes to IDs
    const duplicated = [];
    for (let i = 0; i < 4; i++) {
        duplicated.push(...base.map((r, idx) => ({
            ...r,
            id: `${r.id}-${i}-${idx}`,
        })));
    }
    return duplicated.slice(0, limit);
}

export async function getDocumentaries(page: number = 1, limit: number = 12): Promise<{ data: Documentary[], total: number }> {
    const allDocs = [
        {
            id: 'd1',
            title: 'Planet Earth 地球脉动',
            subtitle: 'BBC自然纪录片经典之作',
            coverImage: '/images/planet-earth.jpg',
            duration: '50分钟',
            isEnglishAudio: true,
        },
        {
            id: 'd2',
            title: 'Blue Planet 蓝色星球',
            subtitle: '探索海洋的奥秘',
            coverImage: '/images/blue-planet.jpg',
            duration: '45分钟',
            isEnglishAudio: true,
        },
        {
            id: 'd3',
            title: 'Cosmos 宇宙时空之旅',
            subtitle: '科学启蒙必看',
            coverImage: '/images/cosmos.jpg',
            duration: '42分钟',
            isEnglishAudio: true,
        },
        {
            id: 'd4',
            title: 'Life 生命',
            subtitle: 'BBC生物多样性纪录片',
            coverImage: '/images/life.jpg',
            duration: '50分钟',
            isEnglishAudio: true,
        },
        {
            id: 'd5',
            title: 'Frozen Planet 冰冻星球',
            subtitle: '极地探险之旅',
            coverImage: '/images/frozen.jpg',
            duration: '48分钟',
            isEnglishAudio: true,
        },
        {
            id: 'd6',
            title: 'Africa 非洲',
            subtitle: 'BBC非洲大陆纪录片',
            coverImage: '/images/africa.jpg',
            duration: '52分钟',
            isEnglishAudio: true,
        },
    ];

    // Simulate more data for pagination
    const totalDocs = [];
    for (let i = 0; i < 5; i++) {
        totalDocs.push(...allDocs.map((d, idx) => ({ ...d, id: `${d.id}-${i}-${idx}` })));
    }

    const start = (page - 1) * limit;
    const end = start + limit;

    return {
        data: totalDocs.slice(start, end),
        total: totalDocs.length
    };
}

export async function getResourceById(id: string): Promise<Resource | null> {
    const resources = await getNewResources(100);
    const resource = resources.find(r => r.id === id);

    if (resource) return resource;

    // Check if it's a documentary ID
    const { data: documentaries } = await getDocumentaries(1, 100);
    const documentary = documentaries.find(d => d.id === id);

    if (documentary) {
        // Convert Documentary to Resource
        return {
            id: documentary.id,
            title: documentary.title,
            description: documentary.subtitle,
            coverImage: documentary.coverImage,
            category: '纪录片',
            stage: '全年龄',
            price: 39.9,
            vipPrice: 0,
            duration: documentary.duration,
            isEnglishAudio: documentary.isEnglishAudio,
            content: `<h2>${documentary.title}</h2><p>${documentary.subtitle}</p><p>时长：${documentary.duration}</p>`,
            createdAt: new Date().toISOString(),
        };
    }

    return null;
}

export async function getRelatedResources(resourceId: string, limit: number = 4): Promise<Resource[]> {
    const resources = await getNewResources(20);
    return resources.filter(r => r.id !== resourceId).slice(0, limit);
}
