import { useInfiniteQuery } from "@tanstack/react-query";
import GetPosts from "../helpers/getPosts";
import { useLocalStorage } from "./useLocalStorage";

export default function useInfiniteQueryCustom(key, currentPage, limit = 2) {
  console.log("Ejecutando useInfiniteQueryCustom");
  console.log(key);
  console.log(currentPage);
  console.log(limit);


  const { objCollection: dataUserLoggedStorage } =
    useLocalStorage("user-logged");

  const objectCustomParameters = {
    page: 1,
    limit: limit,
    sortBy: "createdAt",
    order: "desc",
    ...(currentPage && { author: dataUserLoggedStorage?.username }),
  };

  const { data, fetchNextPage, isLoading, isSuccess, refetch, remove } =
    useInfiniteQuery(
      [key],
      ({ pageParam = objectCustomParameters }) => GetPosts(pageParam),
      {
        // refetchOnMount: false,
        // refetchOnWindowFocus: false,
        // refetchOnReconnect: false,
        getNextPageParam: (lastPage, pages) => ({
          ...objectCustomParameters,
          page: pages.length + 1,
        }),
      }
    );

  return {
    data,
    fetchNextPage,
    refetch,
    remove,
    isLoading,
    isSuccess,
  };
}
