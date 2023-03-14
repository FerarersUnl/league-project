import {
    Button,
    Container,
    Flex,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    Image,
    Box,
    useColorModeValue,
    Icon,
} from "@chakra-ui/react";

import { FcAbout, FcAdvance, FcApproval } from "react-icons/fc";

import { NextPage } from "next";
import { useState } from "react";
import { ReactElement } from "react";
import router from "next/router";

interface CardProps {
    heading: string;
    description: string;
    icon: ReactElement;
    href: string;
}

const Card = ({ heading, description, icon, href }: CardProps) => {
    return (
        <Box
            maxW={{ base: "full", md: "275px" }}
            w={"full"}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={5}
        >
            <Stack align={"start"} spacing={2}>
                <Flex
                    w={16}
                    h={16}
                    align={"center"}
                    justify={"center"}
                    color={"white"}
                    rounded={"full"}
                    bg={useColorModeValue("gray.100", "gray.700")}
                >
                    {icon}
                </Flex>
                <Box mt={2}>
                    <Heading size="md">{heading}</Heading>
                    <Text mt={1} fontSize={"sm"}>
                        {description}
                    </Text>
                </Box>
            </Stack>
        </Box>
    );
};

const User: NextPage = () => {
    const [username, setUsername] = useState("");

    const handleUser = () => {
        router.push(`/user/${username}`);
    };

    const handleUserEnter = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            router.push(`/user/${username}`);
        }
    };

    return (
        <Container maxW={"5xl"}>
            <Stack
                textAlign={"center"}
                align={"center"}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}
            >
                <Heading
                    fontWeight={600}
                    fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
                    lineHeight={"110%"}
                >
                    Conoce los detalles de{" "}
                    <Text as={"span"} color={"#4a81ca"}>
                        tu usuario
                    </Text>
                </Heading>
                <Text color={"gray.500"} maxW={"3xl"}>
                    Introduce tu nombre de invocador, por el momento solo es
                    posible buscar un invocador a la vez pero estamos trabajando
                    para un mejor sistema en futuras actualizaciones, ¡estén
                    atentos!
                </Text>
                <InputGroup>
                    <Input
                        placeholder="Nombre"
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.currentTarget.value);
                        }}
                        onKeyDown={handleUserEnter}
                    />
                    <InputRightElement width="4.5rem">
                        <Button onClick={handleUser}>Buscar</Button>
                    </InputRightElement>
                </InputGroup>

                <Flex
                    w={"full"}
                    alignContent={"center"}
                    alignItems={"center"}
                    textAlign={"center"}
                >
                    <Image
                        alt={"LeagueClient"}
                        fit={"cover"}
                        align={"center"}
                        margin={"auto"}
                        w={"25%"}
                        h={"25%"}
                        src={"/logo.svg"}
                    />
                </Flex>
            </Stack>
            <Box p={4}>
                <Stack
                    spacing={4}
                    as={Container}
                    maxW={"3xl"}
                    textAlign={"center"}
                >
                    <Heading
                        fontSize={{ base: "2xl", sm: "4xl" }}
                        fontWeight={"bold"}
                    >
                        Pasos a seguir
                    </Heading>
                    <Text
                        color={"gray.600"}
                        fontSize={{ base: "sm", sm: "lg" }}
                    >
                        Si no conoces la forma en la que opera nuestro sitio, te
                        lo explicamos a continuación.
                    </Text>
                </Stack>

                <Container maxW={"5xl"} mt={12}>
                    <Flex flexWrap="wrap" gridGap={6} justify="center">
                        <Card
                            heading={"Solicitud"}
                            icon={<Icon as={FcAbout} w={10} h={10} />}
                            description={
                                "Necesitas introducir tu usuario en la casilla superior, después tienes que presionar enter o darle click al boton"
                            }
                            href={"#"}
                        />
                        <Card
                            heading={"Busqueda"}
                            icon={<Icon as={FcAdvance} w={10} h={10} />}
                            description={
                                "Hacemos una busqueda con tu informacion brindada en los sistemas de Riot Games."
                            }
                            href={"#"}
                        />
                        <Card
                            heading={"Resultado"}
                            icon={<Icon as={FcApproval} w={10} h={10} />}
                            description={
                                "Mostramos la información obtenida por los servidores de Riot Games y te damos analísis de jugadas."
                            }
                            href={"#"}
                        />
                    </Flex>
                </Container>
            </Box>
            <br />
        </Container>
    );
};

export default User;
