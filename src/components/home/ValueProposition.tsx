import { BookOpen, Compass, Lightbulb } from 'lucide-react';

export default function ValueProposition() {
    const items = [
        {
            icon: <BookOpen className="w-8 h-8 text-orange-500" />,
            title: '激发阅读本能',
            description: '无需刻意坚持，让内容本身成为吸引力。无论处于哪个阶段，每个人都能在这里找到沉浸书海的理由。',
            bg: 'bg-orange-50',
            borderColor: 'border-orange-100'
        },
        {
            icon: <Compass className="w-8 h-8 text-cyan-500" />,
            title: '无界探索成长',
            description: '拒绝单一枯燥。从兴趣出发，在自己喜欢的主题中自由漫游，在未知的领域里发现惊喜，拓宽认知边界。',
            bg: 'bg-cyan-50',
            borderColor: 'border-cyan-100'
        },
        {
            icon: <Lightbulb className="w-8 h-8 text-purple-500" />,
            title: '赋能思维进阶',
            description: '打破课堂边界。依托持续扩充的百科级资源库，在获取知识的同时，全面提升批判性思维与核心竞争力。',
            bg: 'bg-purple-50',
            borderColor: 'border-purple-100'
        }
    ];

    return (
        <section className="py-20 bg-slate-50 border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {items.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className={`p-4 rounded-xl ${item.bg} border ${item.borderColor} mb-6`}>
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                                {item.title}
                            </h3>
                            <p className="text-slate-500 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
