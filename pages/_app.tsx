import type { AppProps } from 'next/app';
import '../styles/globals.css';

import store from '@/redux/store';
import { Provider } from 'react-redux';

import { DarkTheme, LightTheme } from '@/styles/themes';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NextThemesProvider
        defaultTheme='system'
        attribute='class'
        value={{
          light: LightTheme.className,
          dark: DarkTheme.className,
        }}
      >
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </NextThemesProvider>
    </Provider>
  );
}

export default MyApp;
