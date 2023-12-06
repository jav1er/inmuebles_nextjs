import React, { useEffect, useState } from "react"
import AdminContentTable from "../AdminContentTable/AdminContentTable"
import useInfiniteQueryCustom from "../../hooks/useInfiniteQueryCustom"

function AdminTable() {
  const [currentPage, setCurrentPage] = useState(0)

  const itemsPerPage = 8
  const usurName = null

  const { data, fetchNextPage, isLoading } = useInfiniteQueryCustom(
    "PostsAdminPanelPage",
    usurName,
    itemsPerPage,
  )
  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1)
    fetchNextPage()
  }

  const previousPage = () => {
    setCurrentPage(prevPage => prevPage - 1)
    //fetchNextPage()
  }

  useEffect(() => {
    console.log(currentPage)
    console.log(data?.pages)
    console.log(data?.pages[currentPage])
    console.log()
  }, [currentPage, data])

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              scope="col"
              className="px-6 py-3"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              Autor
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              Mensaje
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              Estado
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.pages[currentPage]?.map((post, key) => (
            <AdminContentTable
              data={post}
              key={key}
            />
          ))}
        </tbody>
      </table>
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <a
              disabled={isLoading}
              onClick={previousPage}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              disabled={isLoading}
              onClick={nextPage}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default AdminTable
