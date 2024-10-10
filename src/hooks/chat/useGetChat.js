import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetChat() {
  const lang = useSelector((state) => state.language.lang);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user_id");
  const productId = searchParams.get("product_id");

  const { isLoading, data, error } = useQuery({
    queryKey: ["chat", lang, userId, productId],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/client/chat/details`, {
          params: {
            user_id: userId,
            product_id: productId,
          },
        });
        if (res.status === 200) {
          return res.data.data || {};
        }
      } catch (error) {
        console.error("Error fetching product:", error.message);
        throw error;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}
