import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata: Metadata = {
    metadataBase: new URL('https://builderballery.com'),
    title: 'Builder Ballery | ಬಳ್ಳೇರಿ — Civil Engineering & Construction',
    description: 'Karnataka\'s trusted civil engineer & content creator. Vastu tips, construction materials, government schemes. 226K+ followers. ಕಟ್ಟಡ ನಿರ್ಮಾಣ ಮಾಹಿತಿ.',
    keywords: 'civil engineering, construction, vastu tips, builder ballery, karnataka, ಸಿವಿಲ್ ಇಂಜಿನಿಯರಿಂಗ್, ವಾಸ್ತು, ನಿರ್ಮಾಣ',
    authors: [{ name: 'Builder Ballery' }],
    openGraph: {
        title: 'Builder Ballery | ಬಳ್ಳೇರಿ — Civil Engineering',
        description: 'Karnataka\'s trusted civil engineer & content creator. Vastu tips, construction materials, government schemes.',
        type: 'website',
        locale: 'en_IN',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop',
                width: 1200,
                height: 630,
                alt: 'Builder Ballery — Civil Engineering',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Builder Ballery | ಬಳ್ಳೇರಿ — Civil Engineering',
        description: 'Karnataka\'s trusted civil engineer & content creator. 226K+ followers.',
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
        <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
            <body className={inter.className}>{children}</body>
        </html>
    )
}