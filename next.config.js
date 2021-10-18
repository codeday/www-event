module.exports = {
  publicRuntimeConfig: {
    // eslint-disable-next-line node/no-process-env
    stripeKey: process.env.STRIPE_PUBLISHABLE_KEY,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://www.codeday.org/',
        permanent: false,
      },
    ];
  },
};
