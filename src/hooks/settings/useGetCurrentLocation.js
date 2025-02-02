import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

function useGetCurrentLocation() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["current-location"],
    queryFn: async () => {
      const res = await axiosInstance.get("/client/current_location");
      if (res.status === 200) {
        return res.data?.data;
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

export default useGetCurrentLocation;
