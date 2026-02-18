'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
    Instagram, Video, Grid3X3, Search, Star, Award, ArrowUpRight, Menu, X,
    ChevronRight, PlayCircle, Layers, Users, Clock, Heart, MessageCircle,
    Eye, Share2, Bookmark, Sparkles, Building2, HardHat, ArrowRight,
    ExternalLink, MapPin, Calendar, TrendingUp, Home, Compass, Package,
    Landmark, FileText, Download, Phone, Mail, Zap
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { supabase, type Video as VideoType, type VideoCategory, CATEGORY_LABELS } from '@/lib/supabase'

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }

const INSTAGRAM_URL = 'https://www.instagram.com/builder_ballery/'

// --- Constants ---
const STATS: { value: string; label: string; suffix?: string; icon: React.ReactNode }[] = [
    { value: '226', suffix: 'K+', label: 'Followers', icon: <Users className="w-5 h-5" /> },
    { value: '260', suffix: '+', label: 'Reels', icon: <Video className="w-5 h-5" /> },
    { value: '10', suffix: 'M+', label: 'Views', icon: <Eye className="w-5 h-5" /> },
    { value: '15', suffix: '+', label: 'Years', icon: <HardHat className="w-5 h-5" /> },
]

const CATEGORY_COLORS: Record<VideoCategory, { bg: string; text: string; border: string }> = {
    vastu_tips: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
    materials_info: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
    govt_schemes: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
}

const CATEGORY_ICONS: Record<VideoCategory, React.ReactNode> = {
    vastu_tips: <Compass className="h-4 w-4" />,
    materials_info: <Package className="h-4 w-4" />,
    govt_schemes: <Landmark className="h-4 w-4" />,
}

// Animation presets
const fadeUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } }
const stagger = { animate: { transition: { staggerChildren: 0.08 } } }

