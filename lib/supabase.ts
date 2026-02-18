import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _supabase: SupabaseClient | null = null

function getSupabase() {
    if (!_supabase) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        if (!supabaseUrl || !supabaseAnonKey) {
            throw new Error('Missing Supabase environment variables')
        }
        _supabase = createClient(supabaseUrl, supabaseAnonKey)
    }
    return _supabase
}

// Lazy getter via Proxy for backward-compatible usage
export const supabase = new Proxy({} as SupabaseClient, {
    get(_target, prop) {
        return (getSupabase() as any)[prop]
    },
})

// Types
export interface Video {
    id: string
    title: string
    description: string | null
    youtube_url: string
    thumbnail_url: string | null
    category: 'vastu_tips' | 'materials_info' | 'govt_schemes'
    likes: number
    views: number
    duration: string | null
    created_at: string
}

export interface Document {
    id: string
    video_id: string
    file_name: string
    file_type: string
    file_size: number
    storage_path: string
    download_url: string
    created_at: string
}

export type VideoCategory = 'vastu_tips' | 'materials_info' | 'govt_schemes'

export const CATEGORY_LABELS: Record<VideoCategory, string> = {
    vastu_tips: 'Vastu Tips',
    materials_info: 'Materials Info',
    govt_schemes: 'Government Schemes',
}
