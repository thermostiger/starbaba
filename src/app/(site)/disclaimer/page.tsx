
import { Shield, AlertTriangle, Scale, Mail, FileText, Link as LinkIcon, Lock, DollarSign } from 'lucide-react';

export const metadata = {
    title: '免责声明 - K12书架',
    description: 'K12书架免责声明与版权公告',
};

export default function DisclaimerPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Hero */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-6 text-slate-900">
                    免责声明与版权公告
                </h1>
                <p className="text-xl text-slate-500">
                    请仔细阅读本站资源使用说明与相关法律声明
                </p>
            </div>

            {/* Main Content */}
            <div className="space-y-12">
                {/* Section 1: Resource Source */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800">
                        <Shield className="w-8 h-8 text-blue-600" />
                        1. 资源来源与属性
                    </h2>
                    <div className="prose max-w-none text-slate-600 space-y-4">
                        <p className="leading-relaxed">
                            本站（K12Shelf）所有资源（包括但不限于电子书、音频、视频等）均收集于互联网。
                            本站仅提供一个整理、索引服务的平台，不拥有任何资源的版权，不存储任何资源。
                            所有资源的版权归原作者、出版社或发行公司所有。
                        </p>
                    </div>
                </div>

                {/* Section 2: Usage Rules */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800">
                        <Scale className="w-8 h-8 text-indigo-600" />
                        2. 使用限制与“24小时原则”
                    </h2>
                    <div className="prose max-w-none text-slate-600 space-y-4">
                        <p className="leading-relaxed">
                            本站提供的所有资源仅供个人学习、研究、交流或试读之用，严禁用于任何商业用途
                            （包括但不限于转卖、非法贩卖、或是直接用于商业教学收费项目）。
                        </p>
                        <p className="leading-relaxed font-medium text-amber-600 bg-amber-50 p-4 rounded-lg inline-block w-full">
                            用户应在下载后的 24小时内 自行删除。
                        </p>
                        <p className="leading-relaxed">
                            如果您喜欢该资源，请务必购买正版，以支持原作者和出版业的良性发展。
                            因未及时删除或非法使用产生的一切法律纠纷，概与本站无关。
                        </p>
                    </div>
                </div>

                {/* Section 3: Fees */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800">
                        <DollarSign className="w-8 h-8 text-green-600" />
                        3. 关于费用的特别说明
                    </h2>
                    <div className="prose max-w-none text-slate-600 space-y-4">
                        <p className="leading-relaxed">
                            本站收取的“会员费”、“赞助费”或“积分”，仅用于维持本站的服务器租赁、带宽成本、
                            人工整理筛选精力及日常运营开支，并非是对资源版权的售卖。
                            用户支付的费用不等同于购买了资源的所有权或使用权。
                        </p>
                    </div>
                </div>

                {/* Section 4: Copyright Infringement */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800">
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                        4. 侵权删除
                    </h2>
                    <div className="prose max-w-none text-slate-600 space-y-4">
                        <p className="leading-relaxed">
                            本站高度重视知识产权保护，并遵守“避风港原则”。
                            由于本站资源多由爬虫抓取或用户上传，无法对所有内容进行实时版权核实。
                            如果您是相关资源的版权所有者，且认为本站的内容侵犯了您的合法权益，
                            请立即联系我们删除网盘链接，但由于本站仅提供索引整理服务，无法删除网盘资源，请联系网盘用户或管理员。
                        </p>
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-4">
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-blue-600" />
                                    <span>联系邮箱：<a href="mailto:k12shelf@outlook.com" className="text-blue-600 font-medium hover:underline">k12shelf@outlook.com</a></span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FileText className="w-5 h-5 text-slate-500 mt-0.5" />
                                    <span>处理时效：我们将在收到有效的版权证明文件（如版权登记证书、授权书等）后的 24-48 小时内移除相关链接。</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Section 5: Security */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800">
                        <Lock className="w-8 h-8 text-slate-600" />
                        5. 资源安全性与免责
                    </h2>
                    <div className="prose max-w-none text-slate-600 space-y-4">
                        <p className="leading-relaxed">
                            尽管本站会对资源进行人工筛选和杀毒扫描，但受限于技术手段，
                            无法保证所有资源绝对无毒或无缺陷。
                            用户下载、安装或使用本站资源所可能导致的任何系统损坏、数据丢失或其他意外损失，
                            本站不承担任何法律责任。用户需自行承担下载和使用的风险。
                        </p>
                    </div>
                </div>

                {/* Section 6: Third Party Links */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800">
                        <LinkIcon className="w-8 h-8 text-cyan-600" />
                        6. 第三方链接
                    </h2>
                    <div className="prose max-w-none text-slate-600 space-y-4">
                        <p className="leading-relaxed">
                            本站可能包含指向第三方网站（如网盘服务商）的链接。
                            这些链接仅为方便用户而提供，本站无法控制第三方网站的内容，
                            也不对其内容或安全性负责。
                        </p>
                    </div>
                </div>

                {/* Section 7: Final Interpretation */}
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                    <h2 className="text-xl font-bold mb-4 text-slate-800">7. 最终解释权</h2>
                    <p className="text-slate-600 leading-relaxed">
                        在法律允许的范围内，K12Shelf 保留对本声明的最终解释权和随时修改的权利。
                        用户继续使用本站服务，即视为已阅读并同意受本声明约束。
                    </p>
                </div>
            </div>
        </div>
    );
}
