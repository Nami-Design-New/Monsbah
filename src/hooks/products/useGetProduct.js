import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetProduct() {
  const { id } = useParams();

  const { isLoading, data, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(
          `/client/product-details?product_id=${id}`
        );
        if (res.status === 200) {
          return res.data.data || {};
        }
      } catch (error) {
        console.error("Error fetching product:", error.message);
        throw error;
      }
    },
    enabled: Boolean(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });
  return { isLoading, data, error };
}
