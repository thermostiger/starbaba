import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export async function requireAdmin() {
    const session = await auth()

    if (!session?.user) {
        redirect('/admin/login')
    }

    // @ts-ignore
    if (session.user.role !== 'admin') {
        redirect('/')
    }

    return session
}

export async function checkAdmin() {
    const session = await auth()
    // @ts-ignore
    return session?.user?.role === 'admin'
}
