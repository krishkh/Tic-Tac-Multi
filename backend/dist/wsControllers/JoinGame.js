"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const JoinUser = (messageJson, Socket) => {
    var _a, _b, _c;
    const PName = (_a = messageJson.body) === null || _a === void 0 ? void 0 : _a.name;
    console.log(`${PName} is Joining the Game`);
    if (!__1.Game1.Player1 && Socket != ((_b = __1.Game1.Player2) === null || _b === void 0 ? void 0 : _b.socket)) {
        __1.Game1.Player1 = { name: PName, id: 1, socket: Socket };
    }
    else if (!__1.Game1.Player2 && Socket != ((_c = __1.Game1.Player1) === null || _c === void 0 ? void 0 : _c.socket)) {
        __1.Game1.Player2 = { name: PName, id: 2, socket: Socket };
    }
    else {
        Socket.send("Game is filled already or you are already connected");
    }
};
exports.default = JoinUser;