// --- NAVBAR ---
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', h)
        return () => window.removeEventListener('scroll', h)
    }, [])

    return (
        <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
            className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled ? "bg-zinc-950/80 backdrop-blur-2xl border-b border-white/5" : "bg-transparent"
            )}>
            {/* Karnataka stripe */}
            <div className="h-[2px] karnataka-stripe" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <motion.a href="#" className="flex items-center gap-3 group" whileHover={{ scale: 1.02 }}>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-karnataka-red to-karnataka-yellow rounded-xl blur-lg opacity-40 group-hover:opacity-70 transition-opacity" />
                            <div className="relative bg-gradient-to-br from-karnataka-red to-karnataka-yellow p-2.5 rounded-xl">
                                <Building2 className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-display font-bold text-white tracking-tight">
                                Builder <span className="gradient-text-karnataka">Ballery</span>
                            </span>
                            <span className="text-[10px] text-zinc-500 font-medium tracking-wider uppercase">Civil Engineering • ಸಿವಿಲ್ ಇಂಜಿನಿಯರಿಂಗ್</span>
                        </div>
                    </motion.a>

                    <div className="hidden md:flex items-center gap-1">
                        {['Home', 'Videos', 'About', 'Contact'].map((item, i) => (
                            <motion.a key={item} href={`#${item.toLowerCase()}`}
                                className="relative px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors group"
                                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                                {item}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-karnataka-red to-karnataka-yellow group-hover:w-full transition-all duration-300 rounded-full" />
                            </motion.a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        <motion.a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                            className="group relative overflow-hidden px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all duration-300 border border-white/10 hover:border-karnataka-yellow/40"
                            style={{ background: 'linear-gradient(135deg, rgba(204,0,0,0.15), rgba(255,215,0,0.1))' }}
                            whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
                            <Instagram className="h-4 w-4 text-karnataka-yellow" />
                            <span className="text-white">Follow</span>
                        </motion.a>
                    </div>

                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white">
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </motion.button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-zinc-950/95 backdrop-blur-2xl border-b border-white/5">
                        <div className="px-4 py-6 space-y-2">
                            {['Home', 'Videos', 'About', 'Contact'].map((item) => (
                                <a key={item} href={`#${item.toLowerCase()}`}
                                    className="block px-4 py-3 rounded-xl text-zinc-300 hover:bg-white/5 font-medium transition-colors"
                                    onClick={() => setIsOpen(false)}>{item}</a>
                            ))}
                            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 btn-karnataka text-white px-5 py-3 rounded-xl font-semibold mt-4">
                                <Instagram className="h-4 w-4" /> Follow on Instagram
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

// --- HERO ---
const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-zinc-950">
            {/* Background layers */}
            <div className="absolute inset-0 bg-grid-dark" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-karnataka-red/8 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-karnataka-yellow/6 rounded-full blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-karnataka-red/3 rounded-full blur-[200px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div initial="initial" animate="animate" variants={stagger} className="space-y-8">
                        {/* Trust Badge */}
                        <motion.div variants={fadeUp}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-karnataka-red/20">
                            <div className="w-2 h-2 rounded-full bg-karnataka-red animate-pulse" />
                            <span className="text-sm font-medium text-zinc-300">Trusted by 2 Lakh+ People • 2 ಲಕ್ಷ+ ಜನರ ನಂಬಿಕೆ</span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1 variants={fadeUp}
                            className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.05] tracking-tight">
                            ಕನಸುಗಳನ್ನು
                            <br />
                            <span className="gradient-text-karnataka">ನನಸಾಗಿಸುವುದು</span>
                            <br />
                            <span className="text-zinc-500 text-2xl sm:text-3xl font-normal tracking-normal">Building Dreams Into Reality</span>
                        </motion.h1>

                        <motion.p variants={fadeUp} className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-xl">
                            ವಾಸ್ತು ಸಲಹೆಗಳು, ನಿರ್ಮಾಣ ಸಾಮಗ್ರಿಗಳು ಮತ್ತು ಸರ್ಕಾರಿ ಯೋಜನೆಗಳಿಗಾಗಿ ನಿಮ್ಮ ಅತ್ಯುತ್ತಮ ಮೂಲ.
                            <br />
                            <span className="text-zinc-500">Your source for Vastu, materials & govt schemes.</span>
                        </motion.p>

                        {/* CTAs */}
                        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                            <motion.a href="#videos"
                                className="btn-karnataka px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                                <PlayCircle className="h-5 w-5" /> Watch Videos
                            </motion.a>
                            <motion.a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                                className="btn-glass px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                                <Instagram className="h-5 w-5" /> Follow Me
                            </motion.a>
                        </motion.div>

                        {/* Social Proof */}
                        <motion.div variants={fadeUp} className="flex items-center gap-4 pt-2">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="w-9 h-9 rounded-full border-2 border-zinc-900 bg-gradient-to-br from-karnataka-red to-karnataka-yellow flex items-center justify-center text-white text-xs font-bold">
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">226K+ followers</p>
                                <p className="text-xs text-zinc-500">Growing every day</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Hero Visual */}
                    <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }} className="relative hidden lg:block">
                        <div className="absolute -inset-4 bg-gradient-to-r from-karnataka-red/20 via-karnataka-yellow/10 to-karnataka-red/20 rounded-[3rem] blur-2xl animate-pulse-glow" />
                        <div className="relative border-gradient rounded-[2rem] p-1">
                            <div className="bg-zinc-900 rounded-[1.85rem] p-4">
                                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                                    <Image src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop"
                                        alt="Builder Ballery" fill className="object-cover" priority />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent" />

                                    {/* Reel badge */}
                                    <div className="absolute top-4 left-4 flex items-center gap-2 glass-dark px-3 py-1.5 rounded-full">
                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                        <span className="text-white text-xs font-semibold">LIVE</span>
                                    </div>

                                    {/* Content overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <p className="text-white/60 text-xs mb-1 flex items-center gap-1"><Clock className="h-3 w-3" /> Latest Reel</p>
                                        <h3 className="text-white font-bold leading-tight mb-3">ನಿರ್ಮಾಣ ಸ್ಥಳದಲ್ಲಿ ಕಾಂಕ್ರೀಟ್ ಹಾಕುವ ಪ್ರಕ್ರಿಯೆ</h3>
                                        <div className="flex items-center gap-4 text-white/80">
                                            <span className="flex items-center gap-1 text-xs"><Heart className="h-3 w-3" /> 12.4K</span>
                                            <span className="flex items-center gap-1 text-xs"><Eye className="h-3 w-3" /> 150K</span>
                                            <span className="flex items-center gap-1 text-xs"><MessageCircle className="h-3 w-3" /> 892</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Engagement Bar */}
                                <div className="flex items-center justify-between px-2 pt-4">
                                    <div className="flex items-center gap-4">
                                        {[Heart, MessageCircle, Share2].map((Icon, i) => (
                                            <motion.button key={i} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                                                className="text-zinc-400 hover:text-white transition-colors">
                                                <Icon className="h-5 w-5" />
                                            </motion.button>
                                        ))}
                                    </div>
                                    <motion.button whileHover={{ scale: 1.2 }} className="text-zinc-400 hover:text-karnataka-yellow transition-colors">
                                        <Bookmark className="h-5 w-5" />
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <div className="flex flex-col items-center gap-2 text-zinc-600">
                    <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
                    <ChevronRight className="h-4 w-4 rotate-90" />
                </div>
            </motion.div>
        </section>
    )
}

