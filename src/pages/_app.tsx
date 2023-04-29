import Script from 'next/script';
import './styles.css';
import Header from '@/components/NavBar';
import FooterBar from '@/components/Footer';
import theme from '../theme';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7371462935139459"
        crossOrigin="anonymous"
      ></Script>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <Header />
          <Component {...pageProps} />
          <FooterBar />
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}
