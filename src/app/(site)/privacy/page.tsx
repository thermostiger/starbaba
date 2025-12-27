
import { Shield, Lock, Eye, Server, RefreshCw, Mail, Database } from 'lucide-react';

export const metadata = {
    title: '隐私政策 - K12书架',
    description: 'K12书架隐私保护政策与数据使用说明',
};

export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Hero */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-6 text-slate-900">
                    隐私政策
                </h1>
                <p className="text-xl text-slate-500">
                    最后更新日期：2025年12月28日
                </p>
                <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                    K12书架（以下简称"我们"）非常重视用户的隐私保护。本政策旨在向您说明我们在您使用我们的服务时如何收集、使用、存储和分享您的个人信息。
                </p>
            </div>

            {/* Main Content */}
            <div className="space-y-12">
                {/* Section 1: Information Collection */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800">
                        <Database className="w-8 h-8 text-blue-600" />
                        1. 我们收集的信息
                    </h2>
                    <div className="prose max-w-none text-slate-600 space-y-4">
                        <p className="leading-relaxed">
                            为了向您提供服务，我们需要收集以下类型的必要信息：
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <span className="font-medium text-slate-800">注册信息：</span>
                                当您注册账号时，我们需要收集您的手机号码或电子邮箱地址，用于账号唯一性标识及安全验证。
                            </li>
                            <li>
                                <span className="font-medium text-slate-800">交易信息：</span>
                                当您购买会员服务时，我们会记录您的订单号、交易金额和支付时间。
                                <span className="text-red-500 font-medium ml-1">重要提示：我们不直接收集或存储您的银行卡号或支付密码，所有支付均通过第三方支付平台（如微信支付、支付宝）进行。</span>
                            </li>
                            <li>
                                <span className="font-medium text-slate-800">日志信息：</span>
                                包括您的IP地址、浏览器类型、访问日期和时间等，用于保障系统安全及优化服务体验。
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Section 2: Information Usage */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800">
                        <Eye className="w-8 h-8 text-indigo-600" />
                        2. 我们如何使用信息
                    </h2>
                    <div className="prose max-w-none text-slate-600 space-y-4">
                        <p className="leading-relaxed">
                            我们收集的信息将仅用于以下用途：
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>为您提供注册、登录及资源浏览、下载服务；</li>
                            <li>处理您的订单并开通相应的会员权益；</li>
                            <li>向您发送服务通知（如会员到期提醒、安全验证码）；</li>
                            <li>保障账号安全，检测和防范欺诈活动；</li>
                        </ul>
                        <p className="font-medium text-amber-600 bg-amber-50 p-4 rounded-lg">
                            我们要向您郑重承诺：我们绝对不会向任何第三方出售您的个人信息。
                        </p>
                    </div>
                </div>

                {/* Section 3: Information Protection */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800">
                        <Lock className="w-8 h-8 text-green-600" />
                        3. 信息安全保护
                    </h2>
                    <div className="prose max-w-none text-slate-600 space-y-4">
                        <p className="leading-relaxed">
                            我们采取多重安全措施来保护您的信息安全：
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <span className="font-medium text-slate-800">数据加密：</span>
                                您的用户密码均经过高强度哈希加密存储，即使是系统管理员也无法查看您的明文密码。
                            </li>
                            <li>
                                <span className="font-medium text-slate-800">传输加密：</span>
                                全站采用 HTTPS 协议，确保您的数据在传输过程中不被窃听或篡改。
                            </li>
                            <li>
                                <span className="font-medium text-slate-800">访问控制：</span>
                                我们严格限制访问用户信息的人员范围，并进行审计监控。
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Section 4: Third Party Services */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800">
                        <Server className="w-8 h-8 text-slate-600" />
                        4. 第三方服务与数据共享
                    </h2>
                    <div className="prose max-w-none text-slate-600 space-y-4">
                        <p className="leading-relaxed">
                            仅在以下必要情况下，我们会与第三方共享您的部分信息：
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <span className="font-medium text-slate-800">支付服务：</span>
                                为了完成订单支付，我们需要将您的订单号和金额提供给支付服务商（如微信支付、支付宝）。
                            </li>
                            <li>
                                <span className="font-medium text-slate-800">法律合规：</span>
                                如遇法律法规要求或政府部门的强制性命令，我们可能需要披露您的信息。
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Section 5: User Rights */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800">
                        <RefreshCw className="w-8 h-8 text-cyan-600" />
                        5. 您的权利
                    </h2>
                    <div className="prose max-w-none text-slate-600 space-y-4">
                        <p className="leading-relaxed">
                            根据相关法律法规，您拥有以下权利：
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <span className="font-medium text-slate-800">查询与更正：</span>
                                您可以随时登录账号查询或修改您的个人资料。
                            </li>
                            <li>
                                <span className="font-medium text-slate-800">账号注销：</span>
                                如果您不再使用我们的服务，可以联系我们申请注销账号。注销后，我们将删除或匿名化处理您的个人信息。
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Contact */}
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                    <h2 className="text-xl font-bold mb-4 text-slate-800">隐私问题联系方式</h2>
                    <p className="text-slate-600 mb-6">
                        如果您对本隐私政策有任何疑问，或需要投诉/举报，请通过以下方式联系我们：
                    </p>
                    <div className="flex items-center gap-3 text-slate-700 bg-white inline-flex px-6 py-3 rounded-xl border border-slate-200">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">邮箱：k12shelf@outlook.com</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
