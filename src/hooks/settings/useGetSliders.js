import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

function useGetSliders() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["sliders"],
    queryFn: async () => {
      const res = await axiosInstance.get("/client/sliders");
      if (res.status === 200) {
        return {
          data: res.data,
        };
      } else {
        throw new Error("Failed to fetch sliders");
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useGetSliders;
