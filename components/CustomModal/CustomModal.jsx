import { useEffect, useState } from "react";
import useData from "../../hooks/useData";
import CreatePost from "../CreatePost/CreatePost";
import UpdatePost from "../UpdatePost/UpdatePost";

export default function CustomModal({ comp }) {
  console.log(comp);
  const { modalVisibility, setModalVisibility } = useData();

  function handleFather() {
    setModalVisibility(false);
  }

  function handleChild(e) {
    if (e.target.classList[0] === "close") {
      setModalVisibility(false);
    } else {
      e.stopPropagation();
    }
  }

  function showComp(selectedComp) {
    console.log(selectedComp);
    const comps = { "CreatePost": <CreatePost />, "UpdatePost": <UpdatePost /> }
    return comps[selectedComp]
  }

  return (
    modalVisibility && (
      <div onClick={handleFather} className="custom-modal">
        <div onClick={handleChild} className="dialog">
          <div className="modal-header">
            <span className="close"></span>
          </div>
          <div className="modal-content">
            {/* <span className="modal-title">Cree su Post</span> */}
            {/* <CreatePost /> */}
            {showComp(comp)}
            <div className="group" id="text-modal"></div>
          </div>
          <div className="modal-action"></div>
        </div>
      </div>
    )
  );
}
