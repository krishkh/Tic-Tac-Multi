import { WebSocket } from "ws";
import { MessageType } from "../Types/Types";
import { Game1 } from "..";
const JoinUser = (messageJson: MessageType, Socket: WebSocket) => {
  const PName = messageJson.body?.name as string;
  console.log(`${PName} is Joining the Game`);

  if (!Game1.Player1 && Socket != Game1.Player2?.socket) {
    Game1.Player1 = { name: PName, id: 1, socket: Socket };
  } else if (!Game1.Player2 && Socket != Game1.Player1?.socket) {
    Game1.Player2 = { name: PName, id: 2, socket: Socket };
  } else {
    Socket.send("Game is filled already or you are already connected");
  }
};
export default JoinUser;
