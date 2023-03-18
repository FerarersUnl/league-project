import router, { useRouter } from "next/router";
import { RiotAPI, RiotAPITypes, PlatformId } from "@fightmegg/riot-api";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
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
    Badge,
    Center,
    Link,
    filter,
    Card,
    CardBody,
    CardFooter,
    SimpleGrid,
    Grid,
    GridItem,
    CardHeader,
    Tfoot,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { useState } from "react";

type userData = {
    name: string | undefined;
    iconId: number | undefined;
    level: number | undefined;
};

type matchData = {
    history: RiotAPITypes.MatchV5.MatchDTO[] | undefined;
};

interface matchInformation {
    matchNumber: number;
    matchTime: string;
}

function formatDuration(durationSeconds: number): string {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = durationSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
}

export default function UserName({
    data,
    match,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const matchData = match.history?.map((match, i) => (
        <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            p={5}
        >
            <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt="Caffe Latte"
            />
            <Stack key={i}>
                <CardBody>
                    <Heading size="md">Partida número {i + 1}</Heading>
                    <Text py={"2"}>
                        Duración de partida:{" "}
                        {formatDuration(match.info.gameDuration)}
                    </Text>
                    <TableContainer>
                        <Table size={"sm"}>
                            <Tbody>
                                <Tr>
                                    <Td>Summoner 1</Td>
                                    <Td>Summoner 6</Td>
                                </Tr>
                                <Tr>
                                    <Td>Summoner 2</Td>
                                    <Td>Summoner 7</Td>
                                </Tr>
                                <Tr>
                                    <Td>Summoner 3</Td>
                                    <Td>Summoner 8</Td>
                                </Tr>
                                <Tr>
                                    <Td>Summoner 4</Td>
                                    <Td>Summoner 9</Td>
                                </Tr>
                                <Tr>
                                    <Td>Summoner 5</Td>
                                    <Td>Summoner 10</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </CardBody>
            </Stack>
        </Card>
    ));

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
        <Container maxW={"7xl"} p="12">
            <Stack
                textAlign={"center"}
                align={"center"}
                spacing={{ base: 8, md: 10 }}
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
            </Stack>
            <Stack py={{ base: 20, md: 10 }}>
                <Heading>Información de {data.name}</Heading>
                <Text fontSize="2xl">Nivel {data.level}</Text>
            </Stack>
            <SimpleGrid
                spacing={4}
                templateColumns="repeat(auto-fill, minmax(580px, 1fr))"
            >
                {matchData}
            </SimpleGrid>
        </Container>
    );
}

// =================== Server Side =========================== //

export const getServerSideProps: GetServerSideProps<{
    data: userData;
    match: matchData;
}> = async (context) => {
    const user = context.query.username as string;
    const rAPI = new RiotAPI(process.env.RIOT_LOL_API_KEY!);

    const summoner: RiotAPITypes.Summoner.SummonerDTO =
        await rAPI.summoner.getBySummonerName({
            region: PlatformId.LA1,
            summonerName: user,
        });

    const history = await rAPI.matchV5.getIdsbyPuuid({
        cluster: PlatformId.AMERICAS,
        puuid: summoner.puuid,
        params: {
            start: 0,
            count: 10,
        },
    });

    const totalMatches = await Promise.all(
        history.map(async (matchID) => {
            return await rAPI.matchV5.getMatchById({
                cluster: PlatformId.AMERICAS,
                matchId: matchID,
            });
        })
    );

    const totalUsers = await Promise.all(
        totalMatches.map(async (users, i) => {
            return await rAPI.summoner.getByPUUID({
                region: PlatformId.LA1,
                puuid: users.metadata.participants[i],
            });
        })
    );
    console.log(totalUsers);

    const data: userData = {
        name: summoner.name,
        iconId: summoner.profileIconId,
        level: summoner.summonerLevel,
    };

    const match: matchData = {
        history: totalMatches,
    };

    return {
        props: {
            data,
            match,
        },
    };
};
