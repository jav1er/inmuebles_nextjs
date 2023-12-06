import { memo, useEffect } from "react";
import { default as NextImage } from "next/image";
import useData from "../../hooks/useData";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import useGetPostNumber from "../../hooks/useGetPostNumber";

function Perfil() {
  //console.log("perfil se ha renderizado");
  const { isLoading } = useGetPostNumber();
  const { numberPublications, userData } = useData();

  const { objCollection: dataUserLoggedStorage } =
    useLocalStorage("user-logged");

  return (
    <div className="perfil">
      <div className="perfil-information">
        <NextImage
          src={`${dataUserLoggedStorage?.avatar}`}
          alt="title"
          width={120}
          height={120}
          className="perfil-image"
          priority
        />
        <div className="perfil-description-container">
          <p className="perfil-description-text perfil-description-bold">
            {`${dataUserLoggedStorage?.username}`}
          </p>

          <div className="perfil-description-text-p">
            <span className={isLoading ? "loader" : "perfil-description-bold"}>
              {isLoading ? "" : numberPublications}
            </span>

            <span className="perfil-description-bold">publicaciones</span>
          </div>
        </div>
        <div className="perfil-name">
          <p className="perfil-description-text perfil-description-bold">
            {`${dataUserLoggedStorage?.name}`}
          </p>
        </div>
      </div>
    </div>
  );
}

//export default Perfil;
export default memo(Perfil);
