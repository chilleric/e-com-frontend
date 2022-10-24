import type { AppProps } from 'next/app';
import '../styles/globals.css';

import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';

import createEmotionCache from '@/utils/mui/EmotionCache';

import store from '@/redux/store';
import { MyLightThemes } from '@/styles/themes/MyThemes';
import { Provider } from 'react-redux';

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps }: AppProps) {
  const emotionCache = clientSideEmotionCache;

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={MyLightThemes}>
          <Component {...pageProps} />
          <CssBaseline />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

export default MyApp;
