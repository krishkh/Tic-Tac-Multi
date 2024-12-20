import { WebSocket, WebSocketServer } from "ws";
import { Game1 } from "..";
import { MessageType, WinResult } from "../Types/Types";
import { CheckForWin } from "../controllers/WinCheck";
const MakeMove = (
  Socket: WebSocket,
  messageJson: MessageType,
  wss: WebSocketServer
) => {
  const move = messageJson.body?.move;

  // If the move is invalid we will return here only
  if (Game1.Board[move![0]][move![1]] !== null) {
    Socket.send("Invalid Move");
    return;
  }

  // If the move is valid we will make the move
  Game1.Board[move![0]][move![1]] = Game1.turn;

  // We check for the win condition
  const result: WinResult = CheckForWin(Game1.Board);
  if (result === "O" || result === "X") {
    console.log(`The Winner is ${result}`);
    wss.clients.forEach((client) => {
      client.send(`The Winner is ${result}`);
    });
  }

  // Broadcast the move to everyone
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(Game1.Board));
  });

  // Log the move in the server
  if (Socket === Game1.Player1?.socket && Game1.turn === "O") {
    console.log("Player 1 / O has completed their turn");
    console.log(move);
    Game1.turn = "X";
  } else if (Socket === Game1.Player2?.socket && Game1.turn === "X") {
    console.log("Player 2 / X has completed their turn");
    console.log(move);
    Game1.turn = "O";
  } else {
    console.log("It is not yet your turn");
  }
};
export default MakeMove;
