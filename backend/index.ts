import express from "express";
import ws from "ws";
import { Game } from "./Types";

// let Players: GameArray = [];

let Game1: Game = {
  //   Player1: { name: "Player1", id: 1 },
  //   Player2: { name: "Player2", id: 2 },
  BoardId: 1,
};

const app = express();

const server = app.listen(3000, () => {
  console.log("Server started on port 3000 haha");
});

const wss = new ws.Server({ server });

wss.on("connection", (webSocket) => {
  if (webSocket.readyState === ws.OPEN) {
    webSocket.send("Hello");
  }
});
