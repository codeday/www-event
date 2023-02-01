module.exports = {
  i18n: {
    defaultLocale: '_default',
    locales: ['_default', 'en-US', 'es-MX', 'sw-KE', 'fr-CA', 'zh-SG', 'pt-BR', 'ms-MY', 'am-ET'],
    localeDetection: false,
  },
  fallbackLng: {
    default: ['en-US'],
  },
  ns: ['common', 'EventHome', 'Organize', 'Register', 'Rules', 'Scholarship', 'Upcoming'],
  localePath: (locale, namespace) => {
    // eslint-disable-next-line global-require
    const prefix = typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/locales';
    return [prefix, locale.replace('-', '_'), `${namespace}.json`].join('/');
  },
  // eslint-disable-next-line node/no-process-env
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  debug: false,
  returnObjects: true,
  joinArrays: ' ',
  nonExplicitSupportedLngs: true,
  serializeConfig: false,
};
