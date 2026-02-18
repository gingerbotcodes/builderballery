import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 18,
                    background: 'linear-gradient(135deg, #CC0000, #FFD700)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px',
                    color: 'white',
                    fontWeight: 900,
                    letterSpacing: '-1px',
                    fontFamily: 'system-ui',
                }}
            >
                BB
            </div>
        ),
        { ...size }
    )
}
