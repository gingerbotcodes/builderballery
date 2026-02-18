import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getAdminClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    return createClient(supabaseUrl, supabaseServiceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
    })
}

function checkAuth(request: Request): boolean {
    const authHeader = request.headers.get('x-admin-password')
    return authHeader === process.env.ADMIN_PASSWORD
}

// GET - List all videos
export async function GET(request: Request) {
    if (!checkAuth(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = getAdminClient()
    const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
}

// POST - Create a new video
export async function POST(request: Request) {
    if (!checkAuth(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = getAdminClient()
    const body = await request.json()

    const { data, error } = await supabase
        .from('videos')
        .insert([{
            title: body.title,
            description: body.description || null,
            youtube_url: body.youtube_url,
            thumbnail_url: body.thumbnail_url || null,
            category: body.category,
            likes: body.likes || 0,
            views: body.views || 0,
            duration: body.duration || null,
        }])
        .select()
        .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
}

// PUT - Update a video
export async function PUT(request: Request) {
    if (!checkAuth(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = getAdminClient()
    const body = await request.json()

    const { data, error } = await supabase
        .from('videos')
        .update({
            title: body.title,
            description: body.description || null,
            youtube_url: body.youtube_url,
            thumbnail_url: body.thumbnail_url || null,
            category: body.category,
            likes: body.likes || 0,
            views: body.views || 0,
            duration: body.duration || null,
        })
        .eq('id', body.id)
        .select()
        .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
}

// DELETE - Delete a video
export async function DELETE(request: Request) {
    if (!checkAuth(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = getAdminClient()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
}
