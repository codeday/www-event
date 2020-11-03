module.exports = {
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
