"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleConnection = void 0;
const __1 = require("..");
const handleConnection = (Socket, wss) => {
    Socket.on("message", (message) => {
        const messageJson = JSON.parse(message.toString());
        if (messageJson.type === "joinGame") {
            console.log(Socket, "Joining Game");
            const body = messageJson.body;
            if (!__1.Game1.Player1) {
                __1.Game1.Player1 = { name: body, id: 1, socket: Socket };
            }
            else if (!__1.Game1.Player2) {
                __1.Game1.Player2 = { name: body, id: 2, socket: Socket };
            }
            else {
                Socket.send("Game is filled already");
            }
        }
        else if (messageJson.type === "check") {
            Socket.send(JSON.stringify(__1.Game1));
        }
        else if (messageJson.type === "move") {
            const body = messageJson.body;
            __1.Game1.turn = __1.Game1.turn == "O" ? (__1.Game1.turn = "X") : (__1.Game1.turn = "O");
        }
        else if (messageJson.type) {
            Socket.send("bruh wrong input");
        }
    });
};
exports.handleConnection = handleConnection;
