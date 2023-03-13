import { useRouter } from "next/router";
import Link from "next/link";
import {
    Container,
    Stack,
    Flex,
    Box,
    Heading,
    Text,
    Button,
    Image,
    Icon,
    IconProps,
    useColorModeValue,
    InputRightElement,
    InputGroup,
    Input,
    GridItem,
    chakra,
    Grid,
    Divider,
    VStack,
    SimpleGrid,
} from "@chakra-ui/react";
import { useState, ReactElement } from "react";
import { FcNext } from "react-icons/fc";
import type { NextPage } from "next";

interface RoadMap {
    heading: string;
    text: string;
}

interface About {
    title: string;
    text: string;
    icon: ReactElement;
}

const FeatureRoad = ({ heading, text }: RoadMap) => {
    return (
        <GridItem>
            <chakra.h3 fontSize="xl" fontWeight="600">
                {heading}
            </chakra.h3>
            <chakra.p>{text}</chakra.p>
        </GridItem>
    );
};

const FeatureAbout = ({ title, text, icon }: About) => {
    return (
        <Stack>
            <Flex
                w={16}
                h={16}
                align={"center"}
                justify={"center"}
                color={"white"}
                rounded={"full"}
                bg={"gray.100"}
                mb={1}
            >
                {icon}
            </Flex>
            <Text fontWeight={600}>{title}</Text>
            <Text color={"gray.600"}>{text}</Text>
        </Stack>
    );
};

export const Blob = (props: IconProps) => {
    return (
        <Icon
            width={"100%"}
            viewBox="0 0 578 440"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
                fill="currentColor"
            />
        </Icon>
    );
};

