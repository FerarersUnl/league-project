import router from 'next/router';
import { RiotAPI, RiotAPITypes, PlatformId } from '@fightmegg/riot-api';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  Image,
  Card,
  CardBody,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react';
import { useState } from 'react';
import Link from 'next/link';
import getSummonerSpellImage from '@/lib/getSummonerSpell';

type userData = {
  name: string | undefined;
  iconId: number | undefined;
  level: number | undefined;
};

type matchData = {
  history: RiotAPITypes.MatchV5.MatchDTO[] | undefined;
};

function formatDuration(durationSeconds: number): string {
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = durationSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}

export default function UserName({
  data,
  match,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const matchData = match.history?.map((match, i) => {
    const mainSummoner = match.info.participants.findIndex(
      (participant) => participant.summonerName === data.name
    );
    const wasWin = match.info.participants[mainSummoner].win;
    const mainChampion = match.info.participants[mainSummoner].championName;
    const summonerSpells = [
      match.info.participants[mainSummoner].summoner1Id,
      match.info.participants[mainSummoner].summoner2Id,
    ];
    const kda = `${match.info.participants[mainSummoner].kills}/${match.info.participants[mainSummoner].deaths}/${match.info.participants[mainSummoner].assists}`;

    return (
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        variant="outline"
        bg={wasWin ? 'rgba(220, 38, 38, .25)' : 'rgba(66, 153, 225, .25)'}
        borderColor={wasWin ? 'red.500' : 'blue.500'}
        borderWidth="3px"
        p={5}
        key={i}
      >
        <Stack>
          <Image
            borderRadius="full"
            objectFit="cover"
            boxSize="120px"
            src={`http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/${mainChampion}.png`}
            alt={mainChampion}
          />
          <Text textAlign={'center'} fontSize="2xl">
            {mainChampion}
          </Text>
          <Stack direction={'row'} justifyContent={'center'}>
            <Image
              src={`http://ddragon.leagueoflegends.com/cdn/12.6.1/img/spell/${getSummonerSpellImage(
                summonerSpells[0]
              )}.png`}
              boxSize="40px"
              alt={getSummonerSpellImage(summonerSpells[0])}
            />
            <Image
              src={`http://ddragon.leagueoflegends.com/cdn/12.6.1/img/spell/${getSummonerSpellImage(
                summonerSpells[1]
              )}.png`}
              boxSize="40px"
              alt={getSummonerSpellImage(summonerSpells[1])}
            />
          </Stack>
          <Text textAlign={'center'} fontSize="xl">
            {kda}
          </Text>
        </Stack>

        <Stack>
          <CardBody>
            <Heading size="md">Partida {i + 1}</Heading>
            <Text py={'2'}>
              Duración de partida: {formatDuration(match.info.gameDuration)}
            </Text>
            <TableContainer>
              <Table size={'sm'}>
                <Tbody>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Tr key={i}>
                      {[
                        match.info.participants[i],
                        match.info.participants[i + 5],
                      ].map((participant, j) => (
                        <Td borderColor={'white'} key={j}>
                          <Link href={`/user/${participant.summonerName}`}>
                            {participant.summonerName}
                          </Link>
                        </Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Stack>
      </Card>
    );
  });

  const [username, setUsername] = useState('');

  const handleUser = () => {
    router.push(`/user/${username}`);
  };

  const handleUserEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      router.push(`/user/${username}`);
    }
  };

  const handleUserClick = (e: React.MouseEvent) => {
    router.push(`/user/${username}`);
  };

  return (
    <Container maxW={'7xl'} p="12">
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Conoce los detalles de{' '}
          <Text as={'span'} color={'#4a81ca'}>
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
        <Image
          borderRadius="full"
          boxSize="150px"
          src={`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/profileicon/${data.iconId}.png`}
        />
        <Text fontSize="2xl">Nivel {data.level}</Text>
      </Stack>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
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
