import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

import { AuthProvider } from '../components/contexts/authContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
