'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Building2,
    LogOut,
    Plus,
    Trash2,
    Edit3,
    Upload,
    FileText,
    Video,
    Eye,
    Heart,
    Clock,
    Compass,
    Package,
    Landmark,
    X,
    Check,
    Loader2,
    Download,
    ArrowLeft,
    File,
} from 'lucide-react'
import Link from 'next/link'
import { type Video as VideoType, type Document as DocumentType, type VideoCategory, CATEGORY_LABELS } from '@/lib/supabase'

const CATEGORY_OPTIONS: { value: VideoCategory; label: string; icon: React.ReactNode }[] = [
    { value: 'vastu_tips', label: 'Vastu Tips', icon: <Compass className="h-4 w-4" /> },
    { value: 'materials_info', label: 'Materials Info', icon: <Package className="h-4 w-4" /> },
    { value: 'govt_schemes', label: 'Govt Schemes', icon: <Landmark className="h-4 w-4" /> },
]

function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

export default function AdminPage() {
    const [authenticated, setAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [authError, setAuthError] = useState('')
    const [authLoading, setAuthLoading] = useState(false)
    const [adminPassword, setAdminPassword] = useState('')

    // Videos state
    const [videos, setVideos] = useState<VideoType[]>([])
    const [loading, setLoading] = useState(false)
    const [showVideoForm, setShowVideoForm] = useState(false)
    const [editingVideo, setEditingVideo] = useState<VideoType | null>(null)

    // Video form state
    const [formTitle, setFormTitle] = useState('')
    const [formDescription, setFormDescription] = useState('')
    const [formYoutubeUrl, setFormYoutubeUrl] = useState('')
    const [formThumbnailUrl, setFormThumbnailUrl] = useState('')
    const [formCategory, setFormCategory] = useState<VideoCategory>('vastu_tips')
    const [formDuration, setFormDuration] = useState('')
    const [formLikes, setFormLikes] = useState('')
    const [formViews, setFormViews] = useState('')
    const [formSaving, setFormSaving] = useState(false)

    // Documents state
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null)
    const [documents, setDocuments] = useState<DocumentType[]>([])
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Messages
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text })
        setTimeout(() => setMessage(null), 3000)
    }

    // Auth
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setAuthLoading(true)
        setAuthError('')

        try {
            const res = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            })

            if (res.ok) {
                setAuthenticated(true)
                setAdminPassword(password)
            } else {
                setAuthError('Invalid password')
            }
        } catch {
            setAuthError('Failed to authenticate')
        } finally {
            setAuthLoading(false)
        }
    }

    // Fetch videos
    const fetchVideos = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/videos', {
                headers: { 'x-admin-password': adminPassword },
            })
            if (res.ok) {
                const data = await res.json()
                setVideos(data)
            }
        } catch (err) {
            console.error('Error fetching videos:', err)
        } finally {
            setLoading(false)
        }
    }

    // Fetch documents for a video
    const fetchDocuments = async (videoId: string) => {
        try {
            const res = await fetch(`/api/admin/documents?video_id=${videoId}`, {
                headers: { 'x-admin-password': adminPassword },
            })
            if (res.ok) {
                const data = await res.json()
                setDocuments(data)
            }
        } catch (err) {
            console.error('Error fetching documents:', err)
        }
    }

    useEffect(() => {
        if (authenticated) fetchVideos()
    }, [authenticated])

    useEffect(() => {
        if (selectedVideoId) fetchDocuments(selectedVideoId)
    }, [selectedVideoId])

    // Video form handlers
    const openAddForm = () => {
        setEditingVideo(null)
        setFormTitle('')
        setFormDescription('')
        setFormYoutubeUrl('')
        setFormThumbnailUrl('')
        setFormCategory('vastu_tips')
        setFormDuration('')
        setFormLikes('')
        setFormViews('')
        setShowVideoForm(true)
    }

    const openEditForm = (video: VideoType) => {
        setEditingVideo(video)
        setFormTitle(video.title)
        setFormDescription(video.description || '')
        setFormYoutubeUrl(video.youtube_url)
        setFormThumbnailUrl(video.thumbnail_url || '')
        setFormCategory(video.category)
        setFormDuration(video.duration || '')
        setFormLikes(String(video.likes || 0))
        setFormViews(String(video.views || 0))
        setShowVideoForm(true)
    }

    const handleSaveVideo = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormSaving(true)

        const body = {
            id: editingVideo?.id,
            title: formTitle,
            description: formDescription,
            youtube_url: formYoutubeUrl,
            thumbnail_url: formThumbnailUrl,
            category: formCategory,
            duration: formDuration,
            likes: parseInt(formLikes) || 0,
            views: parseInt(formViews) || 0,
        }

        try {
            const res = await fetch('/api/admin/videos', {
                method: editingVideo ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-password': adminPassword,
                },
                body: JSON.stringify(body),
            })

            if (res.ok) {
                showMessage('success', editingVideo ? 'Video updated!' : 'Video created!')
                setShowVideoForm(false)
                fetchVideos()
            } else {
                const err = await res.json()
                showMessage('error', err.error || 'Failed to save')
            }
        } catch {
            showMessage('error', 'Failed to save video')
        } finally {
            setFormSaving(false)
        }
    }

    const handleDeleteVideo = async (id: string) => {
        if (!confirm('Delete this video and all its documents?')) return

        try {
            const res = await fetch(`/api/admin/videos?id=${id}`, {
                method: 'DELETE',
                headers: { 'x-admin-password': adminPassword },
            })

            if (res.ok) {
                showMessage('success', 'Video deleted!')
                fetchVideos()
                if (selectedVideoId === id) {
                    setSelectedVideoId(null)
                    setDocuments([])
                }
            } else {
                showMessage('error', 'Failed to delete video')
            }
        } catch {
            showMessage('error', 'Failed to delete video')
        }
    }

    // Document handlers
    const handleUploadDocument = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || !selectedVideoId) return

        setUploading(true)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('video_id', selectedVideoId)

        try {
            const res = await fetch('/api/admin/documents', {
                method: 'POST',
                headers: { 'x-admin-password': adminPassword },
                body: formData,
            })

            if (res.ok) {
                showMessage('success', 'Document uploaded!')
                fetchDocuments(selectedVideoId)
            } else {
                const err = await res.json()
                showMessage('error', err.error || 'Upload failed')
            }
        } catch {
            showMessage('error', 'Upload failed')
        } finally {
            setUploading(false)
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    const handleDeleteDocument = async (id: string) => {
        if (!confirm('Delete this document?')) return

        try {
            const res = await fetch(`/api/admin/documents?id=${id}`, {
                method: 'DELETE',
                headers: { 'x-admin-password': adminPassword },
            })

            if (res.ok) {
                showMessage('success', 'Document deleted!')
                if (selectedVideoId) fetchDocuments(selectedVideoId)
            } else {
                showMessage('error', 'Failed to delete document')
            }
        } catch {
            showMessage('error', 'Failed to delete document')
        }
    }

    // Login page
    if (!authenticated) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <div className="inline-flex bg-gradient-to-br from-primary-500 to-primary-700 p-3 rounded-2xl mb-4">
                            <Building2 className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-500 mt-1">Enter your password to continue</p>
                    </div>

                    <form onSubmit={handleLogin} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900"
                                    placeholder="Enter admin password"
                                    required
                                />
                            </div>

                            {authError && (
                                <p className="text-red-500 text-sm font-medium">{authError}</p>
                            )}

                            <button
                                type="submit"
                                disabled={authLoading}
                                className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {authLoading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-6">
                        <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                            ← Back to website
                        </Link>
                    </div>
                </motion.div>
            </main>
        )
    }

    const selectedVideo = videos.find(v => v.id === selectedVideoId)

    // Admin Dashboard
    return (
        <main className="min-h-screen bg-gray-50">
            {/* Top Bar */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-1.5 rounded-lg">
                                    <Building2 className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-sm font-bold text-gray-900">Builder Ballery</span>
                            </Link>
                            <span className="text-gray-300">|</span>
                            <span className="text-sm font-semibold text-gray-600">Admin</span>
                        </div>
                        <button
                            onClick={() => { setAuthenticated(false); setAdminPassword('') }}
                            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Toast Message */}
            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
                    >
                        <div className={`px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 font-medium text-sm ${message.type === 'success'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                            {message.type === 'success' ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                            {message.text}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Left Panel - Videos List */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Videos ({videos.length})</h2>
                            <button
                                onClick={openAddForm}
                                className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl font-medium text-sm hover:bg-primary-700 transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                                Add Video
                            </button>
                        </div>

                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                                        <div className="flex gap-4">
                                            <div className="w-32 h-20 bg-gray-200 rounded-xl" />
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                                                <div className="h-3 bg-gray-200 rounded w-1/2" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {videos.map((video) => (
                                    <motion.div
                                        key={video.id}
                                        layout
                                        className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer ${selectedVideoId === video.id
                                            ? 'border-primary-500 shadow-lg shadow-primary-100'
                                            : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
                                            }`}
                                        onClick={() => setSelectedVideoId(video.id)}
                                    >
                                        <div className="flex gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="min-w-0">
                                                        <h3 className="font-semibold text-gray-900 text-sm truncate">{video.title}</h3>
                                                        <div className="flex items-center gap-3 mt-1.5">
                                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                                                                {CATEGORY_OPTIONS.find(c => c.value === video.category)?.icon}
                                                                {CATEGORY_LABELS[video.category]}
                                                            </span>
                                                            {video.duration && (
                                                                <span className="flex items-center gap-1 text-xs text-gray-400">
                                                                    <Clock className="h-3 w-3" /> {video.duration}
                                                                </span>
                                                            )}
                                                            <span className="flex items-center gap-1 text-xs text-gray-400">
                                                                <Eye className="h-3 w-3" /> {(video.views || 0).toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1 flex-shrink-0">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); openEditForm(video) }}
                                                            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                        >
                                                            <Edit3 className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleDeleteVideo(video.id) }}
                                                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Panel - Documents */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden sticky top-24">
                            {selectedVideoId && selectedVideo ? (
                                <>
                                    {/* Selected Video Header */}
                                    <div className="bg-gradient-to-r from-primary-600 to-green-500 p-5">
                                        <h3 className="text-white font-bold text-sm mb-1">Documents for:</h3>
                                        <p className="text-white/90 text-sm line-clamp-2">{selectedVideo.title}</p>
                                    </div>

                                    {/* Upload Button */}
                                    <div className="p-4 border-b border-gray-100">
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            onChange={handleUploadDocument}
                                            className="hidden"
                                            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.jpg,.png"
                                        />
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={uploading}
                                            className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl font-medium text-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
                                        >
                                            {uploading ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    Uploading...
                                                </>
                                            ) : (
                                                <>
                                                    <Upload className="h-4 w-4" />
                                                    Upload Document
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {/* Documents List */}
                                    <div className="p-4 max-h-[500px] overflow-y-auto">
                                        {documents.length === 0 ? (
                                            <div className="text-center py-8">
                                                <FileText className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                                                <p className="text-gray-400 text-sm">No documents uploaded yet</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {documents.map((doc) => (
                                                    <div
                                                        key={doc.id}
                                                        className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100"
                                                    >
                                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                                            <div className="flex-shrink-0 bg-red-50 text-red-600 p-2 rounded-lg">
                                                                <File className="h-4 w-4" />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="text-sm font-medium text-gray-900 truncate">{doc.file_name}</p>
                                                                <div className="flex items-center gap-2 mt-0.5">
                                                                    <span className="text-xs font-bold text-gray-400 uppercase">{doc.file_type}</span>
                                                                    {doc.file_size > 0 && (
                                                                        <span className="text-xs text-gray-400">{formatFileSize(doc.file_size)}</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                                                            <a
                                                                href={doc.download_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                                                            >
                                                                <Download className="h-4 w-4" />
                                                            </a>
                                                            <button
                                                                onClick={() => handleDeleteDocument(doc.id)}
                                                                className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="p-8 text-center">
                                    <Video className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                    <h3 className="font-semibold text-gray-900 mb-1">Select a video</h3>
                                    <p className="text-gray-400 text-sm">Click on a video to manage its documents</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Form Modal */}
            <AnimatePresence>
                {showVideoForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowVideoForm(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="text-lg font-bold text-gray-900">
                                    {editingVideo ? 'Edit Video' : 'Add New Video'}
                                </h2>
                                <button
                                    onClick={() => setShowVideoForm(false)}
                                    className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            <form onSubmit={handleSaveVideo} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
                                    <input
                                        type="text"
                                        value={formTitle}
                                        onChange={(e) => setFormTitle(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm text-gray-900"
                                        placeholder="Video title"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                                    <textarea
                                        value={formDescription}
                                        onChange={(e) => setFormDescription(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm text-gray-900"
                                        rows={3}
                                        placeholder="Video description"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">YouTube URL *</label>
                                    <input
                                        type="url"
                                        value={formYoutubeUrl}
                                        onChange={(e) => setFormYoutubeUrl(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm text-gray-900"
                                        placeholder="https://www.youtube.com/embed/..."
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Thumbnail URL</label>
                                    <input
                                        type="url"
                                        value={formThumbnailUrl}
                                        onChange={(e) => setFormThumbnailUrl(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm text-gray-900"
                                        placeholder="https://..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
                                    <select
                                        value={formCategory}
                                        onChange={(e) => setFormCategory(e.target.value as VideoCategory)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm text-gray-900"
                                    >
                                        {CATEGORY_OPTIONS.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Duration</label>
                                        <input
                                            type="text"
                                            value={formDuration}
                                            onChange={(e) => setFormDuration(e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm text-gray-900"
                                            placeholder="5:30"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Likes</label>
                                        <input
                                            type="number"
                                            value={formLikes}
                                            onChange={(e) => setFormLikes(e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm text-gray-900"
                                            placeholder="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Views</label>
                                        <input
                                            type="number"
                                            value={formViews}
                                            onChange={(e) => setFormViews(e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm text-gray-900"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowVideoForm(false)}
                                        className="flex-1 py-2.5 rounded-xl border border-gray-200 font-medium text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={formSaving}
                                        className="flex-1 bg-primary-600 text-white py-2.5 rounded-xl font-medium text-sm hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {formSaving ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <>
                                                <Check className="h-4 w-4" />
                                                {editingVideo ? 'Update' : 'Create'}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    )
}
