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

// GET - List documents for a video
export async function GET(request: Request) {
    if (!checkAuth(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = getAdminClient()
    const { searchParams } = new URL(request.url)
    const videoId = searchParams.get('video_id')

    let query = supabase.from('documents').select('*').order('created_at', { ascending: false })
    if (videoId) query = query.eq('video_id', videoId)

    const { data, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
}

// POST - Upload a document
export async function POST(request: Request) {
    if (!checkAuth(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = getAdminClient()

    try {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const videoId = formData.get('video_id') as string

        if (!file || !videoId) {
            return NextResponse.json({ error: 'Missing file or video_id' }, { status: 400 })
        }

        // Get file extension
        const fileName = file.name
        const fileExt = fileName.split('.').pop()?.toUpperCase() || 'FILE'
        const fileSize = file.size

        // Upload to Supabase Storage
        const storagePath = `${videoId}/${Date.now()}_${fileName}`
        const buffer = Buffer.from(await file.arrayBuffer())

        const { error: uploadError } = await supabase.storage
            .from('documents')
            .upload(storagePath, buffer, {
                contentType: file.type,
                upsert: false,
            })

        if (uploadError) {
            return NextResponse.json({ error: `Upload failed: ${uploadError.message}` }, { status: 500 })
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from('documents')
            .getPublicUrl(storagePath)

        // Create database record
        const { data, error: dbError } = await supabase
            .from('documents')
            .insert([{
                video_id: videoId,
                file_name: fileName,
                file_type: fileExt,
                file_size: fileSize,
                storage_path: storagePath,
                download_url: urlData.publicUrl,
            }])
            .select()
            .single()

        if (dbError) {
            return NextResponse.json({ error: dbError.message }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (err: any) {
        return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 500 })
    }
}

// DELETE - Delete a document
export async function DELETE(request: Request) {
    if (!checkAuth(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = getAdminClient()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    // Get the document to find storage path
    const { data: doc, error: fetchError } = await supabase
        .from('documents')
        .select('storage_path')
        .eq('id', id)
        .single()

    if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 })

    // Delete from storage
    if (doc?.storage_path) {
        await supabase.storage.from('documents').remove([doc.storage_path])
    }

    // Delete from database
    const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
}
