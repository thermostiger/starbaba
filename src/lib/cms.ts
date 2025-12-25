import { Resource, Documentary } from '@/types';
import { pool } from '@/lib/db';

// Mock CMS data fetching functions
// In production, these would call the actual CMS API

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDbToResource(dbResource: any): Resource {
    return {
        id: dbResource.id.toString(),
        title: dbResource.title,
        resource_info: dbResource.resource_info || '',
        highlights: dbResource.highlights || '',
        cover_image: dbResource.cover_image || '/images/placeholder.jpg',
        category: dbResource.category,
        assigned_page: dbResource.assigned_page,
        price: parseFloat(dbResource.price) || 0,
        vipPrice: parseFloat(dbResource.vip_price) || 0,
        content: dbResource.content,
        resourceUrl: dbResource.resourceUrl || '',
        is_vip: dbResource.is_vip,
        is_weekly_hot: dbResource.is_weekly_hot,
        is_new: dbResource.is_new,
        created_at: dbResource.created_at,
        is_published: dbResource.is_published,
        is_free: dbResource.is_free,
    };
}

async function checkDbHasData(): Promise<boolean> {
    try {
        const result = await pool.query('SELECT 1 FROM resources LIMIT 1');
        return result.rows.length > 0;
    } catch (e) {
        console.error('Check DB data failed', e);
        return false;
    }
}


const MOCK_RESOURCES: Resource[] = [
    {
        id: '1',
        title: 'Peppa Pig 粉红猪小妹全集',
        resource_info: '适合3-6岁英语启蒙',
        cover_image: '/images/peppa.jpg',
        category: '动画',
        assigned_page: '幼儿英语',
        price: 29.9,
        vipPrice: 0,
        created_at: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'Oxford Reading Tree 牛津阅读树',
        resource_info: '分级阅读经典教材',
        cover_image: '/images/oxford.jpg',
        category: '绘本',
        assigned_page: '少儿英语',
        price: 49.9,
        vipPrice: 0,
        created_at: new Date().toISOString(),
    },
    {
        id: '3',
        title: 'Super Simple Songs 儿歌精选',
        resource_info: '朗朗上口的英语儿歌',
        cover_image: '/images/songs.jpg',
        category: '儿歌',
        assigned_page: '幼儿英语',
        price: 19.9,
        vipPrice: 0,
        created_at: new Date().toISOString(),
    },
    {
        id: '4',
        title: 'Phonics 自然拼读课程',
        resource_info: '系统学习发音规则',
        cover_image: '/images/phonics.jpg',
        category: '课程',
        assigned_page: '少儿英语', // 基础 -> 少儿英语/进阶
        price: 99.9,
        vipPrice: 0,
        created_at: new Date().toISOString(),
    },
    {
        id: '5',
        title: 'Harry Potter Audiobooks',
        resource_info: '哈利波特原版有声书',
        cover_image: '/images/oxford.jpg', // Placeholder using existing image
        category: '听力',
        assigned_page: '青少年英语',
        price: 59.9,
        vipPrice: 0,
        created_at: new Date().toISOString(),
    },
    {
        id: '6',
        title: 'TED Talks for Teens',
        resource_info: '适合青少年的TED演讲',
        cover_image: '/images/planet-earth.jpg', // Placeholder using existing image
        category: '视频',
        assigned_page: '青少年英语',
        price: 0,
        vipPrice: 0,
        created_at: new Date().toISOString(),
    },
    {
        id: '7',
        title: 'National Geographic Kids',
        resource_info: '国家地理儿童版',
        cover_image: '/images/africa.jpg', // Placeholder using existing image
        category: '阅读',
        assigned_page: '青少年英语',
        price: 39.9,
        vipPrice: 0,
        created_at: new Date().toISOString(),
    },
    {
        id: '8',
        title: 'Magic School Bus',
        resource_info: '神奇校车',
        cover_image: '/images/peppa.jpg', // Placeholder using existing image
        category: '动画',
        assigned_page: '幼儿英语',
        price: 29.9,
        vipPrice: 0,
        created_at: new Date().toISOString(),
    },
    {
        id: '9',
        title: 'Dr. Seuss Collection 苏斯博士',
        resource_info: '苏斯博士经典绘本集',
        cover_image: '/images/oxford.jpg',
        category: '绘本',
        assigned_page: '幼儿英语',
        price: 39.9,
        vipPrice: 0,
        created_at: new Date().toISOString(),
        is_weekly_hot: true,
    },
    {
        id: '10',
        title: 'I Can Read Series',
        resource_info: '经典分级阅读系列',
        cover_image: '/images/phonics.jpg',
        category: '绘本',
        assigned_page: '少儿英语',
        price: 45.9,
        vipPrice: 0,
        created_at: new Date().toISOString(),
        is_weekly_hot: true,
    }
];

