import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { default as NextImage } from "next/image";
//import { getDataUser } from "../../hooks/useInformationClient";
import { LOCAL_STORAGE_KEYS, APIS, END_POINTS } from "../../util/constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useHttpPostHook from "../../hooks/useHttpPostHook";
import validateLink from "../../helpers/validateLink";
import useData from "../../hooks/useData";
import * as yup from "yup";
//import UpdateGetPosts from "../../helpers/updatePosts";
import useUpdatePosts from "../../hooks/useUpdatePosts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const schema = yup
  .object({
    image: yup.string(),
    message: yup
      .string()
      .required("Este campo es requerido")
      .min(10, "debe colocar minimo 10 caracteres")
      .max(500, "Este debe llevar maximo 500 caracteres"),
  })
  .required();

function CreatePost() {
  //console.log("CreatePost");
  const { objCollection: dataLoggedUser } = useLocalStorage(
    LOCAL_STORAGE_KEYS.USER_LOGGED
  );
  const { objCollection: dataLocationUser } = useLocalStorage(
    LOCAL_STORAGE_KEYS.USER_LOCATION
  );
  const [dateFormPrepared, setDateFormPrepared] = useState(null);
  const [imgSelected, setImgSelected] = useState(null);

  const { setModalVisibility, setPosts, socket, setNumberPublications } =
    useData();

  // const { response, isLoading } = useHttpPostHook(
  //   `${APIS.MOCKAPI_POSTS}${END_POINTS.POST}`,
  //   dateFormPrepared
  // );

  async function setPost(data) {
    console.log(data);
    try {
      const response = await fetch(
        "https://643c5bc8f0ec48ce9042d8f2.mockapi.io/digital/posts",
        {
          method: "POST",
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
      console.log(error);
    }
  }

  const handleimgSelected = useCallback(async (url) => {
    const imgValidated = await validateLink(url);
    ////console.log(imgValidated);
    setImgSelected(imgValidated);
  }, []);

  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      image: "https://avatarfiles.alphacoders.com/305/305582.jpg",
      //image: "https://upload.wikimedia.org/wikipedia/commons/9/97/N%C3%BAmero_uno.svg",
      description: "",
      status: "sold",
    },
  });

  const statusPost = ["rented", "sold",  "drafted", "deleted", "published"];

  const queryClient = useQueryClient();
  const { mutate, error, isLoading } = useMutation(setPost, {
    onSuccess: async (post) => {
      console.log("mutando ");
      //console.log('invalidad PostsAdminPanelPage');
      //queryClient.invalidateQueries({ queryKeys: ["PostsAdminPanelPage"] })
      queryClient.removeQueries({ queryKeys: ["PostsAdminPanelPage"] });
      await queryClient.refetchQueries({ queryKeys: ["PostsAdminPanelPage"] });

      const state = queryClient.getQueryState({
        queryKeys: ["PostsAdminPanelPage"],
      });
      console.log(state.dataUpdatedAt);
      // queryClient.setQueryData(["generalPosts"], (prevPost) => {
      //   console.log(prevPost);

      //   console.log(post);
      //   //console.log(prevPost.concat(post));
      //   //return prevPost.concat(post);

      //   console.log([post, ...prevPost]);
      //   return [post, ...prevPost];
      // });

      //queryClient.invalidateQueries({ queryKey: ['generalPosts'] })
    },
    // onSettled: (e) => {
    //   console.log(e);
    //   console.log("invalidando ");
    //   queryClient.invalidateQueries({ queryKeys: ["generalPosts"] });
    // },
    // onSettled: () =>
    //   queryClient.invalidateQueries({ queryKeys: ["generalPosts"] }),
  });

  const onSubmit = async (capturedFormData) => {
    if (isValid) {
      //capturedFormData.image = imgSelected ? imgSelected : formPostData.image;

      const newPost = {
        createdAt: new Date().getTime(),
        likes: [],
        author: dataLoggedUser.username,
        location: dataLocationUser?.region
          ? dataLocationUser.region
          : undefined,
        ...capturedFormData,
      };

      //setDateFormPrepared(newPost);
      //setformPostData(newPost);
      mutate(newPost, {
        onSuccess: (d) => {
          console.log(d);

          setNumberPublications((currentNumber) => currentNumber + 1);
          socket.emit("send-message", d);
          setModalVisibility(false);
        },
      });
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps

  // const {
  //   isInitialLoading,
  //   isError,
  //   data: localPosts,
  //   error,
  //   refetch,
  //   isFetching,
  //   isPreviousData,
  //   mutate,
  // } = useQuery({
  //   queryKey: ["generalPosts"],
  //   queryFn: () => setPost(dateFormPrepared),

  //   // queryFn: async () => {
  //   //   const r =   await  GetPosts(customParams)
  //   //   console.log(r);
  //   //   return r
  //   // },
  //   //fetch('/todos')
  //   enabled: false,
  //   refetchOnMount: false,
  //   refetchOnWindowFocus: false,
  //   keepPreviousData: true,
  //   cacheTime: Infinity, // tiempo en que la data permanece en cache
  //   staleTime: 30 * 60000, // tiempo en que la data se mantiene fresh
  // });

  return (
    <>
      <span className="modal-title">Cree su Post</span>
      <form onSubmit={handleSubmit(onSubmit)} className="form-create-post">
        <div className="formGroup">
          <input
            placeholder="url img"
            className="input"
            type="text"
            {...register("image", {
              onBlur: (e) => handleimgSelected(getValues("image"), e),
            })}
          />
          {errors.image?.message && (
            <p className="message">{errors.image?.message}</p>
          )}
        </div>

        {imgSelected && (
          <div className="showImg">
            <NextImage
              src={imgSelected}
              alt="title"
              width={200}
              height={200}
              className="post-image"
              priority
            />
          </div>
        )}

        <div className="formGroup">
          <select className="select-status" {...register("status")}>
            <option className="disabled-select" value="drafted" disabled>
              Seleccione...
            </option>
            {statusPost.map((currentValue, i) => (
              <option key={i} value={currentValue}>
                {currentValue}
              </option>
            ))}
          </select>
        </div>

        <div className="formGroup">
          <textarea
            className="textarea"
            {...register("message")}
            placeholder="message"
          ></textarea>
          {errors.message?.message && (
            <p className="message">{errors.message?.message}</p>
          )}
        </div>

        <div className="actions">
          {/* <span>{response?.statusText}</span> */}
          <button
            disabled={!isValid}
            type="submit"
            className={isValid && !isLoading ? "button" : "disabled"}
          >
            {isLoading ? <div className="loader"></div> : "Crear"}
          </button>
        </div>
      </form>
    </>
  );
}

export default memo(CreatePost);

//export default CreatePost;
