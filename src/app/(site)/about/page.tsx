import { Mail, MessageCircle, Heart } from 'lucide-react';

export const metadata = {
    title: '关于星爸英语',
    description: '星爸英语 - 专注于为3-12岁儿童提供优质英语学习资源',
};

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Hero */}
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    关于星爸英语
                </h1>
                <p className="text-xl text-muted-foreground">
                    让每个孩子都能享受优质的英语启蒙教育
                </p>
            </div>

            {/* Story */}
            <div className="prose max-w-none mb-16">
                <h2 className="text-3xl font-bold mb-6">我们的故事</h2>
                <p className="text-lg leading-relaxed mb-4">
                    星爸英语创立于2020年，由一群热爱教育的父母发起。我们深知英语启蒙对孩子成长的重要性，
                    也理解家长们在寻找优质学习资源时的困扰。
                </p>
                <p className="text-lg leading-relaxed mb-4">
                    因此，我们致力于精选全球最优质的英语学习资源，包括经典动画、分级绘本、趣味儿歌、
                    BBC纪录片等，让孩子在快乐中学习英语，在兴趣中提升能力。
                </p>
            </div>

            {/* Mission */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 mb-16">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Heart className="w-8 h-8 text-primary" />
                    我们的使命
                </h2>
                <p className="text-lg leading-relaxed">
                    让每个中国孩子都能接触到世界一流的英语学习资源，
                    通过科学的方法和优质的内容，培养孩子的英语思维和国际视野。
                </p>
            </div>

            {/* Values */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8">核心价值观</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h3 className="font-bold text-xl mb-3">优质内容</h3>
                        <p className="text-muted-foreground">
                            严格筛选每一份资源，确保内容的教育价值和趣味性
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h3 className="font-bold text-xl mb-3">科学方法</h3>
                        <p className="text-muted-foreground">
                            遵循儿童语言习得规律，提供分级、系统的学习路径
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h3 className="font-bold text-xl mb-3">用户至上</h3>
                        <p className="text-muted-foreground">
                            倾听家长和孩子的需求，持续优化产品和服务
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h3 className="font-bold text-xl mb-3">持续创新</h3>
                        <p className="text-muted-foreground">
                            紧跟教育科技发展，不断探索更好的学习方式
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact */}
            <div className="bg-slate-900 text-white rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6">联系我们</h2>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Mail className="w-6 h-6" />
                        <a href="mailto:contact@xingbaenglish.com" className="hover:text-primary transition-colors">
                            contact@xingbaenglish.com
                        </a>
                    </div>
                    <div className="flex items-center gap-3">
                        <MessageCircle className="w-6 h-6" />
                        <span>微信客服：xingba_english</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
