import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

function useGetAllProducts({ id, enabled }) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["allProducts", id],
    queryFn: async () => {
      const res = await axiosInstance.get("/client/products", {
        params: {
          user_id: id,
        },
      });
      if (res.status === 200) {
        return {
          data: res.data,
        };
      } else {
        throw new Error("Failed to fetch products");
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: Boolean(id) && Boolean(enabled),
  });

  return { isLoading, data, error };
}

export default useGetAllProducts;
