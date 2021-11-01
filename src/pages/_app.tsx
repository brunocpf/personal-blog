import { AppProps } from 'next/app';
import Head from 'next/head';
import { CssBaseline } from '@mui/material';
import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';
import * as locales from 'src/content/locale';
import Header from 'src/components/Header';
import AppContainer from 'src/components/AppContainer';
import Footer from 'src/components/Footer';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { createEmotionCache } from 'src/util/emotionCache';
import { ThemeProvider } from 'src/components/ThemeContext';

const clientSideEmotionCache = createEmotionCache();

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

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Bruno Fernandes</title>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="theme-color" content="#a91b1b" />
        <link href="/globals.css" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </Head>
      <IntlProvider
        locale={locale ?? 'pt'}
        defaultLocale={defaultLocale}
        messages={messages}
      >
        <ThemeProvider>
          <CssBaseline />
          <AppContainer>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </AppContainer>
        </ThemeProvider>
      </IntlProvider>
    </CacheProvider>
  );
};

export default MyApp;
