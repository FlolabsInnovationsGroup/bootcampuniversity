import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'Innovation Bootcamp University';
    const description = searchParams.get('description') || 'Learn, Earn & Master Tech Skills';
    const type = searchParams.get('type') || 'default';

    // Load fonts
    const interBold = await fetch(
      new URL('/public/fonts/Inter-Bold.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer());

    const interRegular = await fetch(
      new URL('/public/fonts/Inter-Regular.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer());

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
            backgroundColor: '#030712',
            backgroundImage:
              'radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1e293b 2%, transparent 0%)',
            backgroundSize: '100px 100px',
          }}
        >
          {/* Gradient Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, rgba(59,130,246,0.2) 0%, rgba(147,51,234,0.2) 100%)',
              opacity: 0.3,
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '40px',
              maxWidth: '850px',
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '40px',
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                style={{ marginRight: '12px' }}
              >
                <rect width="48" height="48" rx="8" fill="#3B82F6" />
                <path
                  d="M24 12L36 20V28L24 36L12 28V20L24 12Z"
                  fill="white"
                />
              </svg>
              <span
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'white',
                  fontFamily: 'Inter Bold',
                }}
              >
                Innovation Bootcamp
              </span>
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: '60px',
                fontFamily: 'Inter Bold',
                letterSpacing: '-0.05em',
                fontWeight: 700,
                color: 'white',
                marginBottom: '20px',
                lineHeight: 1.2,
              }}
            >
              {title}
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: '28px',
                fontFamily: 'Inter Regular',
                color: '#94A3B8',
                marginTop: '10px',
                lineHeight: 1.4,
              }}
            >
              {description}
            </div>
          </div>

          {/* Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(59,130,246,0.1)',
              padding: '12px 24px',
              borderRadius: '9999px',
              border: '1px solid rgba(59,130,246,0.2)',
            }}
          >
            <span
              style={{
                fontSize: '18px',
                fontFamily: 'Inter Regular',
                color: '#60A5FA',
              }}
            >
              {type === 'article' ? 'Blog Post' : type === 'course' ? 'Course' : 'innovationbootcamp.edu'}
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter Bold',
            data: interBold,
            style: 'normal',
            weight: 700,
          },
          {
            name: 'Inter Regular',
            data: interRegular,
            style: 'normal',
            weight: 400,
          },
        ],
      }
    );
  } catch (e) {
    console.error(e);
    return new Response('Failed to generate OG image', { status: 500 });
  }
} 