import { useEffect } from "react";
import io from "socket.io-client";
import useData from "./useData";
let socket;
export default async function useSocketConexion() {
  const { socket: i, setSocket, setReloadUser } = useData();
  useEffect(() => {
    //console.log(i);
    if (!i) {
      (async () => {
        await fetch("/api/socket");
        socket = io();
        setSocket(socket);
        //setReloadUser(x=>!x)

        //console.log(i);

        //setReloadUser(x=>!x)
        /**socket.on("connect", () => {
        console.log(socket.connected);
        setSocket(socket); 
        setReloadUser(x=>!x)
      }); */
        //console.log("socket iniciado en useSocketConexion");
      })();
    }
    //console.log("%cEn  useSocketInitializer", "font-size:20px");
  }, []);

  //console.log(i);
  return socket;
}
