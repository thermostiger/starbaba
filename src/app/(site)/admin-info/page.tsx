import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AdminInfoPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl">Payload CMS 管理后台</CardTitle>
                        <CardDescription>
                            由于 Payload CMS 3.0 beta 与 Next.js 16 存在兼容性问题，管理后台暂时无法使用可视化界面
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <h3 className="font-semibold text-yellow-800 mb-2">⚠️ 兼容性问题</h3>
                            <p className="text-sm text-yellow-700">
                                Payload CMS 3.0 beta 版本与 Next.js 16 的服务器组件存在冲突。
                                建议使用 Payload REST API 或等待 Payload 3.0 正式版发布。
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3">✅ 已完成的功能</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Payload CMS 核心配置（Supabase + AWS S3）</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>6个数据集合：Resources, Documentaries, Users, Orders, MembershipPlans, Media</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>注册/登录系统（邮箱密码 + Google OAuth）</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>微信支付 + 支付宝沙箱测试</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>CMS API 集成（替换所有 mock 数据）</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>自动权限授予系统</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3">🔧 可用的管理方式</h3>
                            <div className="space-y-3">
                                <div className="border rounded-lg p-4">
                                    <h4 className="font-medium mb-2">1. REST API</h4>
                                    <p className="text-sm text-gray-600 mb-2">
                                        使用 Payload REST API 进行数据管理
                                    </p>
                                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                        POST http://localhost:3000/api/resources
                                    </code>
                                </div>

                                <div className="border rounded-lg p-4">
                                    <h4 className="font-medium mb-2">2. GraphQL API</h4>
                                    <p className="text-sm text-gray-600 mb-2">
                                        使用 GraphQL 查询和修改数据
                                    </p>
                                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                        POST http://localhost:3000/api/graphql
                                    </code>
                                </div>

                                <div className="border rounded-lg p-4">
                                    <h4 className="font-medium mb-2">3. 直接数据库操作</h4>
                                    <p className="text-sm text-gray-600">
                                        通过 Supabase Dashboard 直接管理数据库
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3">📚 API 文档</h3>
                            <div className="space-y-2">
                                <a
                                    href="https://payloadcms.com/docs/rest-api/overview"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-sm text-blue-600 hover:text-blue-800"
                                >
                                    → Payload REST API 文档
                                </a>
                                <a
                                    href="https://payloadcms.com/docs/graphql/overview"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-sm text-blue-600 hover:text-blue-800"
                                >
                                    → Payload GraphQL API 文档
                                </a>
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <Link href="/">
                                <Button variant="outline" className="w-full">
                                    返回首页
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>解决方案建议</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <p>
                            <strong>短期方案：</strong>使用 Payload REST API 或 GraphQL API 进行数据管理，
                            或通过 Supabase Dashboard 直接操作数据库。
                        </p>
                        <p>
                            <strong>长期方案：</strong>
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>等待 Payload CMS 3.0 正式版发布（预计会修复 Next.js 16 兼容性）</li>
                            <li>降级到 Next.js 15（Payload 3.0 beta 官方支持的版本）</li>
                            <li>使用独立的 Payload 管理后台（单独部署）</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
