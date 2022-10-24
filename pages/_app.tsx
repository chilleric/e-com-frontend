import type { AppProps } from 'next/app';
import '../styles/globals.css';

import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';

import createEmotionCache from '@/utils/mui/EmotionCache';

import { MyLightThemes } from '@/styles/themes/MyThemes';

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps }: AppProps) {
  const emotionCache = clientSideEmotionCache;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={MyLightThemes}>
        <Component {...pageProps} />
        <CssBaseline />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
