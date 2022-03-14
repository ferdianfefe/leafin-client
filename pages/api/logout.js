export default function handler(req, res) {
  const domain =
    process.env.NODE_ENV == 'development' ? 'localhost' : '.hunaki.my.id';

  res.setHeader('Set-Cookie', 'refreshToken=deleted; path=/;');
  res.setHeader('Set-Cookie', `accessToken=deleted; path=/; domain=${domain};`);
  res.end();
}
