import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { getPayload } from 'payload';
import config from '@payload-config';

export async function POST(request: NextRequest) {
    try {
        const { email, password, name } = await request.json();

        // Validate input
        if (!email || !password || !name) {
            return NextResponse.json(
                { error: '请填写所有必填字段' },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: '密码至少需要8个字符' },
                { status: 400 }
            );
        }

        const payload = await getPayload({ config });

        // Check if user already exists
        const existingUsers = await payload.find({
            collection: 'users',
            where: {
                email: {
                    equals: email,
                },
            },
        });

        if (existingUsers.docs.length > 0) {
            return NextResponse.json(
                { error: '该邮箱已被注册' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await payload.create({
            collection: 'users',
            data: {
                email,
                password: hashedPassword,
                name,
                role: 'user',
                provider: 'email',
            },
        });

        return NextResponse.json(
            {
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: '注册失败，请稍后重试' },
            { status: 500 }
        );
    }
}
