"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleConnection = void 0;
const JoinGame_1 = __importDefault(require("../wsControllers/JoinGame"));
const CheckGameState_1 = __importDefault(require("../wsControllers/CheckGameState"));
const MakeMove_1 = __importDefault(require("../wsControllers/MakeMove"));
const handleConnection = (Socket, wss) => {
    Socket.on("message", (message) => {
        const messageJson = JSON.parse(message.toString());
        if (messageJson.type === "joinGame") {
            (0, JoinGame_1.default)(messageJson, Socket);
        }
        else if (messageJson.type === "check") {
            (0, CheckGameState_1.default)(Socket);
        }
        else if (messageJson.type === "move") {
            (0, MakeMove_1.default)(Socket, messageJson, wss);
        }
        else if (messageJson.type) {
            Socket.send("bruh wrong input");
        }
    });
};
exports.handleConnection = handleConnection;
