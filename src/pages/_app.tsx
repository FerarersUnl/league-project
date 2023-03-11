import Header from "@/components/NavBar";
import FooterBar from '@/components/Footer';
import theme from "../theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from 'next/app';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
      <FooterBar />
    </ChakraProvider>
  )
}
