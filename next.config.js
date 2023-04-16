/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    path: 'https://example.com/myaccount/',
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'assets.coincap.io',
  //       port: '',
  //       pathname: '/assets/icons/**',
  //     },
  //   ],
  // },
};

module.exports = nextConfig;
