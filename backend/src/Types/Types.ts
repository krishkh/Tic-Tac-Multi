import { WebSocket } from "ws";

export interface Player {
  name: string;
  id: number;
  socket: WebSocket;
}

export type Inputs = null | "X" | "O";
export type GameBoard = Inputs[][];
export interface Game {
  Player1?: Player;
  Player2?: Player;
  BoardId: number;
  Board: GameBoard;
  turn: "X" | "O";
}

export type GameCollection = Set<Game>;
export interface MessageType {
  type: string;
  body?: { message?: string; move?: [number, number]; name?: string };
}
export type WinResult = null | "X" | "O" | false;
