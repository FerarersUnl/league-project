import { RiotAPI, RiotAPITypes, PlatformId } from '@fightmegg/riot-api';
import SearchBarUser from '@/components/SearchBarUser';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {
  Container,
  Heading,
  Stack,
  Text,
  Image,
  Card,
  CardBody,
  SimpleGrid,
  Box,
} from '@chakra-ui/react';
import Link from 'next/link';
import { userData, matchData } from '@/lib/types';
import { getSummonerSpell } from '@/utils/getSummonerSpell';
import { formatDuration } from '@/utils/formatDuration';
import { formatTimePassed } from '@/utils/formatTimePassed';
import { getGamemode } from '@/utils/getGamemode';

export default function UserName({
  data,
  match,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const version = '13.8.1';
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
    const summonerItems = [
      match.info.participants[mainSummoner].item0,
      match.info.participants[mainSummoner].item1,
      match.info.participants[mainSummoner].item2,
      match.info.participants[mainSummoner].item3,
      match.info.participants[mainSummoner].item4,
      match.info.participants[mainSummoner].item5,
      match.info.participants[mainSummoner].item6,
    ];

    return (
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        variant="outline"
        bg={wasWin ? 'rgba(66, 153, 225, .25)' : 'rgba(220, 38, 38, .25)'}
        borderColor={wasWin ? 'blue.500' : 'red.500'}
        borderWidth="3px"
        p={5}
        key={i}
      >
        <Stack
          bg={wasWin ? 'blue.500' : 'red.500'}
          rounded={'md'}
          p={5}
          alignContent={'center'}
          alignItems={'center'}
        >
          <Text textAlign={'center'} fontSize="xl">
            {mainChampion}
          </Text>
          <Image
            borderRadius="full"
            objectFit="cover"
            boxSize={'60px'}
            src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${mainChampion}.png`}
            alt={mainChampion}
          />

          <Stack direction={'row'} justifyContent={'center'}>
            <Image
              src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${getSummonerSpell(
                summonerSpells[0]
              )}.png`}
              boxSize="40px"
              alt={getSummonerSpell(summonerSpells[0])}
            />
            <Image
              src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${getSummonerSpell(
                summonerSpells[1]
              )}.png`}
              boxSize="40px"
              alt={getSummonerSpell(summonerSpells[1])}
            />
          </Stack>
          <Text textAlign={'center'} fontSize="md">
            {formatTimePassed(match.info.gameCreation)}
            <br />
            {kda} KDA
          </Text>
        </Stack>
        <Stack>
          <CardBody>
            <Heading size="md">
              Partida {i + 1} - {getGamemode(match.info.gameMode)}
            </Heading>
            <Heading size={'sm'} py={'2'}>
              Duración de partida: {formatDuration(match.info.gameDuration)} -{' '}
              {wasWin ? 'Victoria' : 'Derrota'}
            </Heading>
            <SimpleGrid columns={2} spacing={1}>
              {Array.from({ length: 5 }).map((_, i) => (
                <>
                  <Box fontSize={'small'}>
                    <Link
                      href={`/user/${match.info.participants[i].summonerName}`}
                    >
                      {match.info.participants[i].summonerName}
                    </Link>
                  </Box>
                  <Box fontSize={'small'}>
                    <Link
                      href={`/user/${
                        match.info.participants[i + 5].summonerName
                      }`}
                    >
                      {match.info.participants[i + 5].summonerName}
                    </Link>
                  </Box>
                </>
              ))}
            </SimpleGrid>
            <Stack
              direction={'row'}
              justifyContent={'center'}
              spacing={1}
              mt={3}
            >
              {summonerItems.map((item, i) => (
                <Image
                  src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item}.png`}
                  boxSize="40px"
                  key={i}
                  rounded="md"
                  onError={(
                    e: React.SyntheticEvent<HTMLImageElement, Event>
                  ) => {
                    e.currentTarget.src =
                      'https://www.colorhexa.com/3182ce.png';
                  }}
                  alt="No image"
                />
              ))}
            </Stack>
          </CardBody>
        </Stack>
      </Card>
    );
  });

  return (
    <Container maxW={'7xl'} p="12">
      <SearchBarUser />
      <Stack py={{ base: 20, md: 10 }}>
        <Heading>Información de {data.name}</Heading>
        <Image
          borderRadius="full"
          boxSize="150px"
          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${data.iconId}.png`}
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
