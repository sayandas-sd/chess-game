"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
dotenv_1.default.config();
const PORT = process.env.PORT || 8080;
const server = (0, http_1.createServer)();
const wss = new ws_1.WebSocketServer({ server });
const gamemanager = new GameManager_1.GameManager();
wss.on('connection', function connection(ws) {
    gamemanager.addUserToGame(ws);
    ws.on('close', () => {
        gamemanager.removeUserFromGame(ws);
    });
});
server.listen(PORT, () => {
    console.log("server running on port", PORT);
});
