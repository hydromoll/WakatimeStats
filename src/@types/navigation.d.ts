import { User } from "./user";

export type RootStackParamList = {
  auth: undefined;
  home: undefined;
  stats: User;
  home: undefined;
  settings: undefined;
  leaderBoards: undefined;
  leaderBoard: { id: string; name: string };
};
