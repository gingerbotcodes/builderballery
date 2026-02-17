import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    metadataBase: new URL('https://builderballery.com'),
    title: 'Builder Ballery - Civil Engineering & Construction',
    description: 'Award-winning civil engineering influencer creating stunning concrete designs and construction content',
    keywords: 'civil engineering, construction, concrete, builder, architecture, Instagram influencer, reels, concrete art',
    authors: [{ name: 'Builder Ballery' }],
    openGraph: {
        title: 'Builder Ballery - Civil Engineering & Construction',
        description: 'Award-winning civil engineering influencer creating stunning concrete designs and construction content',
        type: 'website',
        locale: 'en_US',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop',
                width: 1200,
                height: 630,
                alt: 'Builder Ballery - Civil Engineering',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Builder Ballery - Civil Engineering & Construction',
        description: 'Award-winning civil engineering influencer creating stunning concrete designs and construction content',
        images: [
            'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop',
        ],
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    )
}