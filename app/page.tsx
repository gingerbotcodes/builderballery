'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Instagram,
    Video,
    Grid3X3,
    Search,
    Star,
    Award,
    ArrowUpRight,
    Menu,
    X,
    ChevronRight,
    PlayCircle,
    Layers,
    Users,
    Clock,
    Heart,
    MessageCircle,
    Eye,
    Share2,
    Bookmark,
    Sparkles,
    Building2,
    HardHat,
    ArrowRight,
    ExternalLink,
    MapPin,
    Calendar,
    TrendingUp
} from 'lucide-react'
import Image from 'next/image'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility for class merging
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// --- Types ---
interface MediaItem {
    id: string
    type: 'image' | 'video' | 'reel'
    url: string
    thumbnail?: string
    caption?: string
    likes?: number
    comments?: number
    views?: number
    duration?: string
    timestamp?: string
    isReel?: boolean
}

interface Stat {
    value: string
    label: string
    icon: React.ReactNode
    trend?: string
}

// --- Mock Data for Initial Render ---
const INITIAL_INSTAGRAM_DATA: MediaItem[] = [
    {
        id: '1',
        type: 'reel',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop',
        caption: 'Concrete pouring techniques for large slabs - Watch the full process!',
        likes: 12400,
        views: 150000,
        duration: '0:58',
        isReel: true,
        timestamp: '2 hours ago'
    },
    {
        id: '2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2070&auto=format&fit=crop',
        caption: 'Structural steel installation complete! 47 floors of pure engineering excellence.',
        likes: 8500,
        comments: 450,
        timestamp: '1 day ago'
    },
    {
        id: '3',
        type: 'reel',
        url: 'https://www.youtube.com/embed/04GiqLjRO3A',
        thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop',
        caption: 'Foundation construction time-lapse - 6 months in 60 seconds',
        likes: 21000,
        views: 250000,
        duration: '1:00',
        isReel: true,
        timestamp: '3 days ago'
    },
    {
        id: '4',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2070&auto=format&fit=crop',
        caption: 'High-rise building under construction. The view from the top is breathtaking!',
        likes: 6800,
        comments: 320,
        timestamp: '5 days ago'
    },
    {
        id: '5',
        type: 'reel',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop',
        caption: 'Heavy machinery operations - The power of modern construction',
        likes: 15600,
        views: 180000,
        duration: '0:45',
        isReel: true,
        timestamp: '1 week ago'
    },
    {
        id: '6',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1518448976907-7d7d76498e35?q=80&w=2070&auto=format&fit=crop',
        caption: 'Bridge construction details - Engineering meets art',
        likes: 9200,
        comments: 560,
        timestamp: '2 weeks ago'
    }
]

const STATS: Stat[] = [
    {
        value: '50K+',
        label: 'Followers',
        icon: <Users className="w-5 h-5" />,
        trend: '+2.5K this month'
    },
    {
        value: '500+',
        label: 'Posts',
        icon: <Grid3X3 className="w-5 h-5" />,
        trend: '12 this week'
    },
    {
        value: '5M+',
        label: 'Total Views',
        icon: <Eye className="w-5 h-5" />,
        trend: '+500K this month'
    },
    {
        value: '15',
        label: 'Awards',
        icon: <Award className="w-5 h-5" />,
        trend: '3 pending'
    }
]

// --- Animation Variants ---
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
}

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

const scaleIn = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
}

// --- Components ---

