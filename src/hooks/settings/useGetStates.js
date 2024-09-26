import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

function useGetStates(cityId, enabled) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["states", cityId],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/client/states?city_id=${cityId}`);
        if (res.status === 200) {
          return res.data?.data;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
    enabled: enabled,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { isLoading, data, error };
}

export default useGetStates;
