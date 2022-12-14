module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  localePath:
    typeof window === 'undefined'
      // eslint-disable-next-line global-require
      ? require('path').resolve('./public/locales')
      : '/locales',
  // eslint-disable-next-line node/no-process-env
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  // eslint-disable-next-line node/no-process-env
  debug: process.env.NODE_ENV === 'development',
  returnObjects: true,
  joinArrays: ' ',
};
