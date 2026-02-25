import type { Color, PieceSymbol, Square } from "chess.js";


export const ChessBoard = ({board}: { 
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];

}) => {
    return <div className="text-white font-bold">
        {board.map((row, i) => {
            return <div key={i} className="flex">
                {row.map((square, j) => {
                    return (
                        <div
                            key={j}
                            className={`w-18 h-18 ${(i+j) % 2 == 0 ? "bg-gray-600" : "bg-gray-300"}`}
                        >
                            {square ? square.type : ""}
                        </div>
                    );
                })}
            </div>
        })}
    </div>
}