import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { ChessBoard } from "./ChessBoard";
import Button from "./ui/Button";
import { Chess } from "chess.js";


export const CREATE_GAME = 'create_game';
export const MAKE_MOVE = 'make_move';
export const GAME_OVER = 'game_over';

export const Game = () => {

    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());

    useEffect(() => {
        if(!socket) {
            return;
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            switch (message.type) {
                case CREATE_GAME: 
                    setChess(new Chess());
                    setBoard(chess.board());
                    break;
                case MAKE_MOVE:
                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    break;
                case GAME_OVER:
                    break;
            }
        }
    }, [socket]);

    if(!socket) return <div className="flex text-white justify-center">Connecting.....</div>

    const socketConnectionGame = () => {
        socket.send(JSON.stringify({
            
        }))
    }

    return <div className="flex justify-center ">
        <div className="pt-8 max-w-screen-lg w-full">
            <div className="grid grid-cols-6 gap-4 w-full">
                <div className="col-span-4 w-full flex justify-center">
                    <ChessBoard board={board}/>
                </div>
                <div className="col-span-2 bg-green-200 w-full">
                    <Button onClick={socketConnectionGame}>
                        Play
                    </Button>
                </div>
            </div>
        </div>
    </div>
}