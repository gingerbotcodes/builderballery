import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// POST — submit a contact form (public)
export async function POST(request: Request) {
    try {
        const { name, phone, message } = await request.json()

        if (!name || !phone) {
            return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 })
        }

        const { error } = await supabaseAdmin
            .from('contacts')
            .insert({ name, phone, message: message || null })

        if (error) throw error

        return NextResponse.json({ success: true })
    } catch (err: any) {
        return NextResponse.json({ error: err.message || 'Failed to submit' }, { status: 500 })
    }
}

// GET — fetch contacts (admin only)
export async function GET(request: Request) {
    const pw = request.headers.get('x-admin-password')
    if (pw !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabaseAdmin
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}

// PATCH — mark contact as read (admin only)
export async function PATCH(request: Request) {
    const pw = request.headers.get('x-admin-password')
    if (pw !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id, read } = await request.json()

    const { error } = await supabaseAdmin
        .from('contacts')
        .update({ read })
        .eq('id', id)

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
}

// DELETE — delete a contact (admin only)
export async function DELETE(request: Request) {
    const pw = request.headers.get('x-admin-password')
    if (pw !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
        return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
        .from('contacts')
        .delete()
        .eq('id', id)

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
}
