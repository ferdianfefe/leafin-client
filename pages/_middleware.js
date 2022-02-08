import { NextResponse } from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();
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
        maxAge: cookie[1].split('=')[1],
      });
    }

    if (
      result == 200 &&
      (req.url.includes('/signin') || req.url.includes('/signup'))
    ) {
      return res && NextResponse.redirect(new URL('/profile', req.url));
    } else if (
      result != 200 &&
      !req.url.includes('/signin') &&
      !req.url.includes('/signup')
    ) {
      return NextResponse.redirect(new URL('/signin', req.url));
    } else {
      return res;
    }
  } catch (err) {
    console.log(err);
  }
}
