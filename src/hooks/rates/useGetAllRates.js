import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

function useGetAllRates(id) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["allRates"],
    queryFn: async () => {
      const res = await axiosInstance.get("/client/rates", {
        params: {
          profile_id: id,
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
  });

  return { isLoading, data, error };
}

export default useGetAllRates;
