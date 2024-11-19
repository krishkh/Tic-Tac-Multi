"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = __importDefault(require("ws"));
// let Players: GameArray = [];
let Game1 = {
    //   Player1: { name: "Player1", id: 1 },
    //   Player2: { name: "Player2", id: 2 },
    BoardId: 1,
};
const app = (0, express_1.default)();
const server = app.listen(3000, () => {
    console.log("Server started on port 3000 haha");
});
const wss = new ws_1.default.Server({ server });
wss.on("connection", (webSocket) => {
    if (webSocket.readyState === ws_1.default.OPEN) {
        webSocket.send("Hello");
    }
});
