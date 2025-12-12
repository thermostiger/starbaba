import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
    try {
        const { secret } = await request.json()

        // 安全密钥验证（防止随意创建管理员）
        if (secret !== process.env.ADMIN_INIT_SECRET) {
            return NextResponse.json({ error: '无效的初始化密钥' }, { status: 403 })
        }

        const payload = await getPayload({ config })

        // 检查是否已有管理员
        const existingAdmins = await payload.find({
            collection: 'users',
            where: {
                role: {
                    equals: 'admin',
                },
            },
        })

        if (existingAdmins.docs.length > 0) {
            return NextResponse.json({
                error: '管理员账号已存在',
                admin: existingAdmins.docs[0].email
            }, { status: 400 })
        }

        // 创建管理员账号
        const hashedPassword = await bcrypt.hash('admin123456', 10)

        const admin = await payload.create({
            collection: 'users',
            data: {
                email: 'admin@starbaba.com',
                password: hashedPassword,
                name: '系统管理员',
                role: 'admin',
                provider: 'email',
            },
        })

        return NextResponse.json({
            success: true,
            message: '管理员账号创建成功',
            credentials: {
                email: 'admin@starbaba.com',
                password: 'admin123456',
                note: '请立即登录并修改密码！'
            }
        })
    } catch (error) {
        console.error('Failed to create admin:', error)
        return NextResponse.json({
            error: '创建管理员失败：' + (error as Error).message
        }, { status: 500 })
    }
}
