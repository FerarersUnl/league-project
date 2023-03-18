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
        <Stack key={i}>
            <Text fontSize="2xl">Partida número {i + 1}</Text>
            <Text fontSize="xl">
                Duración de partida: {formatDuration(match.info.gameDuration)}
            </Text>
        </Stack>
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
            <Stack py={{ base: 20, md: 28 }}>
                <Box>
                    <Heading as="h1">Información de {data.name}</Heading>
                    <Text fontSize="2xl">Nivel {data.level}</Text>
                </Box>
            </Stack>
            {matchData}
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
