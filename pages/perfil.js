import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import Post from "../components/Post/Post";
import SearchBar from "../components/SearchBar/SearchBar";
import Perfil from "../components/Perfil/Perfil";
import CustomModal from "../components/CustomModal/CustomModal";
import useData from "../hooks/useData";
import useSocketInitializer from "../hooks/useSocketInitializer";
import useSocketConexion from "../hooks/useSocketConexion";
import { useRouter } from "next/router";
import { useLocalStorage } from "../hooks/useLocalStorage";

import { useQueryClient } from "@tanstack/react-query";

import GetPosts from "../helpers/getPosts";
import useInfiniteQueryCustom from "../hooks/useInfiniteQueryCustom";

function PerfilPage() {
  //console.log('Renderizando PerfilPage');

  const { data, fetchNextPage, isLoading } = useInfiniteQueryCustom(
    "curretUserPosts",
    "PerfilPage"
  );

  const router = useRouter();
  const { objCollection: dataUserLoggedStorage } =
    useLocalStorage("user-logged");
  useSocketConexion();

  const [isThereNewPost, setIsThereNewPost] = useState(false);
  useSocketInitializer(setIsThereNewPost);

  const queryClient = useQueryClient();

  const goRegister = () => {
    router.push("/register");
  };

  const { modalVisibility, setModalVisibility, socket } = useData();

  useEffect(() => {
    if (!dataUserLoggedStorage) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showNewPost = () => {
    queryClient.setQueryData(["curretUserPosts"], (data) => ({
      pages: [[isThereNewPost], ...data.pages],
      pageParams: null,
    }));
    setIsThereNewPost(null);
  };

  const handleModalVisibility = () => {
    setModalVisibility((x) => !x);
  };

  const handleDownload = async () => {
    const posts = await GetPosts(`author=${dataUserLoggedStorage.username}`);

    const dataDownload = {
      totalPosts: posts,
    };

    downloadFile(dataDownload);
  };

  return (
    socket &&
    dataUserLoggedStorage && (
      <div className="PerfilPagePage">
        {modalVisibility && <CustomModal />}
        <div className="container-Perfil-PagePage">
          <div className="container-Perfil-PagePage-buttons">
            <button onClick={handleDownload} className="button">
              Descargar
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="button"
            >
              Ir a dashboard
            </button>
            {/* <button className="button"> Mi perfil</button> */}
            <button onClick={() => router.push("/")} className="button">
              Salir
            </button>
          </div>

          <div onClick={handleModalVisibility} className="form-create-post">
            Crear publicacion
          </div>
          <Perfil />

          <div className="content-posts">
            {isThereNewPost && (
              <button onClick={showNewPost} className="button magin-auto">
                Nuevas publicaciones disponibles
              </button>
            )}

            <div className="container-Perfil-PagePage-center-loader">
              {isLoading && <span className="loader"></span>}
            </div>

            {/* {isFetching && <h1> en fetching </h1>} */}

            {data?.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.map((post, key) => (
                  <Post dataPost={post} key={key} />
                ))}
              </React.Fragment>
            ))}

            {/* {data?.pages.flatMap((group, i) =>
              group.map((post, key) => <Post dataPost={post} key={key} />)
            )} */}
            <button
              disabled={isLoading}
              onClick={fetchNextPage}
              className={isLoading ? "hidden" : "button"}
            >
              Ver mas publicaciones
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default PerfilPage;
//export default memo(PerfilPage)
