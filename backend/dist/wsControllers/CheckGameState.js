"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const CheckGameState = (Socket) => {
    var _a, _b;
    const gameState = {
        turn: __1.Game1.turn,
        board: __1.Game1.Board,
        player1: (_a = __1.Game1.Player1) === null || _a === void 0 ? void 0 : _a.name,
        player2: (_b = __1.Game1.Player2) === null || _b === void 0 ? void 0 : _b.name,
    };
    Socket.send(JSON.stringify(gameState));
};
exports.default = CheckGameState;
