import {
    Box,
    Button,
    chakra,
    Container,
    Stack,
    Text,
    useColorMode,
    useColorModeValue,
    VisuallyHidden,
} from "@chakra-ui/react";
import styles from "./Footer.module.css";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ReactNode } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Image from "next/image";

const LogoLetters = () => (
    <Box>
        <Image
            priority
            src="/logoLetters.svg"
            width={100}
            height={100}
            alt="LatamVortex"
        />
    </Box>
);

const SocialButton = ({
    children,
    label,
    href,
}: {
    children: ReactNode;
    label: string;
    href: string;
}) => {
    return (
        <chakra.button
            bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
            rounded={"full"}
            w={8}
            h={8}
            cursor={"pointer"}
            as={"a"}
            href={href}
            display={"inline-flex"}
            alignItems={"center"}
            justifyContent={"center"}
            transition={"background 0.3s ease"}
            _hover={{
                bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
            }}
        >
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

export default function FooterBar() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Box
            bg={useColorModeValue("gray.50", "gray.900")}
            color={useColorModeValue("gray.700", "gray.200")}
        >
            <Container
                as={Stack}
                maxW={"6xl"}
                py={4}
                direction={{ base: "column", md: "row" }}
                spacing={4}
                justify={{ base: "center", md: "space-between" }}
                align={{ base: "center", md: "center" }}
            >
                <Stack direction={"row"} spacing={6} alignItems={"center"}>
                    <LogoLetters />
                    <Text>
                        © {new Date().getFullYear()} LatamVortex. Todos los
                        derechos reservados.
                    </Text>
                </Stack>
                <Stack direction={"row"} spacing={6} alignItems={"center"}>
                    <SocialButton label={"Twitter"} href={"#"}>
                        <FaTwitter />
                    </SocialButton>
                    <SocialButton label={"YouTube"} href={"#"}>
                        <FaYoutube />
                    </SocialButton>
                    <SocialButton label={"Instagram"} href={"#"}>
                        <FaInstagram />
                    </SocialButton>
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
}
