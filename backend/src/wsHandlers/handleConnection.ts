import { WebSocket, WebSocketServer } from "ws";
import { MessageType } from "../Types/Types";
import { Game1 } from "..";
import { CheckForWin } from "../controllers/WinCheck";

export const handleConnection = (Socket: WebSocket, wss: WebSocketServer) => {
  Socket.on("message", (message) => {
    const messageJson: MessageType = JSON.parse(message.toString());

    if (messageJson.type === "joinGame") {
      console.log(Socket, "Joining Game");
      const body = messageJson.body as string;

      if (!Game1.Player1) {
        Game1.Player1 = { name: body, id: 1, socket: Socket };
      } else if (!Game1.Player2) {
        Game1.Player2 = { name: body, id: 2, socket: Socket };
      } else {
        Socket.send("Game is filled already");
      }
    } else if (messageJson.type === "check") {
      Socket.send(JSON.stringify(Game1));
    } else if (messageJson.type === "move") {
      const body = messageJson.body;
      // The body here should have a move: field with input in the form of [x, y]
      // check for win function
      CheckForWin(Game1.Board);
      Game1.turn = Game1.turn == "O" ? (Game1.turn = "X") : (Game1.turn = "O");
    } else if (messageJson.type) {
      Socket.send("bruh wrong input");
    }
  });
};
