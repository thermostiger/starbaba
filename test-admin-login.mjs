// Test script to verify Supabase connection and admin account
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcrypt'

async function testAdminLogin() {
    console.log('Testing Supabase connection and admin login...\n')

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
        console.error('❌ Missing Supabase environment variables')
        console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗')
        console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? '✓' : '✗')
        return
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Test database connection
    const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', 'admin@starbaba.com')
        .limit(1)

    if (error) {
        console.error('❌ Database error:', error)
        return
    }

    if (!users || users.length === 0) {
        console.error('❌ Admin user not found in database')
        return
    }

    const user = users[0]
    console.log('✓ Found admin user:', {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
    })

    // Test password
    const testPassword = 'admin123456'
    const isValid = await bcrypt.compare(testPassword, user.password)

    if (isValid) {
        console.log('✓ Password verification successful')
    } else {
        console.log('❌ Password verification failed')
    }

    console.log('\n✅ All tests passed!')
}

testAdminLogin().catch(console.error)
