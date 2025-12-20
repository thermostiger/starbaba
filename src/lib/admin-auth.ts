import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export async function requireAdmin() {
    const session = await auth()

    if (!session?.user) {
        redirect('/admin/login')
    }

    // @ts-expect-error - user role is added via custom session callback
    if (session.user.role !== 'admin') {
        redirect('/')
    }

    return session
}

export async function checkAdmin() {
    const session = await auth()
    // @ts-expect-error - user role is added via custom session callback
    return session?.user?.role === 'admin'
}
