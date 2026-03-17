import { useEffect, useState } from "react"

const WS_URL = "wss://chess-game-g6c1.onrender.com";

export const useSocket = () => {

    const [socket, setSocket] = useState<WebSocket | null>(null);


    useEffect(() => {

        const socket = new WebSocket(WS_URL);

        socket.onopen = () => {
            setSocket(socket);
        }

        socket.onclose = () => {
            setSocket(null);
        }

        return () => {
            socket.close();
        }

    }, [])

    return socket;
}