const Home: NextPage = () => {
    const router = useRouter();
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
        <Container maxW={"7xl"}>
            <Stack
                align={"center"}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}
                direction={{ base: "column", md: "row" }}
            >
                <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                    <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
                    >
                        <Text
                            as={"span"}
                            position={"relative"}
                            _after={{
                                content: "''",
                                width: "full",
                                height: "30%",
                                position: "absolute",
                                bottom: 1,
                                left: 0,
                                bg: "#4a81ca",
                                zIndex: -1,
                            }}
                        >
                            El buscador de LoL,
                        </Text>
                        <br />
                        <Text as={"span"} color={"#4a81ca"}>
                            para LATAM
                        </Text>
                    </Heading>
                    <Text color={"gray.500"}>
                        Encuentra el historial de tu perfil, las últimas runas,
                        las habilidades de tus personajes favoritos, los
                        hechizos de invocador, las últimas noticias y guías,
                        todo en un sitio. Dedicado exclusivamente para LATAM.
                    </Text>
                    <Stack
                        spacing={{ base: 4, sm: 6 }}
                        direction={{ base: "column", sm: "row" }}
                    >
                        <Link href="#more">
                            <Button
                                rounded={"full"}
                                size={"lg"}
                                fontWeight={"normal"}
                                px={6}
                                colorScheme={"blue"}
                                bg={"#4a81ca"}
                                _hover={{ bg: "#72abe6" }}
                            >
                                Conoce más
                            </Button>
                        </Link>
                        <Link href="#functional">
                            <Button
                                rounded={"full"}
                                size={"lg"}
                                fontWeight={"normal"}
                                px={6}
                            >
                                ¿Cómo fúnciona?
                            </Button>
                        </Link>
                    </Stack>
                </Stack>
                <Flex
                    flex={1}
                    justify={"center"}
                    align={"center"}
                    position={"relative"}
                    w={"full"}
                >
                    <Blob
                        w={"150%"}
                        h={"150%"}
                        position={"absolute"}
                        top={"-20%"}
                        left={0}
                        zIndex={-1}
                        color={useColorModeValue("#4a81ca", "#72abe6")}
                    />
                    <Box
                        position={"relative"}
                        height={"300px"}
                        rounded={"2xl"}
                        boxShadow={"2xl"}
                        width={"full"}
                        overflow={"hidden"}
                    >
                        <Image
                            alt={"LeagueClient"}
                            fit={"cover"}
                            align={"center"}
                            w={"100%"}
                            h={"100%"}
                            src={"/images/leagueclient.png"}
                        />
                    </Box>
                </Flex>
            </Stack>
            <Box p={4} id="functional">
                <chakra.h2
                    fontSize="3xl"
                    fontWeight="700"
                    textAlign={"center"}
                    p={15}
                >
                    ¿Como fúnciona?
                </chakra.h2>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                    <FeatureAbout
                        icon={<Icon as={FcNext} w={10} h={10} />}
                        title={"Busqueda de datos"}
                        text={
                            "Tomamos los datos que nos brindas para solicitarlos al API de Riot Games"
                        }
                    />
                    <FeatureAbout
                        icon={<Icon as={FcNext} w={10} h={10} />}
                        title={"Analísis de usuario"}
                        text={
                            "En base a los datos obtenidos hacemos un analisís con diversos algoritmos para conocer tu modo de juego"
                        }
                    />
                    <FeatureAbout
                        icon={<Icon as={FcNext} w={10} h={10} />}
                        title={"Muestra de los resultados"}
                        text={
                            "Te mostramos el resultado final con el historial de partidas y diversas tecnicas que podrían serte de utilidad"
                        }
                    />
                </SimpleGrid>
            </Box>
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
                        posible buscar un invocador a la vez pero estamos
                        trabajando para un mejor sistema en futuras
                        actualizaciones, ¡estén atentos!
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
            </Container>
            <Box as={Container} maxW="7xl" mt={14} p={4} id="more">
                <Grid
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(2, 1fr)",
                    }}
                    gap={4}
                >
                    <GridItem colSpan={1}>
                        <VStack alignItems="flex-start" spacing="20px">
                            <chakra.h2 fontSize="3xl" fontWeight="700">
                                Roadmap
                            </chakra.h2>
                            <chakra.p>
                                ¿Tienes alguna duda o sugerencia?
                            </chakra.p>
                            <Button size="md">
                                <a
                                    href="mailto:ferarersunl@hotmail.com?Subject=Interesado%20en%20el%20sistema"
                                    target={"_blank"}
                                >
                                    Contactame
                                </a>
                            </Button>
                        </VStack>
                    </GridItem>
                    <GridItem>
                        <Flex>
                            <chakra.p>
                                Este proyecto nacio como un reto personal para
                                superarme en el ámbito que más me interesa.
                                Estaremos constantemente actualizando el sistema
                                para que después puedas encontrar mas
                                información, conseguir tips y counterpicks, e
                                incluso se puedan publicar momentos divertidos
                                que te hayan ocurrido durante una partida.
                            </chakra.p>
                        </Flex>
                    </GridItem>
                </Grid>
                <Divider mt={12} mb={12} />

                <Grid
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(4, 1fr)",
                    }}
                    gap={{ base: "8", sm: "12", md: "16" }}
                >
                    <FeatureRoad
                        heading={"Primera Fase"}
                        text={
                            "Implementación de la busqueda de personas y recopilación de datos de invocador."
                        }
                    />
                    <FeatureRoad
                        heading={"Segunda Fase"}
                        text={
                            "Implementación de busqueda de partida, counterpicks disponibles para el contrarrestar al adversario."
                        }
                    />
                    <FeatureRoad
                        heading={"Tercera Fase"}
                        text={
                            "Implementación de guías de personajes, recopilación de runas y ítemización."
                        }
                    />
                    <FeatureRoad
                        heading={"Cuarta Fase"}
                        text={
                            "Implementación de posts de mejores/divertidas jugadas en foros."
                        }
                    />
                </Grid>
                <br />
            </Box>
        </Container>
    );
};

export default Home;
