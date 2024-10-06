import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetUserProducts() {
  const { id } = useSelector((state) => state.clientData.client);
  const lang = useSelector((state) => state.language.lang);

  const { isLoading, data, error } = useQuery({
    queryKey: ["user-product", lang, id],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(
          `/client/UserProfile?profile_id=${id}`
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
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}
