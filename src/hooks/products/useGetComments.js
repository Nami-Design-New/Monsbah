import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetComments() {
  const { id } = useParams();
  const lang = useSelector((state) => state.language.lang);

  const { isLoading, data, error } = useQuery({
    queryKey: ["comments", lang, id],

    queryFn: async () => {
      try {
        const res = await axiosInstance.get(
          `/${localStorage.getItem("userType") || "client"}/comments?product_id=${id}`
        );
        if (res.status === 200) {
          return res.data.data || {};
        }
      } catch (error) {
        console.error("Error fetching comments:", error.message);
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
