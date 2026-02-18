'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
    ArrowLeft,
    Heart,
    Eye,
    Clock,
    Download,
    FileText,
    File,
    Video,
    Building2,
    Instagram,
    Share2,
    Compass,
    Package,
    Landmark,
    ExternalLink,
    ChevronRight,
    MapPin,
    Sparkles,
    ArrowRight,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { supabase, type Video as VideoType, type Document as DocumentType, type VideoCategory, CATEGORY_LABELS } from '@/lib/supabase'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const CATEGORY_ICONS: Record<VideoCategory, React.ReactNode> = {
    vastu_tips: <Compass className="h-4 w-4" />,
    materials_info: <Package className="h-4 w-4" />,
    govt_schemes: <Landmark className="h-4 w-4" />,
}

const CATEGORY_COLORS: Record<VideoCategory, { bg: string; text: string; border: string }> = {
    vastu_tips: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    materials_info: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    govt_schemes: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
}

function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

function getFileIcon(fileType: string) {
    const type = fileType.toLowerCase()
    if (type === 'pdf') return <FileText className="h-8 w-8" />
    return <File className="h-8 w-8" />
}

function getFileTypeColor(fileType: string) {
    const type = fileType.toLowerCase()
    if (type === 'pdf') return 'bg-red-50 text-red-600 border-red-200'
    if (type === 'doc' || type === 'docx') return 'bg-blue-50 text-blue-600 border-blue-200'
    if (type === 'xls' || type === 'xlsx') return 'bg-green-50 text-green-600 border-green-200'
    return 'bg-gray-50 text-gray-600 border-gray-200'
}

// --- INSTAGRAM EMBED ---
const InstagramEmbed = ({ url }: { url: string }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Load Instagram embed script
        const existing = document.querySelector('script[src*="instagram.com/embed.js"]')
        if (existing) {
            // Re-process embeds if script already loaded
            (window as any).instgrm?.Embeds?.process()
            return
        }
        const script = document.createElement('script')
        script.src = '//www.instagram.com/embed.js'
        script.async = true
        script.onload = () => {
            (window as any).instgrm?.Embeds?.process()
        }
        document.body.appendChild(script)
    }, [url])

    const embedHtml = `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="${url}?utm_source=ig_embed" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:12px; margin:0; padding:0; width:100%; max-width:540px; min-width:326px;"><div style="padding:16px;"><a href="${url}" target="_blank" style="color:#000; text-decoration:none;">View this post on Instagram</a></div></blockquote>`

    return (
        <div
            ref={containerRef}
            className="w-full max-w-[540px] overflow-hidden rounded-2xl mx-auto"
            dangerouslySetInnerHTML={{ __html: embedHtml }}
        />
    )
}

