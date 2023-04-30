import { getSummonerSpell } from '@/utils/getSummonerSpell';
import { formatDuration } from '@/utils/formatDuration';
import { formatTimePassed } from '@/utils/formatTimePassed';
import { getGamemode } from '@/utils/getGamemode';
import Link from 'next/link';
import {
  Card,
  CardBody,
  Box,
  Stack,
  Text,
  Image,
  SimpleGrid,
  Heading,
} from '@chakra-ui/react';
import { matchData, userData, userStats } from '@/interfaces/types';
import { version } from '@/constants/constants';

type CardsProps = {
  match: matchData;
  data: userData;
};

const Cards = ({ match, data }: CardsProps) => {
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
              rounded="md"
              alt={getSummonerSpell(summonerSpells[0])}
            />
            <Image
              src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${getSummonerSpell(
                summonerSpells[1]
              )}.png`}
              boxSize="40px"
              rounded="md"
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
              {summonerItems.map((item, i) =>
                wasWin ? (
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
                  />
                ) : (
                  <Image
                    src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item}.png`}
                    boxSize="40px"
                    key={i}
                    rounded="md"
                    onError={(
                      e: React.SyntheticEvent<HTMLImageElement, Event>
                    ) => {
                      e.currentTarget.src =
                        'https://www.colorhexa.com/E53E3E.png';
                    }}
                  />
                )
              )}
            </Stack>
          </CardBody>
        </Stack>
      </Card>
    );
  });
  return <>{matchData}</>;
};

export default Cards;
