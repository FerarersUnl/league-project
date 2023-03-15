import { NextPage } from "next";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface Props {}

const SignIn: NextPage = (props) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Inicia sesión
                    </Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        para conocer más sobre tu juego 🎮
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <HStack>
                            <Box>
                                <FormControl id="Nombre" isRequired>
                                    <FormLabel>Nombre</FormLabel>
                                    <Input type="text" />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="lastName">
                                    <FormLabel>Apellido</FormLabel>
                                    <Input type="text" />
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="summoner" isRequired>
                            <FormLabel>Nombre de Invocador</FormLabel>
                            <Input type="text" />
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Correo electronico</FormLabel>
                            <Input type="email" />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Contraseña</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                />
                                <InputRightElement h={"full"}>
                                    <Button
                                        variant={"ghost"}
                                        onClick={() =>
                                            setShowPassword(
                                                (showPassword) => !showPassword
                                            )
                                        }
                                    >
                                        {showPassword ? (
                                            <ViewIcon />
                                        ) : (
                                            <ViewOffIcon />
                                        )}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={"blue.400"}
                                color={"white"}
                                type="submit"
                                _hover={{
                                    bg: "blue.500",
                                }}
                            >
                                Registrarse
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={"center"}>
                                Ya eres usuario?{" "}
                                <Link color={"blue.400"}>Inicia Sesión</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default SignIn;