export default function VideoDetailPage({ params }: { params: { id: string } }) {
    const [video, setVideo] = useState<VideoType | null>(null)
    const [documents, setDocuments] = useState<DocumentType[]>([])
    const [relatedVideos, setRelatedVideos] = useState<VideoType[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch video
                const { data: videoData, error: videoError } = await supabase
                    .from('videos')
                    .select('*')
                    .eq('id', params.id)
                    .single()

                if (videoError) throw videoError
                setVideo(videoData)

                // Fetch documents for this video
                const { data: docsData, error: docsError } = await supabase
                    .from('documents')
                    .select('*')
                    .eq('video_id', params.id)
                    .order('created_at', { ascending: false })

                if (!docsError) setDocuments(docsData || [])

                // Fetch related videos (same category, exclude current)
                if (videoData) {
                    const { data: relatedData } = await supabase
                        .from('videos')
                        .select('*')
                        .eq('category', videoData.category)
                        .neq('id', params.id)
                        .limit(3)

                    setRelatedVideos(relatedData || [])
                }
            } catch (err) {
                console.error('Error fetching video:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [params.id])

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50">
                {/* Navbar */}
                <nav className="bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <Link href="/" className="flex items-center gap-3">
                                <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-2 rounded-xl">
                                    <Building2 className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-lg font-bold text-gray-900">Builder <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Ballery</span></span>
                            </Link>
                        </div>
                    </div>
                </nav>
                <div className="max-w-5xl mx-auto px-4 py-12">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-gray-200 rounded w-1/3" />
                        <div className="aspect-video bg-gray-200 rounded-3xl" />
                        <div className="h-6 bg-gray-200 rounded w-2/3" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                    </div>
                </div>
            </main>
        )
    }

    if (!video) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Video not found</h1>
                    <Link href="/" className="text-primary-600 font-medium hover:underline flex items-center justify-center gap-2">
                        <ArrowLeft className="h-4 w-4" /> Back to Home
                    </Link>
                </div>
            </main>
        )
    }

    // Extract YouTube video ID for embed
    const getYouTubeEmbedUrl = (url: string) => {
        if (url.includes('/embed/')) return url
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
        return match ? `https://www.youtube.com/embed/${match[1]}` : url
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-2 rounded-xl">
                                <Building2 className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-lg font-bold text-gray-900">Builder <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Ballery</span></span>
                        </Link>
                        <a
                            href="https://instagram.com/builderballery"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl font-medium text-sm hover:bg-gray-800 transition-colors"
                        >
                            <Instagram className="h-4 w-4" />
                            Follow
                        </a>
                    </div>
                </div>
            </nav>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-6"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium transition-colors group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Library
                    </Link>
                </motion.div>

                {/* Video Player */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    {video.youtube_url.includes('instagram.com') ? (
                        <div className="flex justify-center bg-zinc-900 rounded-3xl p-4 sm:p-8">
                            <InstagramEmbed url={video.youtube_url} />
                        </div>
                    ) : (
                        <div className="relative aspect-video rounded-3xl overflow-hidden bg-gray-900 shadow-2xl border border-gray-200">
                            <iframe
                                src={getYouTubeEmbedUrl(video.youtube_url)}
                                title={video.title}
                                className="absolute inset-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    )}
                </motion.div>

                {/* Video Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8"
                >
                    {/* Category Badge */}
                    <div className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border mb-4",
                        CATEGORY_COLORS[video.category].bg,
                        CATEGORY_COLORS[video.category].text,
                        CATEGORY_COLORS[video.category].border,
                    )}>
                        {CATEGORY_ICONS[video.category]}
                        <span className="text-sm font-semibold">{CATEGORY_LABELS[video.category]}</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                        {video.title}
                    </h1>

                    {video.description && (
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            {video.description}
                        </p>
                    )}

                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-6 text-gray-500">
                        {video.views && (
                            <span className="flex items-center gap-1.5">
                                <Eye className="h-5 w-5" />
                                <span className="font-medium">{video.views.toLocaleString()} views</span>
                            </span>
                        )}
                        {video.likes && (
                            <span className="flex items-center gap-1.5">
                                <Heart className="h-5 w-5" />
                                <span className="font-medium">{video.likes.toLocaleString()} likes</span>
                            </span>
                        )}
                        {video.duration && (
                            <span className="flex items-center gap-1.5">
                                <Clock className="h-5 w-5" />
                                <span className="font-medium">{video.duration}</span>
                            </span>
                        )}
                    </div>
                </motion.div>

                {/* ============= RESOURCES & DOWNLOADS SECTION ============= */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary-600 to-green-500 p-6 sm:p-8">
                        <div className="flex items-center gap-3 text-white">
                            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                                <Download className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold">Resources & Downloads</h2>
                                <p className="text-white/80 text-sm mt-1">
                                    Free downloadable documents, circulars, and reference materials
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Documents List */}
                    <div className="p-6 sm:p-8">
                        {documents.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 mb-4">
                                    <FileText className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents yet</h3>
                                <p className="text-gray-500 max-w-sm mx-auto">
                                    Documents and reference materials for this video will be uploaded soon. Check back later!
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {documents.map((doc, index) => (
                                    <motion.div
                                        key={doc.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-lg hover:border-gray-200 transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-4 min-w-0 flex-1">
                                            {/* File Icon */}
                                            <div className={cn(
                                                "flex-shrink-0 p-3 rounded-xl border",
                                                getFileTypeColor(doc.file_type)
                                            )}>
                                                {getFileIcon(doc.file_type)}
                                            </div>

                                            {/* File Info */}
                                            <div className="min-w-0 flex-1">
                                                <h4 className="font-semibold text-gray-900 truncate text-sm sm:text-base">
                                                    {doc.file_name}
                                                </h4>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className={cn(
                                                        "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold uppercase",
                                                        getFileTypeColor(doc.file_type)
                                                    )}>
                                                        {doc.file_type}
                                                    </span>
                                                    {doc.file_size > 0 && (
                                                        <span className="text-xs text-gray-400">
                                                            {formatFileSize(doc.file_size)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Download Button */}
                                        <motion.a
                                            href={doc.download_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download
                                            className="flex-shrink-0 ml-4 flex items-center gap-2 bg-primary-600 text-white px-4 sm:px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/20 transition-all duration-300"
                                            whileHover={{ scale: 1.02, y: -1 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Download className="h-4 w-4" />
                                            <span className="hidden sm:inline">Download</span>
                                        </motion.a>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Related Videos */}
                {relatedVideos.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-12"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">More in {CATEGORY_LABELS[video.category]}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedVideos.map((related) => (
                                <Link key={related.id} href={`/video/${related.id}`}>
                                    <motion.article
                                        whileHover={{ y: -4 }}
                                        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                                    >
                                        <div className="relative aspect-video overflow-hidden">
                                            <Image
                                                src={related.thumbnail_url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop'}
                                                alt={related.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            {related.duration && (
                                                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
                                                    <span className="text-white text-xs font-medium">{related.duration}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm group-hover:text-primary-600 transition-colors">
                                                {related.title}
                                            </h3>
                                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Eye className="h-3.5 w-3.5" />
                                                    {(related.views || 0).toLocaleString()}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Heart className="h-3.5 w-3.5" />
                                                    {(related.likes || 0).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.article>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Simple Footer */}
            <footer className="bg-gray-950 text-gray-400 py-8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-1.5 rounded-lg">
                            <Building2 className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm font-bold text-white">Builder Ballery</span>
                    </Link>
                    <p className="text-xs text-gray-500">© 2024 Builder Ballery. All rights reserved.</p>
                </div>
            </footer>
        </main>
    )
}
