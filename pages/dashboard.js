import React, { useState, useEffect, useRef, useCallback, memo } from "react"
import Perfil from "../components/Perfil/Perfil"
import CustomModal from "../components/CustomModal/CustomModal"
import useData from "../hooks/useData"
import useSocketInitializer from "../hooks/useSocketInitializer"
import useSocketConexion from "../hooks/useSocketConexion"
import { useRouter } from "next/router"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useQueryClient } from "@tanstack/react-query"
import useInfiniteQueryCustom from "../hooks/useInfiniteQueryCustom"

function Dashboard() {
  //console.log('Renderizando Dashboard');
  const { data, fetchNextPage, isLoading } = useInfiniteQueryCustom(
    "generalPosts",
    null,
  )

  const router = useRouter()
  const { objCollection: dataUserLoggedStorage } =
    useLocalStorage("user-logged")
  useSocketConexion()
  //const inputRef = useRef(null);
  const [isThereNewPost, setIsThereNewPost] = useState(false)
  useSocketInitializer(setIsThereNewPost)
  //useCalculateWindow(inputRef);

  const queryClient = useQueryClient()

  // const goRegister = () => {
  //   router.push("/register");
  // };

  const { modalVisibility, setModalVisibility, socket } = useData()

  useEffect(() => {
    if (!dataUserLoggedStorage) {
      router.push("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showNewPost = () => {
    queryClient.setQueryData(["generalPosts"], data => ({
      pages: [[isThereNewPost], ...data.pages],
      pageParams: null,
    }))
    setIsThereNewPost(null)
  }

  const handleModalVisibility = () => {
    setModalVisibility(x => !x)
  }

  return (
    socket &&
    dataUserLoggedStorage && (
      <div className="dashboardPage">
        {/* <button onClick={goRegister} className="button">
          Registrese
        </button> */}

        {modalVisibility && <CustomModal comp={"CreatePost"} />}
        {/* <SearchBar /> */}
        <div className="containerDash">
          <div className="containerDash-buttons">
            <button
              onClick={() => router.push("/admin_panel")}
              className="button"
            >
              Panel Admin
            </button>
            {/* <button onClick={() => router.push("/perfil")} className="button">
              Mi perfil
            </button> */}
            <button
              onClick={() => router.push("/")}
              className="button"
            >
              Salir
            </button>
          </div>

          <div
            onClick={handleModalVisibility}
            className="form-create-post"
          >
            Crear Inmueble
          </div>
          <Perfil />
        </div>
      </div>
    )
  )
}

export default Dashboard
//export default memo(Dashboard)
