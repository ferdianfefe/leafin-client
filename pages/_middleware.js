import { NextResponse } from 'next/server';
import config from '../config';

export async function middleware(req) {
  const res = NextResponse.next();
  const url = req.nextUrl.pathname;

  if (url.includes('/api/logout')) {
    res.cookie('refreshToken', '', {
      httpOnly: true,
      maxAge: 0,
      domain:
        process.env.NODE_ENV === 'development' ? 'localhost' : '.hunaki.my.id',
    });
    res.cookie('accessToken', '', {
      httpOnly: true,
      maxAge: 0,
      domain:
        process.env.NODE_ENV === 'development' ? 'localhost' : '.hunaki.my.id',
    });

    return res;
  }

  if (url.includes('/assets') || url.includes('.')) {
    return res;
  }
  try {
    const data = await fetch(`${config.apiURL}/user/private`, {
      method: 'GET',
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
        domain:
          process.env.NODE_ENV === 'development'
            ? 'localhost'
            : '.hunaki.my.id',
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
      url !== '/home'
    ) {
      return NextResponse.redirect(new URL('/home', req.url));
    } else {
      return res;
    }
  } catch (err) {
    console.log('Error disini:' + err);
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
