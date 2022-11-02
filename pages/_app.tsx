import { AuthLayout } from '@/components/layout/AuthLayout';
import store from '@/redux/store';
import { DarkTheme, LightTheme } from '@/styles/themes';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ToastContainer style={{ zIndex: 1000000 }} />
      <NextThemesProvider
        defaultTheme='system'
        attribute='class'
        value={{
          light: LightTheme.className,
          dark: DarkTheme.className,
        }}
      >
        <NextUIProvider>
          <CookiesProvider>
            <AuthLayout>
              <Component {...pageProps} />
            </AuthLayout>
          </CookiesProvider>
        </NextUIProvider>
      </NextThemesProvider>
    </Provider>
  );
}

export default MyApp;
