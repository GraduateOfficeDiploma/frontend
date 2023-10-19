module.exports = {
  reactStrictMode: true,
  transpilePackages: ['react-email-validator'],
  pagesDir: 'pages',
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    BASE_URL: process.env.BASE_URL,
  }
};
