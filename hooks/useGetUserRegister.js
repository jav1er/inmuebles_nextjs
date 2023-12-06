import { useState, useEffect } from "react";
import GetPosts from "../helpers/getPosts";
// import useData from "./useData";
import { useLocalStorage } from "./useLocalStorage";
import getUserRegister from "../helpers/getUserRegister";
export default function useGetUserRegister(params = "") {
  ////console.log(url);
  console.log(params);
  const [, setUserLogged] = useLocalStorage("user-logged");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //const { setPosts } = useData();

  useEffect(() => {
    if (params) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          ////console.log(params);
          const registeredUser = await getUserRegister(params);
          setResponse(registeredUser);
          //setUserLogged(registeredUser);
        } catch (error) {
          setError(error);
        }
        setIsLoading(false);
      };
      fetchData();
    }
  }, [params.username]);

  return { response, error, isLoading };
}
