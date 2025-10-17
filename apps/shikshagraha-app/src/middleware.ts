import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = request.nextUrl;

  // Get tokens from cookies using NextRequest
  const accToken = request.cookies.get('accToken');

  const userId =
    request instanceof NextRequest ? request.cookies.get('userId') : undefined;
  const unAuth =
    request instanceof NextRequest
      ? request.nextUrl.searchParams.get('unAuth')
      : undefined;

  // Authentication checks
  // If user has valid token and tries to access root/login, redirect to home
  if (
    (pathname === '/' || pathname === '/login') &&
    accToken &&
    userId &&
    unAuth !== 'true'
  ) {
    return NextResponse.redirect(new URL('/home', request.nextUrl.toString()));
  }

  // If user has no valid token and tries to access home, redirect to login
  if (
    pathname.startsWith('/home') &&
    (!accToken || !userId || unAuth === 'true')
  ) {
    const loginUrl = new URL('/', request.nextUrl.toString());
    loginUrl.searchParams.set('unAuth', 'true');
    return NextResponse.redirect(loginUrl);
  }

  if (url.pathname.startsWith('/registration')) {
    url.hostname = 'localhost';
    url.port = '4300';
    return NextResponse.rewrite(url);
  }

  if (url.pathname.startsWith('/content')) {
    url.hostname = 'localhost';
    url.port = '4301';
    return NextResponse.rewrite(url);
  }

  if (url.pathname.startsWith('/sbplayer')) {
    url.hostname = 'localhost';
    url.port = '4108';
    return NextResponse.rewrite(url);
  }

  if (url.pathname.startsWith('/pwa')) {
    url.hostname = 'localhost';
    url.port = '4200';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
