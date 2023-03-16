import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";

export default function SimpleCard() {
    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>
                        Inicia sesión en tu cuenta
                    </Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        para disfrutar de beneficios{" "}
                        <Link color={"blue.400"}>extra</Link> ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Correo electronico</FormLabel>
                            <Input type="email" />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Contraseña</FormLabel>
                            <Input type="password" />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: "column", sm: "row" }}
                                align={"start"}
                                justify={"space-between"}
                            >
                                <Checkbox>Recordar usuario</Checkbox>
                                <Link color={"blue.400"}>
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </Stack>
                            <Stack
                                direction={{ base: "row", sm: "column" }}
                                align={"center"}
                                justify={"space-between"}
                            >
                                <Button
                                    bg={"blue.400"}
                                    color={"white"}
                                    _hover={{
                                        bg: "blue.500",
                                    }}
                                    w={"350px"}
                                >
                                    Iniciar sesión
                                </Button>
                                <Button
                                    bg={"#36393e"}
                                    color={"white"}
                                    _hover={{
                                        bg: "#424549",
                                    }}
                                    onClick={() => signIn("discord")}
                                    w={"350px"}
                                >
                                    Iniciar sesión con Discord
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
