import React, { memo, useEffect } from "react"
import { useRouter } from "next/router"
import useInfiniteQueryCustom from "../hooks/useInfiniteQueryCustom"
import useData from "../hooks/useData"
import CustomModal from "../components/CustomModal/CustomModal"
import AdminTable from "../components/AdminTable/AdminTable"

function AdminPanelPage() {
  const { modalVisibility } = useData()
  const router = useRouter()
  console.log("--AdminPanelPage-")
  return (
    <>
      {modalVisibility && <CustomModal comp={"UpdatePost"} />}
      {modalVisibility || (
        <>
          <div className="AdminPage">
            <div className="container-Admin-Page">
              <div className="container-Admin-Page-buttons">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="button"
                >
                  Ir a dashboard
                </button>
                {/* <button className="button"> Mi perfil</button> */}
                <button
                  onClick={() => router.push("/")}
                  className="button"
                >
                  Salir
                </button>
              </div>
              <div className="container_table">
                <AdminTable />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

//export default AdminPanelPage;
export default memo(AdminPanelPage)
