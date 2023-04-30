import { RiotAPI, RiotAPITypes, PlatformId } from '@fightmegg/riot-api';

export type userData = {
  name: string | undefined;
  iconId: number | undefined;
  level: number | undefined;
  isComplete: boolean;
};

export type userStats = {
  statistics: RiotAPITypes.League.LeagueEntryDTO[] | undefined;
};

export type matchData = {
  history: RiotAPITypes.MatchV5.MatchDTO[] | undefined;
};
