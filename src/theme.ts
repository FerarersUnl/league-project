import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: true,
};

const theme = extendTheme({
    config,
    colors: {
        LatamVortex: {
            100: "#4a81ca",
            300: "#72abe6",
            500: "#99c1ea",
            700: "#c1d7ee",
            900: "#e9eef3",
        },
    },
});

export default theme;
