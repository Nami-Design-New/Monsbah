import { useInfiniteQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

function useGetPersons() {
  const lang = useSelector((state) => state.language.lang);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const {
    isLoading,
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["persons", lang, search],

    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("/client/search-profiles", {
        params: {
          page: pageParam,
          search: search,
        },
      });
      if (res.status === 200) {
        return {
          data: res.data?.data?.data,
          total: res.data?.data?.meta?.total,
          per_page: res.data?.data?.meta?.per_page,
        };
      } else {
        throw new Error("Failed to fetch profiles");
      }
    },

    getNextPageParam: (lastPage, pages) => {
      const isMore = lastPage.data.length >= lastPage.per_page;
      return isMore ? pages.length + 1 : undefined;
    },

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });

  return {
    isLoading,
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}

export default useGetPersons;
