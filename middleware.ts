import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/login' || 
                     path === '/register' || 
                     path === '/' || 
                     path === '/apply' ||
                     path.startsWith('/api/auth') ||
                     path.startsWith('/api/apply') ||
                     path.startsWith('/api/contact') ||
                     path === '/favicon.ico' ||
                     path.startsWith('/_next') ||
                     (path.match(/^\/(terms|privacy|about|contact|marketing|home|programs|how-it-works|resources|blog|faqs|opportunities|internships|partners|advisor|career-support|handbook|press|careers|success-stories|legal)/) !== null);

  // If public path, just allow the request to proceed
  if (isPublicPath) {
    return NextResponse.next();
  }
  
  // Check if the path is for admin routes
  const isAdminPath = path.startsWith('/admin') || path === '/admin-dashboard';
  
  // Get the token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });
  
  // Handle non-authenticated users
  if (!token) {
    // Redirect to login with return URL
    const url = new URL('/login', request.url);
    url.searchParams.set('redirect', path);
    return NextResponse.redirect(url);
  }
  
  // Check for admin access
  if (isAdminPath) {
    // @ts-ignore - The role property might not be in the default token type
    const userRole = token.role as string;
    
    if (userRole !== 'admin') {
      // Redirect non-admin users to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  // Allow authenticated users to access protected routes
  return NextResponse.next();
}

// Specify which paths this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api routes that don't require authentication
     * 2. /_next (static files)
     * 3. /favicon.ico, /sitemap.xml, /robots.txt (SEO files)
     * 4. /public files
     */
    '/((?!api/webhooks|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}; 