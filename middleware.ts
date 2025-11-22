import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from './lib/auth';

export async function middleware(request: NextRequest) {
    const session = request.cookies.get('session')?.value;
    const verifiedPayload = await verifySession(session);

    // ログインページへのアクセスで、すでにログイン済みの場合はトップへリダイレクト
    if (request.nextUrl.pathname === '/login') {
        if (verifiedPayload) {
            return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
    }

    // その他のページ（トップなど）へのアクセスで、未ログインの場合はログインページへリダイレクト
    if (!verifiedPayload) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
