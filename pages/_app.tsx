import type { AppProps } from 'next/app'

// 1. import `NextUIProvider` component
import { NextUIProvider } from '@nextui-org/react';

import '../styles/globals.css'
import { darkTheme } from '../themes';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={ darkTheme }>
      <Component {...pageProps} />
    </NextUIProvider>
  );
};

export default MyApp;
