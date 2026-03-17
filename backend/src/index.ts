
import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';
import dotenv from "dotenv";
import { createServer} from "http";

dotenv.config();

const PORT = process.env.PORT || 8080;

const server = createServer((req, res) => {
  res.writeHead(200);
  res.end("Server is running");
});

const wss = new WebSocketServer({ server });

const gamemanager = new GameManager();

wss.on('connection', function connection(ws) {

 gamemanager.addUserToGame(ws);

 ws.on('close', () => {
    gamemanager.removeUserFromGame(ws);
  });

});

server.listen(PORT, () => {
  console.log("server running on port", PORT);
});