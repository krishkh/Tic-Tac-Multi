"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleConnection = void 0;
const __1 = require("..");
const WinCheck_1 = require("../controllers/WinCheck");
const handleConnection = (Socket, wss) => {
    Socket.on("message", (message) => {
        var _a, _b;
        const messageJson = JSON.parse(message.toString());
        if (messageJson.type === "joinGame") {
            console.log(Socket, "Joining Game");
            const PName = (_a = messageJson.body) === null || _a === void 0 ? void 0 : _a.name;
            if (!__1.Game1.Player1) {
                __1.Game1.Player1 = { name: PName, id: 1, socket: Socket };
            }
            else if (!__1.Game1.Player2) {
                __1.Game1.Player2 = { name: PName, id: 2, socket: Socket };
            }
            else {
                Socket.send("Game is filled already");
            }
        }
        else if (messageJson.type === "check") {
            // We are just checking the state of the Game here not the board
            Socket.send(JSON.stringify(__1.Game1));
        }
        else if (messageJson.type === "move") {
            const body = (_b = messageJson.body) === null || _b === void 0 ? void 0 : _b.move;
            // The body here should have a move: field with input in the form of [x, y]
            // check for win function
            (0, WinCheck_1.CheckForWin)(__1.Game1.Board);
            __1.Game1.turn = __1.Game1.turn == "O" ? (__1.Game1.turn = "X") : (__1.Game1.turn = "O");
        }
        else if (messageJson.type) {
            Socket.send("bruh wrong input");
        }
    });
};
exports.handleConnection = handleConnection;
