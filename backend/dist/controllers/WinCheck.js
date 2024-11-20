"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckForWin = void 0;
const CheckForWin = (Board) => {
    console.log("has anyone won? maybe.. let me check real quick!!");
    console.log(Board);
    if (Board[0][0] === Board[1][1] && Board[0][0] === Board[2][2]) {
        return Board[0][0];
    }
    if (Board[0][2] === Board[1][1] && Board[0][2] === Board[2][0]) {
        return Board[0][2];
    }
    for (let i = 0; i < 3; i++) {
        if (Board[i][0] === Board[i][1] && Board[i][0] === Board[i][2]) {
            return Board[i][0];
        }
        if (Board[0][i] === Board[1][i] && Board[0][i] === Board[2][i]) {
            return Board[0][i];
        }
    }
    return false;
};
exports.CheckForWin = CheckForWin;
