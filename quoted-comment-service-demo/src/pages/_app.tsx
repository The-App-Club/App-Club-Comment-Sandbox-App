import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import '@fontsource/inter'
import '@fontsource/noto-sans-jp'
import '@fontsource/radio-canada'
import '@fontsource/kosugi'
import '@fontsource/merriweather'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
