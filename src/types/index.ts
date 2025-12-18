export interface Resource {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  category: string;
  stage: string; // 阶段标签
  price: number;
  vipPrice: number;
  duration?: string; // 时长
  isEnglishAudio?: boolean; // 英文原声
  content?: string; // 富文本内容
  highlights?: string; // 资源亮点
  resourceUrl?: string; // 资源地址
  isVip?: boolean; // 是否VIP资源
  isWeeklyHot?: boolean;
  isNew?: boolean;
  createdAt: string;
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