// 1. Navbar
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <motion.a
                        href="#"
                        className="flex items-center gap-3 group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                            <div className="relative bg-gradient-to-br from-primary-500 to-primary-700 p-2.5 rounded-xl">
                                <Building2 className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-gray-900 tracking-tight">
                                Builder <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Ballery</span>
                            </span>
                            <span className="text-xs text-gray-500 font-medium -mt-0.5">Civil Engineering</span>
                        </div>
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {['Home', 'Work', 'About', 'Contact'].map((item, i) => (
                            <motion.a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors group"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                {item}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
                            </motion.a>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center gap-3">
                        <motion.a
                            href="https://instagram.com/builderballery"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative overflow-hidden bg-gray-900 text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-gray-900/20 transition-all duration-300"
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Instagram className="h-4 w-4" />
                                Follow
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </motion.a>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-100"
                    >
                        <div className="px-4 py-6 space-y-2">
                            {['Home', 'Work', 'About', 'Contact'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 font-medium transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item}
                                </a>
                            ))}
                            <a
                                href="https://instagram.com/builderballery"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-xl font-semibold mt-4"
                            >
                                <Instagram className="h-4 w-4" />
                                Follow on Instagram
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

// 2. Hero Section
const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-primary-50/30" />
            <div className="absolute inset-0 bg-grid opacity-50" />

            {/* Decorative Elements */}
            <div className="absolute top-20 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-0 w-80 h-80 bg-primary-300/20 rounded-full blur-3xl" />

            {/* Floating Elements */}
            <motion.div
                className="absolute top-32 right-[20%] hidden lg:block"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary-100 p-2 rounded-xl">
                            <TrendingUp className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900">+25% Growth</p>
                            <p className="text-xs text-gray-500">This month</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="absolute bottom-32 left-[15%] hidden lg:block"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="bg-yellow-100 p-2 rounded-xl">
                            <Award className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900">Award Winner</p>
                            <p className="text-xs text-gray-500">Best Content 2024</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Content */}
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                        className="space-y-8"
                    >
                        <motion.div
                            variants={fadeInUp}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100"
                        >
                            <Sparkles className="h-4 w-4 text-primary-600" />
                            <span className="text-sm font-semibold text-primary-700">Award Winning Civil Engineer</span>
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight"
                        >
                            Building
                            <br />
                            <span className="relative">
                                <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-green-500 bg-clip-text text-transparent">
                                    Dreams
                                </span>
                                <motion.svg
                                    className="absolute -bottom-2 left-0 w-full"
                                    viewBox="0 0 200 12"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ delay: 0.5, duration: 1 }}
                                >
                                    <motion.path
                                        d="M0 6 Q50 0, 100 6 T200 6"
                                        fill="none"
                                        stroke="url(#gradient)"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#16a34a" />
                                            <stop offset="100%" stopColor="#22c55e" />
                                        </linearGradient>
                                    </defs>
                                </motion.svg>
                            </span>
                            <br />
                            into Reality
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl"
                        >
                            Documenting the art of construction and concrete wizardry.
                            From complex engineering projects to beautiful architectural forms.
                            <span className="text-gray-900 font-medium"> Join 50K+ followers</span> on this journey.
                        </motion.p>

                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <motion.a
                                href="#work"
                                className="group relative overflow-hidden bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-gray-900/30 transition-all duration-300"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    View My Work
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </motion.a>

                            <motion.a
                                href="https://instagram.com/builderballery"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-primary-500 hover:text-primary-600 hover:shadow-lg transition-all duration-300"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Instagram className="h-5 w-5" />
                                Follow Me
                            </motion.a>
                        </motion.div>

                        {/* Trust Indicators */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex items-center gap-6 pt-4"
                        >
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold shadow-lg"
                                    >
                                        {String.fromCharCode(65 + i - 1)}
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm">
                                <p className="font-semibold text-gray-900">Join 50,000+ followers</p>
                                <p className="text-gray-500">Growing every day</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Featured Reel Widget */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="relative"
                    >
                        {/* Glow Effect */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 via-green-500/20 to-primary-500/20 rounded-[3rem] blur-2xl opacity-60" />

                        <div className="relative bg-white rounded-[2rem] p-3 shadow-2xl border border-gray-100">
                            {/* Video Container */}
                            <div className="relative aspect-[9/16] sm:aspect-[4/5] rounded-3xl overflow-hidden bg-gray-900">
                                <Image
                                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop"
                                    alt="Featured Reel"
                                    fill
                                    className="object-cover"
                                    priority
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                {/* Play Button */}
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <div className="bg-white/20 backdrop-blur-md p-6 rounded-full border border-white/30">
                                        <PlayCircle className="h-12 w-12 text-white" />
                                    </div>
                                </motion.div>

                                {/* Reel Badge */}
                                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
                                    <Video className="h-4 w-4 text-white" />
                                    <span className="text-white text-sm font-semibold">Reel</span>
                                </div>

                                {/* Duration */}
                                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg">
                                    <span className="text-white text-xs font-medium">0:58</span>
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                                        <Clock className="h-4 w-4" />
                                        <span>2 hours ago</span>
                                    </div>
                                    <h3 className="text-white text-lg font-bold leading-tight mb-3">
                                        Pouring 1000+ yards of concrete in one day. Watch the full process!
                                    </h3>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1.5 text-white/90">
                                            <Heart className="h-4 w-4" />
                                            <span className="text-sm font-medium">12.4K</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-white/90">
                                            <Eye className="h-4 w-4" />
                                            <span className="text-sm font-medium">150K</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-white/90">
                                            <MessageCircle className="h-4 w-4" />
                                            <span className="text-sm font-medium">458</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Engagement Bar */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl mt-3">
                                <div className="flex items-center gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
                                    >
                                        <Heart className="h-5 w-5" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
                                    >
                                        <MessageCircle className="h-5 w-5" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
                                    >
                                        <Share2 className="h-5 w-5" />
                                    </motion.button>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="text-gray-600 hover:text-primary-600 transition-colors"
                                >
                                    <Bookmark className="h-5 w-5" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="flex flex-col items-center gap-2 text-gray-400">
                    <span className="text-xs font-medium">Scroll to explore</span>
                    <ChevronRight className="h-4 w-4 rotate-90" />
                </div>
            </motion.div>
        </section>
    )
}

