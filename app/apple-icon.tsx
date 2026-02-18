import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 90,
                    background: 'linear-gradient(135deg, #CC0000, #FFD700)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '36px',
                    color: 'white',
                    fontWeight: 900,
                    letterSpacing: '-4px',
                    fontFamily: 'system-ui',
                }}
            >
                BB
            </div>
        ),
        { ...size }
    )
}
