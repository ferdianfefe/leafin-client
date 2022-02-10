import { NextResponse } from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();
  const url = req.nextUrl.pathname;

  console.log(url);
  try {
    const data = await fetch('http://localhost:5000/api/user/private', {
      method: 'GET',
      credentials: true,
      headers: {
        cookie: `refreshToken=${req.cookies.refreshToken}; accessToken=${req.cookies.accessToken};`,
        content: 'application/json',
      },
    });
    const result = data.status;
    const cookie = data.headers.get('set-cookie')?.split(';');
    if (cookie != null) {
      res.cookie('accessToken', cookie[0].split('=')[1], {
        httpOnly: true,
        maxAge: cookie[1].split('=')[1] * 1000,
      });
    }

    if (
      result == 200 &&
      (url == '/signin' || url == '/signup' || url == '/home')
    ) {
      return res && NextResponse.redirect(new URL('/', req.url));
    } else if (
      result != 200 &&
      url !== '/signin' &&
      url !== '/signup' &&
      url !== '/home' &&
      !url.includes('/assets/')
    ) {
      return NextResponse.redirect(new URL('/home', req.url));
    } else {
      return res;
    }
  } catch (err) {
    if (
      url !== '/signin' &&
      url !== '/signup' &&
      url !== '/home' &&
      !url.includes('/assets/')
    ) {
      return NextResponse.redirect(new URL('/home', req.url));
    }
  }
}
