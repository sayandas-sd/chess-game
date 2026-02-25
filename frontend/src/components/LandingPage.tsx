import { useNavigate } from "react-router-dom";
import chessImage from "../assets/images/chess.webp";
import Button from "./ui/Button";

export const LandingPage = () => {
    const navigate = useNavigate();

    return <div className="flex justify-center">
        <div className="pt-8 max-w-screen-lg">
            <div className="grid grid-cols-2 span-4 md:grid-cols-2">
                    <div className="flex justify-center">   
                        <img src={chessImage} 
                        alt="Chess image" 
                        loading="lazy"
                        className="w-auto h-auto rounded-lg"
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl font-bold text-white font-mono flex justify-center">
                            Play Online Chesss Multiplayer
                        </h1>
                        <div className="mt-4 flex justify-center">
                            <Button onClick = {() => {
                                    navigate('/game');
                                }}
                                >
                                Play Game
                            </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}