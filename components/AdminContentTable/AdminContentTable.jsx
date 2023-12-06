import useData from "../../hooks/useData"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/router"
function AdminContentTable({ data }) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { setModalVisibility, setformPostData } = useData()
  const { author, message } = data
  function updatePost(e) {
    const row = e.target.closest("tr")
    const id = row.querySelector(".id").textContent
    const author = row.querySelector(".author").textContent
    const msg = row.querySelector(".msg").textContent
    const status = row.querySelector(".status").textContent

    const dataFormUpdate = {
      id,
      author,
      msg,
      status,
    }

    setformPostData(dataFormUpdate)
  }

  function deletePost(e) {
    const row = e.target.closest("tr")
    const columnValue = row.querySelector(".id").textContent
    deletePostId(columnValue)
  }

  const handleModalVisibility = () => {
    setModalVisibility(x => !x)
  }
  const deletePostId = async id_post => {
    const response = await fetch(
      "https://643c5bc8f0ec48ce9042d8f2.mockapi.io/digital/posts/" + id_post,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    const responseBody = await response.json()
    const statusText = response.status
    if (statusText === 200) {
      //remove();
      //refetch();
      queryClient.invalidateQueries({ queryKeys: ["PostsAdminPanelPage"] })
    }
  }

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className=" id px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {data.id}
      </th>
      <td className=" author  px-6 py-4">{author}</td>
      <td className=" msg px-6 py-4">{message}</td>
      <td className=" status px-6 py-4">{data.status}</td>
      <td className="px-6 py-4">
        <a
          onClick={e => {
            handleModalVisibility()
            updatePost(e)
          }}
          className=" font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Edit
        </a>
        <a
          onClick={e => {
            deletePost(e)
          }}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Delete
        </a>

        <a
          onClick={e => {
            const row = e.target.closest("tr")
            const id = row.querySelector(".id").textContent
            router.push(`/property/?id=${id}`)
          }}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Detail
        </a>
      </td>
    </tr>
  )
}

export default AdminContentTable
