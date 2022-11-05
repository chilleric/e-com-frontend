import { AuthLayout } from '@/components/layout/AuthLayout'
// import { NextUiProviderTheme } from '@/components/layout/NextUiProviderTheme'
import store from '@/redux/store'
import type { AppProps } from 'next/app'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {/* <NextUiProviderTheme> */}
      <CookiesProvider>
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      </CookiesProvider>
      {/* </NextUiProviderTheme> */}
    </Provider>
  )
}

export default MyApp
