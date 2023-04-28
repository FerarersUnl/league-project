import {
    Stack,
    Container,
    Heading,
    Flex,
    Icon,
    Box,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { FcAbout, FcAdvance, FcApproval } from "react-icons/fc";

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

const TutorialSteps = () => {
    return (
        <Box p={4}>
            <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
                <Heading
                    fontSize={{ base: "2xl", sm: "4xl" }}
                    fontWeight={"bold"}
                >
                    Pasos a seguir
                </Heading>
                <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
                    Si no conoces la forma en la que opera nuestro sitio, te lo
                    explicamos a continuación.
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
            <br />
        </Box>
    );
};

export default TutorialSteps;
