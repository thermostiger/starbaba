export interface Resource {
  id: string;
  title: string;
  cover_image: string; // coverImage -> cover_image
  category: string;
  resource_info: string; // stage -> resource_info
  price: number;
  vipPrice: number;
  duration?: string; // 时长
  isEnglishAudio?: boolean; // 英文原声
  content?: string; // 富文本内容
  highlights?: string; // 资源亮点
  resourceUrl?: string; // 资源地址
  is_vip?: boolean; // isVip -> is_vip
  is_weekly_hot?: boolean; // isWeeklyHot -> is_weekly_hot
  is_new?: boolean; // isNew -> is_new
  created_at: string; // createdAt -> created_at
  assigned_page?: string; // assignedPage -> assigned_page
  is_published?: boolean; // isPublished -> is_published
  slug?: string;
  is_free?: boolean;
  extraction_code?: string | null;
  download_url?: string | null;
  is_unlocked?: boolean;
}

export interface MembershipPlan {
  id: string;
  name: string;
  duration: string; // "3天" | "年度" | "永久"
  price: number;
  originalPrice?: number;
  features: string[];
  highlighted?: boolean;
}

export interface Documentary {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  duration: string;
  isEnglishAudio: boolean;
  isVip?: boolean;
}

export interface User {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  provider: 'wechat' | 'qq' | 'google';
}
