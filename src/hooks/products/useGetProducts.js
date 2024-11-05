import { useInfiniteQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

function useGetProducts() {
  const lang = useSelector((state) => state.language.lang);
  const [searchParams] = useSearchParams();

  const country_id = searchParams.get("country");
  const type = searchParams.get("type");
  const sort = searchParams.get("sort");
  const city_id = searchParams.get("city");
  const category_id = searchParams.get("category");
  const sub_category_id = searchParams.get("sub_category");

  const {
    isLoading,
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "products",
      country_id,
      type,
      sort,
      city_id,
      category_id,
      sub_category_id,
      lang,
    ],

    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("/client/products", {
        params: {
          type: type,
          sort: sort,
          page: pageParam,
          city_id: city_id,
          country_id: country_id,
          category_id: category_id,
          sub_category_id: sub_category_id,
        },
      });
      if (res.status === 200) {
        return {
          data: res.data?.data?.data,
          total: res.data?.data?.meta?.total,
          per_page: res.data?.data?.meta?.per_page,
        };
      } else {
        throw new Error("Failed to fetch products");
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
    data: data?.pages.flatMap((page) => page.data),
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}

export default useGetProducts;
