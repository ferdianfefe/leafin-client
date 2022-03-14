export default function handler(req, res) {
  res.setHeader('Set-Cookie', 'refreshToken=deleted; path=/;');
  res.setHeader(
    'Set-Cookie',
    'accessToken=deleted; path=/; domain=.hunaki.my.id;'
  );
  res.end();
}
