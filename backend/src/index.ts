import express from "express";
import ws from "ws";
import { Game } from "./Types/Types";
import { handleConnection } from "./wsHandlers/handleConnection";

// let Players: GameCollection = new Set();

export const Game1: Game = {
  //   Player1: { name: "Player1", id: 1 },
  //   Player2: { name: "Player2", id: 2 },
  BoardId: 1,
  Board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  turn: "O",
};

const app = express();

const server = app.listen(3000, () => {
  console.log("Server started on port %s", 3000);
});

const wss = new ws.Server({ server });

wss.on("connection", (Socket) => {
  // The logic to handle the connection goes here
  handleConnection(Socket, wss);

  // A welcome message from the server
  if (Socket.readyState === ws.OPEN) {
    Socket.send("Server Connected!");
  }
});