// --- STATS ---
const StatsSection = () => (
    <section className="relative py-1 overflow-hidden">
        <div className="h-[2px] karnataka-stripe opacity-40" />
        <div className="bg-zinc-900/80 backdrop-blur-xl border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4">
                    {STATS.map((stat, i) => (
                        <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className={cn("py-10 px-6 text-center group", i < 3 && "lg:border-r border-white/5")}>
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-karnataka-red/20 to-karnataka-yellow/20 text-karnataka-yellow mb-4 group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </div>
                            <div className="text-3xl sm:text-4xl font-display font-bold text-white mb-1">
                                {stat.value}<span className="gradient-text-karnataka">{stat.suffix}</span>
                            </div>
                            <div className="text-sm text-zinc-500 font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    </section>
)

// --- VIDEO LIBRARY (placeholder - rest comes in next write) ---
const VideoLibrary = ({ videos, loading }: { videos: VideoType[]; loading: boolean }) => {
    const [filter, setFilter] = useState<VideoCategory | 'all'>('all')
    const filteredVideos = videos.filter(v => filter === 'all' || v.category === filter)

    const tabs: { key: VideoCategory | 'all'; label: string; icon: React.ReactNode }[] = [
        { key: 'all', label: 'All', icon: <Grid3X3 className="h-4 w-4" /> },
        { key: 'vastu_tips', label: 'Vastu', icon: <Compass className="h-4 w-4" /> },
        { key: 'materials_info', label: 'Materials', icon: <Package className="h-4 w-4" /> },
        { key: 'govt_schemes', label: 'Govt', icon: <Landmark className="h-4 w-4" /> },
    ]

    return (
        <section id="videos" className="py-24 lg:py-32 bg-zinc-950 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-karnataka-red/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-karnataka-yellow/5 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-karnataka-red/20 mb-6">
                        <Video className="h-4 w-4 text-karnataka-red" />
                        <span className="text-sm font-semibold text-zinc-300">Video Library • ವೀಡಿಯೊ</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
                        Latest <span className="gradient-text-karnataka">Constructions</span>
                    </h2>
                    <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
                        ಇತ್ತೀಚಿನ ನಿರ್ಮಾಣ ವೀಡಿಯೊಗಳು — Explore the latest construction videos and Vastu tips.
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-2 mb-12">
                    {tabs.map((tab) => (
                        <motion.button key={tab.key} onClick={() => setFilter(tab.key)}
                            className={cn("flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300",
                                filter === tab.key
                                    ? "bg-gradient-to-r from-karnataka-red to-karnataka-yellow text-white shadow-lg shadow-red-500/10"
                                    : "glass text-zinc-400 hover:text-white"
                            )}
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            {tab.icon}{tab.label}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Video Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-4 animate-pulse">
                                <div className="aspect-video bg-zinc-800 rounded-2xl" />
                                <div className="h-4 bg-zinc-800 rounded w-3/4" />
                                <div className="h-4 bg-zinc-800 rounded w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <motion.div initial="initial" whileInView="animate" variants={stagger} viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredVideos.map((video) => (
                                <motion.div key={video.id} layout
                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
                                    <Link href={`/video/${video.id}`}>
                                        <motion.article whileHover={{ y: -8 }}
                                            className="group relative card-dark rounded-2xl overflow-hidden cursor-pointer">
                                            <div className="relative aspect-video overflow-hidden">
                                                <Image src={video.thumbnail_url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop'}
                                                    alt={video.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                                                <div className={cn("absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border",
                                                    CATEGORY_COLORS[video.category].bg, CATEGORY_COLORS[video.category].text, CATEGORY_COLORS[video.category].border)}>
                                                    {CATEGORY_ICONS[video.category]}
                                                    <span className="text-xs font-semibold">{CATEGORY_LABELS[video.category]}</span>
                                                </div>

                                                {video.duration && (
                                                    <div className="absolute top-4 right-4 glass-dark px-2 py-1 rounded-lg">
                                                        <span className="text-white text-xs font-medium">{video.duration}</span>
                                                    </div>
                                                )}

                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="glass p-4 rounded-full border border-white/20">
                                                        <PlayCircle className="h-10 w-10 text-white" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-5">
                                                <h3 className="text-white font-bold leading-tight line-clamp-2 mb-2">{video.title}</h3>
                                                {video.description && <p className="text-zinc-500 text-sm line-clamp-2 mb-4">{video.description}</p>}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3 text-zinc-500">
                                                        <span className="flex items-center gap-1 text-xs"><Eye className="h-3.5 w-3.5" />{(video.views || 0).toLocaleString()}</span>
                                                        <span className="flex items-center gap-1 text-xs"><Heart className="h-3.5 w-3.5" />{(video.likes || 0).toLocaleString()}</span>
                                                    </div>
                                                    <span className="flex items-center gap-1 text-xs font-semibold text-karnataka-yellow group-hover:gap-2 transition-all">
                                                        Watch <ArrowRight className="h-3.5 w-3.5" />
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.article>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex justify-center mt-12">
                    <motion.a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                        className="group flex items-center gap-2 btn-glass px-8 py-4 rounded-2xl font-bold text-white"
                        whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                        <Instagram className="h-5 w-5" /> View All on Instagram
                        <ExternalLink className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    )
}

// --- ABOUT ---
const AboutSection = () => (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 bg-dots-dark" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-karnataka-red/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-karnataka-yellow/5 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-karnataka-red/10 to-karnataka-yellow/10 rounded-[2.5rem] blur-xl" />
                    <div className="relative border-gradient rounded-3xl p-1">
                        <div className="rounded-[1.4rem] overflow-hidden">
                            <Image src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop"
                                alt="Builder Ballery" width={600} height={800} className="object-cover" />
                        </div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-gradient-to-br from-karnataka-red to-karnataka-yellow p-3 rounded-xl">
                                <HardHat className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="font-bold text-white">15+ Years Experience</p>
                                <p className="text-sm text-zinc-400">Civil Engineer • ಸಿವಿಲ್ ಇಂಜಿನಿಯರ್</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-karnataka-yellow/20">
                        <Sparkles className="h-4 w-4 text-karnataka-yellow" />
                        <span className="text-sm font-semibold text-zinc-300">About Me • ನನ್ನ ಬಗ್ಗೆ</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl font-display font-bold text-white leading-tight">
                        ನಿಷ್ಠಾವಂತ ಇಂಜಿನಿಯರ್ &<br />
                        <span className="gradient-text-karnataka">ಕಂಟೆಂಟ್ ಕ್ರಿಯೇಟರ್</span>
                        <br /><span className="text-xl text-zinc-500 font-normal">Passionate Engineer & Creator</span>
                    </h2>

                    <p className="text-lg text-zinc-400 leading-relaxed">
                        ನಾನು ನನ್ನ ವೃತ್ತಿಜೀವನವನ್ನು ನಿರ್ಮಾಣ ಸ್ಥಳದಲ್ಲಿ ಪ್ರಾರಂಭಿಸಿದೆ. ಎಂಜಿನಿಯರಿಂಗ್ ಕೇವಲ ಲೆಕ್ಕಾಚಾರಗಳಲ್ಲ; ಅದು <span className="text-white font-medium">ಕಥ ಹೇಳುವ ಕಲೆ</span>.
                        <br /><span className="text-zinc-500">Engineering is not just calculations; it is storytelling.</span>
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <motion.div whileHover={{ y: -4 }} className="card-dark p-6 rounded-2xl">
                            <div className="bg-gradient-to-br from-karnataka-red/20 to-karnataka-red/5 p-3 rounded-xl w-fit mb-4">
                                <Layers className="h-6 w-6 text-karnataka-red" />
                            </div>
                            <h3 className="font-bold text-white mb-2">ಸಿವಿಲ್ ಎಂಜಿನಿಯರಿಂಗ್</h3>
                            <p className="text-sm text-zinc-500">Structural design & earthquake-resistant buildings.</p>
                        </motion.div>
                        <motion.div whileHover={{ y: -4 }} className="card-dark p-6 rounded-2xl">
                            <div className="bg-gradient-to-br from-karnataka-yellow/20 to-karnataka-yellow/5 p-3 rounded-xl w-fit mb-4">
                                <FileText className="h-6 w-6 text-karnataka-yellow" />
                            </div>
                            <h3 className="font-bold text-white mb-2">ಉಚಿತ ಸಂಪನ್ಮೂಲಗಳು</h3>
                            <p className="text-sm text-zinc-500">Government circulars & construction guides.</p>
                        </motion.div>
                    </div>

                    <div className="flex flex-wrap gap-8 pt-4">
                        {[{ v: '150+', l: 'Projects' }, { v: '226K+', l: 'Followers' }, { v: '15+', l: 'Years' }].map(s => (
                            <div key={s.l}>
                                <p className="text-3xl font-display font-bold gradient-text-karnataka">{s.v}</p>
                                <p className="text-sm text-zinc-500">{s.l}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
)

// --- CTA ---
const CTA = () => (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 bg-grid-dark" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-karnataka-red/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-karnataka-yellow/6 rounded-full blur-[120px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-karnataka-yellow/20 mb-8">
                <Zap className="h-4 w-4 text-karnataka-yellow" />
                <span className="text-sm font-semibold text-zinc-300">Let&apos;s Connect • ಸಂಪರ್ಕದಲ್ಲಿರಿ</span>
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
                ಒಟ್ಟಿಗೆ ಏನನ್ನಾದರೂ
                <br /><span className="gradient-text-karnataka">ಶ್ರೇಷ್ಠವಾಗಿ ನಿರ್ಮಿಸೋಣ</span>
                <br /><span className="text-xl text-zinc-500 font-normal">Let&apos;s Build Something Great Together</span>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.2 }} className="text-lg text-zinc-500 mb-12 max-w-2xl mx-auto">
                Whether you have a project in mind or just want to say hello, I&apos;m always ready.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a href="mailto:contact@builderballery.com"
                    className="btn-karnataka px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Mail className="h-5 w-5" /> Get in Touch
                </motion.a>
                <motion.a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                    className="btn-glass px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Instagram className="h-5 w-5" /> Follow on Instagram
                </motion.a>
            </motion.div>
        </div>
    </section>
)

// --- FOOTER ---
const Footer = () => (
    <footer className="bg-zinc-950 text-zinc-400 relative overflow-hidden">
        <div className="h-[2px] karnataka-stripe" />
        <div className="absolute inset-0 bg-grid-dark opacity-30" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                <div className="lg:col-span-1">
                    <motion.a href="#" className="flex items-center gap-3 mb-6 group" whileHover={{ scale: 1.02 }}>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-karnataka-red to-karnataka-yellow rounded-xl blur-lg opacity-40" />
                            <div className="relative bg-gradient-to-br from-karnataka-red to-karnataka-yellow p-2.5 rounded-xl">
                                <Building2 className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-display font-bold text-white tracking-tight">
                                Builder <span className="gradient-text-karnataka">Ballery</span>
                            </span>
                            <span className="text-[10px] text-zinc-600 font-medium tracking-wider uppercase">ಬಳ್ಳೇರಿ • Since 2009</span>
                        </div>
                    </motion.a>
                    <p className="text-sm text-zinc-600 leading-relaxed">Making construction easy, one reel at a time.</p>
                </div>

                <div>
                    <h4 className="text-white font-display font-bold mb-6 text-sm tracking-wider uppercase">Quick Links</h4>
                    <ul className="space-y-3">
                        {['Home', 'Videos', 'About', 'Contact'].map((link) => (
                            <li key={link}>
                                <a href={`#${link.toLowerCase()}`} className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-2 group">
                                    <ChevronRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-karnataka-yellow" />
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-display font-bold mb-6 text-sm tracking-wider uppercase">Categories</h4>
                    <ul className="space-y-3">
                        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                            <li key={key}>
                                <a href="#videos" className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-2 group">
                                    <ChevronRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-karnataka-yellow" />
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-display font-bold mb-6 text-sm tracking-wider uppercase">Follow Me</h4>
                    <div className="flex gap-3">
                        {[{ icon: Instagram, href: INSTAGRAM_URL }, { icon: Video, href: '#' }, { icon: Share2, href: '#' }].map(({ icon: Icon, href }, i) => (
                            <motion.a key={i} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="p-3 card-dark rounded-xl group" whileHover={{ scale: 1.1, y: -2 }}>
                                <Icon className="h-5 w-5 group-hover:text-karnataka-yellow transition-colors" />
                            </motion.a>
                        ))}
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-sm text-zinc-600">
                        <MapPin className="h-4 w-4 text-karnataka-red" />
                        <span>Bengaluru, Karnataka • ಕರ್ನಾಟಕ</span>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-sm text-zinc-600">© 2024 Builder Ballery. All rights reserved.</p>
                <p className="text-sm text-zinc-600 flex items-center gap-2">
                    Crafted with <Heart className="h-4 w-4 text-karnataka-red" /> for engineering enthusiasts
                </p>
            </div>
        </div>
    </footer>
)

// --- MAIN ---
export default function HomePage() {
    const [videos, setVideos] = useState<VideoType[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: false })
                if (error) throw error
                setVideos(data || [])
            } catch (err) {
                console.error('Error fetching videos:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchVideos()
    }, [])

    return (
        <main className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
            <Navbar />
            <Hero />
            <StatsSection />
            <VideoLibrary videos={videos} loading={loading} />
            <AboutSection />
            <CTA />
            <Footer />
        </main>
    )
}