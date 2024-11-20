import { WebSocket } from "ws";
import { Game1 } from "..";
const CheckGameState = (Socket: WebSocket) => {
  const gameState = {
    turn: Game1.turn,
    board: Game1.Board,
    player1: Game1.Player1?.name,
    player2: Game1.Player2?.name,
  };
  Socket.send(JSON.stringify(gameState));
};
export default CheckGameState;
