import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    const title = searchParams.get('title') ?? 'Coffi - Coworking Spaces in Medellín'
    const subtitle = searchParams.get('subtitle') ?? 'Find perfect workspaces with real-time insights'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#EFEFF9',
            backgroundImage: 'linear-gradient(45deg, #533FFF 0%, #6E91FF 100%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '60px',
              margin: '40px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                color: '#312F3D',
                textAlign: 'center',
                marginBottom: '20px',
                lineHeight: '1.1',
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 32,
                color: '#533FFF',
                textAlign: 'center',
                fontWeight: 500,
                marginBottom: '30px',
              }}
            >
              {subtitle}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 24,
                color: '#312F3D',
              }}
            >
              ☕ 💻 🏢 📍 Medellín, Colombia
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
