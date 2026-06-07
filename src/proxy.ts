import { type NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    if (pathname === '/') {
        return NextResponse.redirect(new URL(token ? '/admin' : '/auth', request.url));
    }

    if (pathname.startsWith('/admin') && !token) {
        return NextResponse.redirect(new URL('/auth', request.url));
    }

    if (pathname === '/auth' && token) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/auth', '/admin/:path*'],
};
