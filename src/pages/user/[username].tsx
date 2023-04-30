import { RiotAPI, RiotAPITypes, PlatformId } from '@fightmegg/riot-api';
import SearchBarUser from '@/components/SearchBarUser';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {
  Container,
  Heading,
  Stack,
  Text,
  Image,
  SimpleGrid,
} from '@chakra-ui/react';
import { userData, matchData, userStats } from '@/interfaces/types';
import { version } from '@/constants/constants';
import Cards from '@/components/Cards';

export default function UserName({
  data,
  match,
  stats,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
      <Stack alignItems={'center'} pb={5}>
        <Text fontSize="3xl" fontWeight={'bold'}>
          Últimas 10 partidas
        </Text>
      </Stack>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
      >
        <Cards match={match} data={data} />
      </SimpleGrid>
    </Container>
  );
}

// =================== Server Side =========================== //

export const getServerSideProps: GetServerSideProps<{
  data: userData;
  match: matchData;
  stats: userStats;
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

  const summonerInfo = await rAPI.league.getEntriesBySummonerId({
    region: PlatformId.LA1,
    summonerId: summoner.id,
  });

  const data: userData = {
    name: summoner.name,
    iconId: summoner.profileIconId,
    level: summoner.summonerLevel,
    isComplete: true,
  };

  const match: matchData = {
    history: totalMatches,
  };

  const stats: userStats = {
    statistics: summonerInfo,
  };

  return {
    props: {
      data,
      match,
      stats,
    },
  };
};
