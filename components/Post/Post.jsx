import { default as NextImage } from "next/image";
import { useState, useEffect, useCallback, memo, useMemo } from "react";
import validateLink from "../../helpers/validateLink";
import { getLastModAgo } from "../../hooks/useGetLastModAgo";
import DynamicImage from "../DynamicImage/DynamicImage";
import useData from "../../hooks/useData";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import useHttpPut from "../../hooks/useHttpPut";
import { APIS, END_POINTS } from "../../util/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function Post({ dataPost }) {
  //console.log(dataPost);
  const { socket } = useData();

  const [like, setLike] = useState(false);
  const [isLike, setIslike] = useState(null);
  const [countLikes, setCountLikes] = useState(0);
  const dateCurrent = new Date();

  const localStorageKey = "user-logged";
  const { objCollection: collection } = useLocalStorage(localStorageKey);
  const dataMemorizaded = useMemo(() => dataPost, [dataPost]);

  useEffect(() => {
    //console.log(collection);
    if (collection) {
      const userLogiado = collection.username;
      const arrayUserLikes = dataPost.likes.map((user) => user.username);
      const rusultLike = arrayUserLikes.some((users) => users == userLogiado);
      setIslike(rusultLike);
      setCountLikes(dataPost.likes.length);
      setLike(isLike);
    }
  }, [dataPost, like, isLike]);

  async function updateLike(data) {
    //console.log(data);
    try {
      const response = await fetch(
        `https://643c5bc8f0ec48ce9042d8f2.mockapi.io/digital/posts/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseBody = await response.json();
      //const statusText = response.statusText;
      return responseBody;
    } catch (error) {
      //console.log(error);
    }
  }

  const { mutate } = useMutation(updateLike);

  const handleClick = () => {
    const postCopy = { ...dataPost };

    const serchResult = postCopy.likes.find(
      (obj) => obj.username === collection.username
    );

    // console.log(`resultado de la busqueda:${JSON.stringify(serchResult)}`);

    serchResult
      ? postCopy.likes.pop(collection)
      : postCopy.likes.push(collection);

    mutate(postCopy, {
      onSuccess: (updatedPost) => {
        // console.log("update realizado con exito");
        // console.log(updatedPost);
        setLike((x) => !x);

        if (socket) {
          socket.emit("send-likes", updatedPost);
        }
      },
    });
  };

  return (
    <article className="post">
      <div className="post-head">
        <div className="post-head-information">
          {dataMemorizaded.image && (
            <div className=" perfil-circle  showImg">
              <DynamicImage
                imgSelected={dataMemorizaded.image}
                width={40}
                height={40}
              />
            </div>
          )}
          <span className="head-post-username">@{dataMemorizaded.author}</span>
        </div>
      </div>

      <div className="post-content">
        {dataMemorizaded.image && (
          <div className="showImg">
            <DynamicImage imgSelected={dataMemorizaded.image} />
          </div>
        )}
      </div>

      <div className="post-description">
        <div className="post-description-icons">
          <div onClick={handleClick}>
            {!like ? (
              <svg
                aria-label="Me gusta"
                className="x1lliihq x1n2onr6"
                color="rgb(38, 38, 38)"
                fill="rgb(38, 38, 38)"
                role="img"
                viewBox="0 0 24 24"
                height="24"
                width="24"
              >
                <title>Me gusta</title>
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
              </svg>
            ) : (
              <svg
                aria-label="Ya no me gusta"
                className="x1lliihq x1n2onr6"
                color="rgb(255, 48, 64)"
                fill="rgb(255, 48, 64)"
                height="24"
                role="img"
                viewBox="0 0 48 48"
                width="24"
              >
                <title>Ya no me gusta</title>
                <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
              </svg>
            )}
          </div>
        </div>

        <span className="post-description-likes">{countLikes} Me gusta</span>

        <span className="post-description-text">
          <span className="post-description-username">
            {dataMemorizaded.author}
          </span>
          {dataMemorizaded.message}
        </span>

        <div className="post-group-descriptio-time">
          <span className="post-description-title">HACE</span>
          <span className="post-description-time">
            {getLastModAgo(
              dataMemorizaded.createdAt,
              dateCurrent
            ).toUpperCase()}
          </span>
        </div>
      </div>
    </article>
  );
}

//export default memo(Post);

export default Post;
