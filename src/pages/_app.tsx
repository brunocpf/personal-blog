import { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import Head from 'next/head';
import { lightTheme, darkTheme } from 'src/util/theme';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import useDarkMode from 'use-dark-mode';
import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';
import * as locales from 'src/content/locale';
import Header from 'src/components/Header';
import AppContainer from 'src/components/AppContainer';
import Footer from 'src/components/Footer';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const { locale, defaultLocale } = router;
  const messages = locales[(locale ?? 'pt') as keyof typeof locales];

  const { value: isDark } = useDarkMode();

  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Bruno Fernandes</title>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link href="/globals.css" rel="stylesheet" />
      </Head>
      <IntlProvider
        locale={locale ?? 'pt'}
        defaultLocale={defaultLocale}
        messages={messages}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppContainer>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </AppContainer>
        </ThemeProvider>
      </IntlProvider>
    </>
  );
};

export default MyApp;
