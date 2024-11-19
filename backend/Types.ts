export interface Player {
  name: string;
  id: number;
}
export interface Game {
  Player1?: Player;
  Player2?: Player;
  BoardId: number;
}
export type GameArray = Game[];
