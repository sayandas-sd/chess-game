import { useNavigate } from "react-router-dom";
import chessImage from "../assets/images/chess.webp";

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
                            <button onClick = {() => {
                                    navigate('/game');
                                }}
                                className='bg-blue-500 text-xl font-bold font-mono rounded-lg py-4 px-10 text-white hover:bg-blue-400 cursor-pointer'>
                                Play Game
                            </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}