// 3. Stats Section
const StatsSection = () => (
    <section className="relative py-20 bg-white border-y border-gray-100 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-dots opacity-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                {STATS.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group"
                    >
                        <div className="text-center p-6 rounded-2xl bg-gray-50/50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 text-primary-600 mb-4 group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </div>
                            <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-500 font-medium mb-2">{stat.label}</div>
                            {stat.trend && (
                                <div className="text-xs text-primary-600 font-semibold">{stat.trend}</div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
)

// 4. Instagram Feed
const InstagramFeed = ({ posts, loading }: { posts: MediaItem[]; loading: boolean }) => {
    const [filter, setFilter] = useState<'all' | 'reels' | 'posts'>('all')

    const filteredPosts = posts.filter(post => {
        if (filter === 'all') return true
        if (filter === 'reels') return post.isReel
        if (filter === 'posts') return !post.isReel
        return true
    })

    return (
        <section id="work" className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 mb-6">
                        <Grid3X3 className="h-4 w-4 text-primary-600" />
                        <span className="text-sm font-semibold text-primary-700">Instagram Feed</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        Recent <span className="bg-gradient-to-r from-primary-600 to-green-500 bg-clip-text text-transparent">Creations</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        A curated look at my latest projects, reels, and construction adventures.
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {[
                        { key: 'all', label: 'All Posts', icon: <Grid3X3 className="h-4 w-4" /> },
                        { key: 'reels', label: 'Reels', icon: <Video className="h-4 w-4" /> },
                        { key: 'posts', label: 'Posts', icon: <Layers className="h-4 w-4" /> }
                    ].map((tab) => (
                        <motion.button
                            key={tab.key}
                            onClick={() => setFilter(tab.key as typeof filter)}
                            className={cn(
                                "flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300",
                                filter === tab.key
                                    ? "bg-gray-900 text-white shadow-lg"
                                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                            )}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {tab.icon}
                            {tab.label}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Posts Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-4 animate-pulse">
                                <div className="aspect-square bg-gray-200 rounded-3xl" />
                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                                <div className="h-4 bg-gray-200 rounded w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        variants={staggerContainer}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredPosts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                variants={scaleIn}
                                whileHover={{ y: -8 }}
                                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
                            >
                                {/* Image/Video Container */}
                                <div className="relative aspect-square overflow-hidden">
                                    <Image
                                        src={post.thumbnail || post.url}
                                        alt={post.caption || "Post"}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Video Indicator */}
                                    {post.isReel && (
                                        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
                                            <Video className="h-3.5 w-3.5 text-white" />
                                            <span className="text-white text-xs font-semibold">Reel</span>
                                        </div>
                                    )}

                                    {/* Duration Badge */}
                                    {post.duration && (
                                        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg">
                                            <span className="text-white text-xs font-medium">{post.duration}</span>
                                        </div>
                                    )}

                                    {/* Play Button for Videos */}
                                    {post.isReel && (
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <motion.div
                                                className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30"
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                <PlayCircle className="h-10 w-10 text-white" />
                                            </motion.div>
                                        </div>
                                    )}

                                    {/* Hover Stats */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="flex items-center justify-between text-white">
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-1.5">
                                                    <Heart className="h-4 w-4" />
                                                    <span className="text-sm font-medium">{(post.likes || 0).toLocaleString()}</span>
                                                </span>
                                                {post.views && (
                                                    <span className="flex items-center gap-1.5">
                                                        <Eye className="h-4 w-4" />
                                                        <span className="text-sm font-medium">{post.views.toLocaleString()}</span>
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-xs text-white/70">{post.timestamp}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <p className="text-gray-900 font-medium leading-relaxed line-clamp-2 mb-4">
                                        {post.caption}
                                    </p>

                                    {/* Engagement */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="flex items-center gap-1.5 text-gray-500 hover:text-red-500 transition-colors"
                                            >
                                                <Heart className="h-4 w-4" />
                                                <span className="text-sm">{(post.likes || 0).toLocaleString()}</span>
                                            </motion.button>
                                            {post.comments && (
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="flex items-center gap-1.5 text-gray-500 hover:text-primary-600 transition-colors"
                                                >
                                                    <MessageCircle className="h-4 w-4" />
                                                    <span className="text-sm">{post.comments}</span>
                                                </motion.button>
                                            )}
                                        </div>
                                        <motion.a
                                            href="#"
                                            className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors"
                                            whileHover={{ x: 4 }}
                                        >
                                            View <ArrowRight className="h-4 w-4" />
                                        </motion.a>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                )}

                {/* Load More */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex justify-center mt-12"
                >
                    <motion.a
                        href="https://instagram.com/builderballery"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 rounded-2xl font-bold text-gray-900 hover:border-primary-500 hover:text-primary-600 hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Instagram className="h-5 w-5" />
                        View All on Instagram
                        <ExternalLink className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    )
}

// 5. About Section
const AboutSection = () => (
    <section id="about" className="py-24 lg:py-32 bg-white relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-green-50/20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    {/* Decorative Elements */}
                    <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary-200/50 rounded-full blur-2xl" />
                    <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary-300/30 rounded-full blur-2xl" />

                    {/* Main Image */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-green-500/20 rounded-[2.5rem] blur-xl" />
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                            <Image
                                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop"
                                alt="Builder Ballery"
                                width={600}
                                height={800}
                                className="object-cover"
                            />

                            {/* Overlay Badge */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                                <div className="flex items-center gap-4">
                                    <div className="bg-primary-100 p-3 rounded-xl">
                                        <HardHat className="h-6 w-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">15+ Years Experience</p>
                                        <p className="text-sm text-gray-500">Civil Engineering & Construction</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100">
                        <Sparkles className="h-4 w-4 text-primary-600" />
                        <span className="text-sm font-semibold text-primary-700">About Me</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                        Passionate Engineer &<br />
                        <span className="bg-gradient-to-r from-primary-600 to-green-500 bg-clip-text text-transparent">Content Creator</span>
                    </h2>

                    <p className="text-lg text-gray-600 leading-relaxed">
                        I started my career on a construction site, but my passion for design and documentation led me to share my journey on Instagram.
                        I believe that engineering is not just about calculations; it's about <span className="text-gray-900 font-medium">storytelling</span>.
                    </p>

                    {/* Feature Cards */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <motion.div
                            whileHover={{ y: -4, shadow: "lg" }}
                            className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="bg-primary-100 p-3 rounded-xl w-fit mb-4">
                                <Layers className="h-6 w-6 text-primary-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Civil Engineering</h3>
                            <p className="text-sm text-gray-500">Specializing in high-rise construction and structural design.</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -4, shadow: "lg" }}
                            className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="bg-primary-100 p-3 rounded-xl w-fit mb-4">
                                <Video className="h-6 w-6 text-primary-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Content Creation</h3>
                            <p className="text-sm text-gray-500">Creating immersive 3D renders and construction animations.</p>
                        </motion.div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex flex-wrap gap-8 pt-4">
                        <div>
                            <p className="text-3xl font-bold text-gray-900">150+</p>
                            <p className="text-sm text-gray-500">Projects Completed</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gray-900">50K+</p>
                            <p className="text-sm text-gray-500">Instagram Followers</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gray-900">15</p>
                            <p className="text-sm text-gray-500">Industry Awards</p>
                        </div>
                    </div>

                    {/* CTA */}
                    <motion.a
                        href="#"
                        className="inline-flex items-center gap-2 text-primary-600 font-bold text-lg group"
                        whileHover={{ x: 4 }}
                    >
                        View My Resume
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </motion.div>
            </div>
        </div>
    </section>
)

// 6. CTA Section
const CTA = () => (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800" />
        <div className="absolute inset-0 bg-grid opacity-10" />

        {/* Decorative Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8"
            >
                <Sparkles className="h-4 w-4 text-primary-400" />
                <span className="text-sm font-semibold text-white/90">Let's Connect</span>
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
                Let's Build Something
                <br />
                <span className="bg-gradient-to-r from-primary-400 to-green-400 bg-clip-text text-transparent">Great Together</span>
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
            >
                Whether you have a project in mind or just want to say hello, I'm always open to new opportunities and collaborations.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
            >
                <motion.a
                    href="mailto:contact@builderballery.com"
                    className="group relative overflow-hidden bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Get in Touch
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                </motion.a>

                <motion.a
                    href="https://instagram.com/builderballery"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 border border-white/20 hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Instagram className="h-5 w-5" />
                    Follow on Instagram
                </motion.a>
            </motion.div>
        </div>
    </section>
)

// 7. Footer
const Footer = () => (
    <footer className="bg-gray-950 text-gray-400 py-16 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid opacity-5" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                {/* Brand */}
                <div className="lg:col-span-1">
                    <motion.a
                        href="#"
                        className="flex items-center gap-3 mb-6 group"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                            <div className="relative bg-gradient-to-br from-primary-500 to-primary-700 p-2.5 rounded-xl">
                                <Building2 className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-white tracking-tight">
                                Builder <span className="bg-gradient-to-r from-primary-400 to-green-400 bg-clip-text text-transparent">Ballery</span>
                            </span>
                            <span className="text-xs text-gray-500 font-medium -mt-0.5">Civil Engineering</span>
                        </div>
                    </motion.a>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Making construction look easy, one post at a time. Follow my journey through the world of civil engineering.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-bold mb-6">Quick Links</h4>
                    <ul className="space-y-3">
                        {['Home', 'Work', 'About', 'Contact'].map((link) => (
                            <li key={link}>
                                <a href={`#${link.toLowerCase()}`} className="text-sm hover:text-white transition-colors flex items-center gap-2 group">
                                    <ChevronRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h4 className="text-white font-bold mb-6">Services</h4>
                    <ul className="space-y-3">
                        {['Consulting', '3D Modeling', 'Brand Collaborations', 'Speaking'].map((service) => (
                            <li key={service}>
                                <a href="#" className="text-sm hover:text-white transition-colors flex items-center gap-2 group">
                                    <ChevronRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    {service}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h4 className="text-white font-bold mb-6">Follow Me</h4>
                    <div className="flex gap-3">
                        <motion.a
                            href="https://instagram.com/builderballery"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
                            whileHover={{ scale: 1.1, y: -2 }}
                        >
                            <Instagram className="h-5 w-5 group-hover:text-primary-400 transition-colors" />
                        </motion.a>
                        <motion.a
                            href="#"
                            className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
                            whileHover={{ scale: 1.1, y: -2 }}
                        >
                            <Video className="h-5 w-5 group-hover:text-primary-400 transition-colors" />
                        </motion.a>
                        <motion.a
                            href="#"
                            className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
                            whileHover={{ scale: 1.1, y: -2 }}
                        >
                            <Share2 className="h-5 w-5 group-hover:text-primary-400 transition-colors" />
                        </motion.a>
                    </div>

                    {/* Location */}
                    <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span>Mumbai, India</span>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-500">
                    © 2024 Builder Ballery. All rights reserved.
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                    Crafted with <Heart className="h-4 w-4 text-red-500" /> for engineering enthusiasts
                </p>
            </div>
        </div>
    </footer>
)

// --- Main Application ---
export default function Home() {
    const [posts, setPosts] = useState<MediaItem[]>([])
    const [loading, setLoading] = useState(true)

    // Simulate data fetching from Apify
    useEffect(() => {
        const fetchData = async () => {
            // In a real app, call Apify MCP server to scrape Instagram content
            // For now, use mock data with delay
            setTimeout(() => {
                setPosts(INITIAL_INSTAGRAM_DATA)
                setLoading(false)
            }, 1500)
        }

        fetchData()
    }, [])

    return (
        <main className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
            <Navbar />
            <Hero />
            <StatsSection />
            <InstagramFeed posts={posts} loading={loading} />
            <AboutSection />
            <CTA />
            <Footer />
        </main>
    )
}