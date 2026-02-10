import { Game } from "./Game";
import { CREATE_GAME, MAKE_MOVE } from "./message";
import { WebSocket } from "ws";

export class GameManager {

    private games: Game[];
    private pendingUsers: WebSocket[] | null;
    private users: WebSocket[];


    constructor() {
        this.games = [];
        this.pendingUsers = null;
        this.users = [];
    }
    
    addUserToGame(socket: WebSocket) {
        this.users.push(socket)
        this.handleMessage(socket);
    }

    removeUserFromGame(socket: WebSocket) {
        this.users = this.users.filter(user => user != socket);
    }

    private handleMessage(socket: WebSocket) {
        socket.on('message', (data) => {
            const message = JSON.parse(data.toString());

            if(message.type === CREATE_GAME) {
                if(this.pendingUsers && this.pendingUsers.length > 0) {
                   const game = new Game(this.pendingUsers[0], socket);
                   this.games.push(game);
                   this.pendingUsers = null;
                } else {
                    this.pendingUsers = [socket];
                }
            }

            if(message.type === MAKE_MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);   
                if(game) {
                    game.makeMove(socket, message.move);
                }
            }
        });
    }
}