export async function getHotResources(limit: number = 4): Promise<Resource[]> {
    try {
        const result = await pool.query(
            'SELECT * FROM resources WHERE is_weekly_hot = true AND is_published = true ORDER BY created_at DESC LIMIT $1',
            [limit]
        );
        if (result.rows.length > 0) {
            return result.rows.map(mapDbToResource);
        }

        // If DB has data but returned nothing (due to filtering), return empty list instead of mocks
        // Only return mocks if DB is completely empty (fresh install)
        if (await checkDbHasData()) {
            return [];
        }
    } catch (e) {
        console.error('Fetch hot resources failed', e);
    }
    return MOCK_RESOURCES.slice(0, limit);
}

export async function getResourcesByStage(stage: string, page: number = 1, limit: number = 16): Promise<{ data: Resource[], total: number }> {
    // Reverse map stage to assigned_page
    const stageToPage: Record<string, string> = {
        '启蒙': '幼儿英语',
        '进阶': '少儿英语',
        '青少年': '青少年英语',
        '全年龄': '科普纪录片',
    };
    const assignedPage = stageToPage[stage];

    if (assignedPage) {
        try {
            const offset = (page - 1) * limit;
            const countResult = await pool.query(
                'SELECT COUNT(*) FROM resources WHERE assigned_page = $1 AND is_published = true',
                [assignedPage]
            );
            const total = parseInt(countResult.rows[0].count);

            const result = await pool.query(
                'SELECT * FROM resources WHERE assigned_page = $1 AND is_published = true ORDER BY created_at DESC LIMIT $2 OFFSET $3',
                [assignedPage, limit, offset]
            );

            if (result.rows.length > 0) {
                return {
                    data: result.rows.map(mapDbToResource),
                    total
                };
            }

            // If DB has data but returned nothing (due to filtering), return empty list instead of mocks
            if (await checkDbHasData()) {
                return {
                    data: [],
                    total: 0
                };
            }
        } catch (e) {
            console.error('Fetch resources by stage failed', e);
        }
    }

    const filtered = MOCK_RESOURCES.filter(r => r.assigned_page === assignedPage);

    // Duplicate to fill the limit if needed to simulate more data
    const totalCount = 100; // Simulate 100 items
    const result = [];

    // Generate enough items
    while (result.length < totalCount) {
        if (result.length + filtered.length > totalCount) {
            result.push(...filtered.slice(0, totalCount - result.length).map((r, i) => ({ ...r, id: `${r.id}-${result.length + i}` })));
        } else {
            result.push(...filtered.map((r, i) => ({ ...r, id: `${r.id}-${result.length + i}` })));
        }
    }

    const start = (page - 1) * limit;
    const end = start + limit;

    return {
        data: result.slice(start, end),
        total: totalCount
    };
}

