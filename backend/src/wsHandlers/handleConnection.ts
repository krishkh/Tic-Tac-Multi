import { WebSocket, WebSocketServer } from "ws";
import { MessageType } from "../Types/Types";
import JoinUser from "../wsControllers/JoinGame";
import CheckGameState from "../wsControllers/CheckGameState";
import MakeMove from "../wsControllers/MakeMove";

export const handleConnection = (Socket: WebSocket, wss: WebSocketServer) => {
  Socket.on("message", (message) => {
    const messageJson: MessageType = JSON.parse(message.toString());

    switch (messageJson.type) {
      case "joinGame":
        JoinUser(messageJson, Socket);
        break;
      case "check":
        CheckGameState(Socket);
        break;
      case "move":
        MakeMove(Socket, messageJson, wss);
        break;
      default:
        Socket.send(
          `Error! ${messageJson.type} message request does not exist on the server yet`
        );
    }

    // if (messageJson.type === "joinGame") {
    //   JoinUser(messageJson, Socket);
    // } else if (messageJson.type === "check") {
    //   CheckGameState(Socket);
    // } else if (messageJson.type === "move") {
    //   MakeMove(Socket, messageJson, wss);
    // } else if (messageJson.type) {
    //   Socket.send("bruh wrong input");
    // }
  });
};
