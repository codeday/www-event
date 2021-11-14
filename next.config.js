module.exports = {
  publicRuntimeConfig: {
    // eslint-disable-next-line node/no-process-env
    stripeKey: process.env.STRIPE_PUBLISHABLE_KEY,
  },
  serverRuntimeConfig: {
    clear_gql: {
      // eslint-disable-next-line node/no-process-env
      secret: process.env.CLEAR_GQL_SECRET,
      // eslint-disable-next-line node/no-process-env
      audience: process.env.CLEAR_GQL_AUDIENCE,
    },
    // eslint-disable-next-line node/no-process-env
    audience: process.env.JWT_AUDIENCE,
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
