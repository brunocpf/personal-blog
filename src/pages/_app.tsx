import { AppProps } from 'next/app';
import Head from 'next/head';
import { lightTheme, darkTheme } from 'src/util/theme';
import {
  CssBaseline,
  ThemeProvider,
  StyledEngineProvider,
  Theme,
} from '@mui/material';
import useDarkMode from 'use-dark-mode';
import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';
import * as locales from 'src/content/locale';
import Header from 'src/components/Header';
import AppContainer from 'src/components/AppContainer';
import Footer from 'src/components/Footer';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from 'src/util/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp: React.FC<MyAppProps> = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) => {
  const router = useRouter();
  const { locale, defaultLocale } = router;
  const messages = locales[(locale ?? 'pt') as keyof typeof locales];

  const { value: isDark } = useDarkMode();

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Bruno Fernandes</title>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link href="/globals.css" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </Head>
      <IntlProvider
        locale={locale ?? 'pt'}
        defaultLocale={defaultLocale}
        messages={messages}
      >
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppContainer>
              <Header />
              <Component {...pageProps} />
              <Footer />
            </AppContainer>
          </ThemeProvider>
        </StyledEngineProvider>
      </IntlProvider>
    </CacheProvider>
  );
};

export default MyApp;
