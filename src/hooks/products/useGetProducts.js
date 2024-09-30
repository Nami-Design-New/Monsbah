import { useQuery } from "@tanstack/react-query";
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

  const { isLoading, data, error } = useQuery({
    queryKey: [
      "products",
      country_id,
      type,
      sort,
      city_id,
      category_id,
      sub_category_id,
      lang
    ],

    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/client/products", {
          params: {
            country_id: country_id,
            type: type,
            sort: sort,
            city_id: city_id,
            category_id: category_id,
            sub_category_id: sub_category_id
          }
        });
        if (res.status === 200) {
          return res.data?.data?.data;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { isLoading, data, error };
}

export default useGetProducts;
