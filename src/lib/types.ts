import { RiotAPI, RiotAPITypes, PlatformId } from '@fightmegg/riot-api';

export type userData = {
  name: string | undefined;
  iconId: number | undefined;
  level: number | undefined;
};

export type matchData = {
  history: RiotAPITypes.MatchV5.MatchDTO[] | undefined;
};
