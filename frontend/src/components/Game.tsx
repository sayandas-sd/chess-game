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
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if(!socket) {
            return;
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            switch (message.type) {
                case CREATE_GAME: 
                    
                    setBoard(chess.board());
                    setStarted(true)
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
            type: CREATE_GAME
        }))
    }

    return <div className="flex justify-center ">
        <div className="pt-8 max-w-screen-lg w-full">
            <div className="grid grid-cols-6 gap-4 w-full">
                <div className="col-span-4 w-full flex justify-center">
                    <ChessBoard chess={chess} setBoard={setBoard} socket={socket} board={board}/>
                </div>
                <div className="col-span-2 w-full flex justify-center">
                    <div className="flex flex-col justify-center ">
                        {!started && <Button onClick={socketConnectionGame}>
                            Play
                        </Button>}     
                    </div>
                </div>
            </div>
        </div>
    </div>
}