export async function getNewResources(limit: number = 16): Promise<Resource[]> {
    try {
        const result = await pool.query(
            'SELECT * FROM resources WHERE is_published = true ORDER BY created_at DESC LIMIT $1',
            [limit]
        );
        if (result.rows.length > 0) {
            return result.rows.map(mapDbToResource);
        }

        // If DB has data but returned nothing (due to filtering), return empty list instead of mocks
        if (await checkDbHasData()) {
            return [];
        }
    } catch (e) {
        console.error('Fetch new resources failed', e);
    }

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
            isVip: true,
        },
        {
            id: 'd2',
            title: 'Blue Planet 蓝色星球',
            subtitle: '探索海洋的奥秘',
            coverImage: '/images/blue-planet.jpg',
            duration: '45分钟',
            isEnglishAudio: true,
            isVip: true,
        },
        {
            id: 'd3',
            title: 'Cosmos 宇宙时空之旅',
            subtitle: '科学启蒙必看',
            coverImage: '/images/cosmos.jpg',
            duration: '42分钟',
            isEnglishAudio: true,
            isVip: false,
        },
        {
            id: 'd4',
            title: 'Life 生命',
            subtitle: 'BBC生物多样性纪录片',
            coverImage: '/images/life.jpg',
            duration: '50分钟',
            isEnglishAudio: true,
            isVip: true,
        },
        {
            id: 'd5',
            title: 'Frozen Planet 冰冻星球',
            subtitle: '极地探险之旅',
            coverImage: '/images/frozen.jpg',
            duration: '48分钟',
            isEnglishAudio: true,
            isVip: false,
        },
        {
            id: 'd6',
            title: 'Africa 非洲',
            subtitle: 'BBC非洲大陆纪录片',
            coverImage: '/images/africa.jpg',
            duration: '52分钟',
            isEnglishAudio: true,
            isVip: true,
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
    // For pure numeric IDs > 10 (database resources), query database directly
    // Mock resources use IDs 1-8, so we skip database query for those
    const numericId = parseInt(id);
    if (/^\d+$/.test(id) && numericId > 10) {
        console.log('[CMS] Fetching resource from database, ID:', id);
        try {
            const result = await pool.query(
                'SELECT * FROM resources WHERE id = $1 AND is_published = true',
                [id]
            );

            if (result.rows.length > 0) {
                const dbResource = result.rows[0];
                console.log('[CMS] Resource found in database:', dbResource.title);
                return mapDbToResource(dbResource);
            }
            console.log('[CMS] Resource not found in database');
        } catch (error) {
            console.error('Failed to fetch resource from database:', error);
        }
    }

    // First check static mock resources
    const staticResource = MOCK_RESOURCES.find(r => r.id === id);
    if (staticResource) return staticResource;

    // Handle generated IDs (e.g., "1-0", "1-0-1")
    // Extract the base ID (first part before any dash)
    const baseId = id.split('-')[0];
    const baseResource = MOCK_RESOURCES.find(r => r.id === baseId);
    if (baseResource) {
        return {
            ...baseResource,
            id: id, // Keep the requested ID
        };
    }

    // Check if it's a documentary ID (starts with 'd')
    if (id.startsWith('d')) {
        // Extract base documentary ID
        const docBaseId = id.split('-')[0];
        const baseDocumentaries = [
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

        const documentary = baseDocumentaries.find(d => d.id === docBaseId);
        if (documentary) {
            // Convert Documentary to Resource
            return {
                id: id,
                title: documentary.title,
                resource_info: documentary.subtitle,
                cover_image: documentary.coverImage,
                category: '纪录片',
                assigned_page: '科普纪录片',
                price: 39.9,
                vipPrice: 0,
                duration: documentary.duration,
                isEnglishAudio: documentary.isEnglishAudio,
                content: `<h2>${documentary.title}</h2><p>${documentary.subtitle}</p><p>时长：${documentary.duration}</p>`,
                created_at: new Date().toISOString(),
            };
        }
    }

    // Check generated mock resources
    const resources = await getNewResources(100);
    const mockResource = resources.find(r => r.id === id);
    if (mockResource) return mockResource;

    return null;
}

export async function getRelatedResources(resourceId: string, limit: number = 4): Promise<Resource[]> {
    const resources = await getNewResources(20);
    return resources.filter(r => r.id !== resourceId).slice(0, limit);
}
export async function getResourcesBySearch(query: string, limit: number = 5): Promise<Resource[]> {
    try {
        const result = await pool.query(
            'SELECT * FROM resources WHERE (title ILIKE $1 OR resource_info ILIKE $1) AND is_published = true ORDER BY created_at DESC LIMIT $2',
            [`%${query}%`, limit]
        );
        if (result.rows.length > 0) {
            return result.rows.map(mapDbToResource);
        }

        // Fallback to mock search if DB search returns nothing
        const mocks = MOCK_RESOURCES.filter(r =>
            r.title.includes(query) || (r.resource_info?.includes(query))
        );
        return mocks.slice(0, limit);
    } catch (e) {
        console.error('Fetch resources by search failed', e);
        return [];
    }
}
