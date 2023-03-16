import "./styles.css";
import Header from "@/components/NavBar";
import FooterBar from "@/components/Footer";
import theme from "../theme";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <SessionProvider session={session}>
            <ChakraProvider theme={theme}>
                <Header />
                <Component {...pageProps} />
                <FooterBar />
            </ChakraProvider>
        </SessionProvider>
    );
}
