import { useEffect } from "react";
//import io from "socket.io-client";
import useData from "./useData";
import { useLocalStorage } from "./useLocalStorage";
import useHttpPut from "../hooks/useHttpPut";
import { APIS, END_POINTS } from "../util/constants";
import {
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";

let socket;
export default async function useSocketInitializer(setIsThereNewPost = "") {
  const { setSocket, setPosts, posts, setReloadUser, socket } = useData();
  const queryClient = useQueryClient();
  //const localStorageKey = "user-logged";
  //const [collection] = useLocalStorage(localStorageKey);

  ////console.log(socketInit);
  // const { response, error, isLoading } = useHttpPut(
  //   `${APIS.MOCKAPI_POSTS}${END_POINTS.PUT}${idPost}`,
  //   dateLikePrepared,
  //   RunUpdate
  // );

  useEffect(() => {
    //console.log(socket);
    if (socket) {
      const SocketInitializerConection = async () => {
        // await fetch("/api/socket");

        // socket = io();

        // setSocket(socket);
        // //console.log("socket iniciado");

        socket.on("receive-message", (objNewPost) => {
          console.log("%cescuchando el evento receive-message", "color:yellow");
          console.log(objNewPost);

          console.log("apunto de setiar la tada ");
          setIsThereNewPost(objNewPost);

          //setAllMessages((pre) => [...pre, data]);
        });

        socket.on("receive-likes", (objPostUpdated) => {
          // console.log(
          //   "%cEscuchando el evento receive-post con likes actualizados",
          //   "color:yellow"
          // );

          const idPost = objPostUpdated.id;

          // console.log("objPost con likes actualizados");
          // console.log(objPostUpdated);

          const state = queryClient.getQueryState(["generalPosts"]);

          const newPagesArray = state.data?.pages.map((page) => {
            return page.map((objPost) => {
              if (objPost.id === idPost) {
                // Realiza la mutación de la propiedad en objPost
                objPost = objPostUpdated;
              }
              //console.log(objPost);
              return objPost;
            });
          });

          queryClient.setQueryData(["generalPosts"], (data) => ({
            pages: newPagesArray,
            pageParams: data.pageParams,
          }));

          setReloadUser((x) => !x);
        });
      };
      SocketInitializerConection();
    }
  }, [queryClient, setIsThereNewPost, setReloadUser, socket]);
}
