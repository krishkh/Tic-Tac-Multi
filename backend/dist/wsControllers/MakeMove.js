"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const WinCheck_1 = require("../controllers/WinCheck");
const MakeMove = (Socket, messageJson, wss) => {
    var _a, _b, _c;
    const move = (_a = messageJson.body) === null || _a === void 0 ? void 0 : _a.move;
    // If the move is invalid we will return here only
    if (__1.Game1.Board[move[0]][move[1]] !== null) {
        Socket.send("Invalid Move");
        return;
    }
    // If the move is valid we will make the move
    __1.Game1.Board[move[0]][move[1]] = __1.Game1.turn;
    // We check for the win condition
    const result = (0, WinCheck_1.CheckForWin)(__1.Game1.Board);
    if (result === "O" || result === "X") {
        console.log(`The Winner is ${result}`);
        wss.clients.forEach((client) => {
            client.send(`The Winner is ${result}`);
        });
    }
    // Broadcast the move to everyone
    wss.clients.forEach((client) => {
        client.send(JSON.stringify(__1.Game1.Board));
    });
    // Log the move in the server
    if (Socket === ((_b = __1.Game1.Player1) === null || _b === void 0 ? void 0 : _b.socket) && __1.Game1.turn === "O") {
        console.log("Player 1 / O has completed their turn");
        console.log(move);
        __1.Game1.turn = "X";
    }
    else if (Socket === ((_c = __1.Game1.Player2) === null || _c === void 0 ? void 0 : _c.socket) && __1.Game1.turn === "X") {
        console.log("Player 2 / X has completed their turn");
        console.log(move);
        __1.Game1.turn = "O";
    }
    else {
        console.log("It is not yet your turn");
    }
};
exports.default = MakeMove;
