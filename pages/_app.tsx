import type { AppProps } from 'next/app';
import '../styles/globals.css';

import store from '@/redux/store';
import { Provider } from 'react-redux';

import { NextUIProvider } from '@nextui-org/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </Provider>
  );
}

export default MyApp;
