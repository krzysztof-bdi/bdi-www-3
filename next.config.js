/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/centra-kompetencji/:slug*',
        destination: '/centra-kompetencji',
        permanent: true,
      },
    ];
  },
};
module.exports = nextConfig;
