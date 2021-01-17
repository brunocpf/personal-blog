module.exports = {
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['pt', 'en'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'pt',
    localeDetection: false,
    webpack: (config, { isServer }) => {
      // Fixes npm packages that depend on `fs` module
      if (!isServer) {
        config.node = {
          fs: 'empty',
        };
      }

      return config;
    },
  },
};
