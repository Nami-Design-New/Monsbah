import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./../../utils/axiosInstance";

function useGetCountries() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/client/countries");
        if (res.status === 200) {
          return res.data?.data;
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

export default useGetCountries;
