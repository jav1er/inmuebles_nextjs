import React, { memo, useEffect } from "react"
import { useRouter } from "next/router"
import useData from "../hooks/useData"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import GetPosts from "../helpers/getPosts"
import { useState } from "react"
import DynamicImage from "../components/DynamicImage/DynamicImage"

function PropertyPage() {
  const { modalVisibility } = useData()
  const router = useRouter()
  const { id } = router.query

  const objectCustomParameters = {
    id,
  }
  const [data, setData] = useState(null)
  const searchProperty = async () => {
    const response = await GetPosts(objectCustomParameters)
    setData(response[0])
  }
  useEffect(() => {
    searchProperty()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // const queryClient = useQueryClient()

  // const dataAdminTable = queryClient.getQueriesData({
  //   queryKey: ["PostsAdminPanelPage"],
  // })

  // console.log(id)
  // useEffect(() => {
  //   console.log("--PropertyPage-")

  //   //console.log(dataAdminTable[0][1]["pages"])
  //   //console.log( dataAdminTable[0] )
  // }, [dataAdminTable])

  // if (!data) return

  // if (data.image)
  return (
    <div>
      {data ? (
        <div className="AdminPage">
          <div className="container-Admin-Page">
            <div className="container-Admin-Page-buttons">
              <button
                onClick={() => router.push("/dashboard")}
                className="button"
              >
                Ir a dashboard
              </button>
              <button
                onClick={() => router.push("/admin_panel")}
                className="button"
              >
                Panel Admin
              </button>
              <button
                onClick={() => router.push("/")}
                className="button"
              >
                Salir
              </button>
            </div>
            <div className="container_table">
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                {data?.image && <DynamicImage imgSelected={data.image} />}

                <div className="p-5">
                  <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    Descripcion del Inmueble:
                  </h2>
                  <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                    <li className="flex items-center">
                      <svg
                        className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <strong>Ubicacion:</strong>{data.location}
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <strong>Estado:</strong>{data.status}
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-3.5 h-3.5 me-2 text-gray-500 dark:text-gray-400 flex-shrink-0"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <strong>Mensaje:</strong>{data.message}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  )
}

export default PropertyPage
//export default memo(PropertyPage)
