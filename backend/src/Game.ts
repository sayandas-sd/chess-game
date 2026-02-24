import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { CREATE_GAME, GAME_OVER, MAKE_MOVE } from "./message";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  public board: Chess;
  private startTime: Date;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();

    this.player1.send(JSON.stringify({
      type: CREATE_GAME,
      payload: { color: "white" }
    }));

    this.player2.send(JSON.stringify({
      type: CREATE_GAME,
      payload: { color: "black" }
    }));
  }

  makeMove(
    socket: WebSocket,
    move: { from: string; to: string }
  ) {
   
    const isWhiteTurn = this.board.turn() === "w";

    if (isWhiteTurn && socket !== this.player1) return;
    if (!isWhiteTurn && socket !== this.player2) return;

    
    const result = this.board.move({
      from: move.from,
      to: move.to,
      promotion: "q",
    });

    if (!result) {
      console.error("Invalid move:", move);
      return;
    }

   
    if (this.board.isGameOver()) {
      const winner = this.board.turn() === "w" ? "black" : "white";

      const msg = JSON.stringify({
        type: GAME_OVER,
        payload: { winner },
      });

      this.player1.send(msg);
      this.player2.send(msg);
      return;
    }

    
    const moveMsg = JSON.stringify({
      type: MAKE_MOVE,
      payload: move,
    });

    this.player1.send(moveMsg);
    this.player2.send(moveMsg);
  }
}