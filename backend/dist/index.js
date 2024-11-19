"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game1 = void 0;
const express_1 = __importDefault(require("express"));
const ws_1 = __importDefault(require("ws"));
const handleConnection_1 = require("./wsHandlers/handleConnection");
// let Players: GameCollection = new Set();
exports.Game1 = {
    //   Player1: { name: "Player1", id: 1 },
    //   Player2: { name: "Player2", id: 2 },
    BoardId: 1,
    Board: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ],
    turn: "O",
};
const app = (0, express_1.default)();
const server = app.listen(3000, () => {
    console.log("Server started on port %s", 3000);
});
const wss = new ws_1.default.Server({ server });
wss.on("connection", (Socket) => {
    // The logic to handle the connection goes here
    (0, handleConnection_1.handleConnection)(Socket, wss);
    // A welcome message from the server
    if (Socket.readyState === ws_1.default.OPEN) {
        Socket.send("Server Connected!");
    }
});
