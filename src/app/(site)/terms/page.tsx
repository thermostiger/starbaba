
import { ScrollText, Users, CreditCard, ShieldCheck } from 'lucide-react';

export const metadata = {
    title: '用户协议 - K12书架',
    description: 'K12书架用户服务协议',
};

export default function AgreementPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Hero */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-6 text-slate-900">
                    用户协议
                </h1>
                <p className="text-xl text-slate-500">
                    欢迎使用 K12书架（K12Shelf）服务，请您在使用前仔细阅读本协议
                </p>
            </div>

            {/* Main Content - Placeholder structure until specific content is provided */}
            <div className="space-y-12">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800">
                        <ScrollText className="w-8 h-8 text-blue-600" />
                        1. 协议的确认与接纳
                    </h2>
                    <div className="prose max-w-none text-slate-600 space-y-4">
                        <p className="leading-relaxed">
                            本协议是您与 K12Shelf 之间关于您使用本站服务所订立的协议。
                            您在使用本站服务前，应当仔细阅读并充分理解本协议内容。
                            如您不同意本协议的任何条款，您应立即停止使用本站服务。
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800">
                        <Users className="w-8 h-8 text-indigo-600" />
                        2. 用户账号
                    </h2>
                    <div className="prose max-w-none text-slate-600 space-y-4">
                        <p className="leading-relaxed">
                            您需要注册账号才能使用本站的部分服务。您应确保注册信息的真实性、准确性和完整性。
                            您有责任保管好您的账号和密码，并对使用该账号进行的一切活动承担责任。
                        </p>
                        <p className="leading-relaxed font-bold text-red-500">
                            禁止账号共享，违者封号不退款。
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800">
                        <CreditCard className="w-8 h-8 text-green-600" />
                        3. 服务内容与会员
                    </h2>
                    <div className="prose max-w-none text-slate-600 space-y-4">
                        <p className="leading-relaxed">
                            本站提供分级的英语学习资源索引。部分服务可能需付费购买会员资格。
                            会员费用主要用于平台运营维护。
                        </p>
                        <p className="leading-relaxed font-bold text-amber-600">
                            虚拟资源，一旦发货（下载）概不退款。
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800">
                        <ShieldCheck className="w-8 h-8 text-amber-500" />
                        4. 用户行为规范
                    </h2>
                    <div className="prose max-w-none text-slate-600 space-y-4">
                        <p className="leading-relaxed">
                            用户不得利用本站进行任何违法违规活动，不得侵犯他人合法权益。
                            对于违反协议的用户，本站有权采取封禁账号等措施。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
